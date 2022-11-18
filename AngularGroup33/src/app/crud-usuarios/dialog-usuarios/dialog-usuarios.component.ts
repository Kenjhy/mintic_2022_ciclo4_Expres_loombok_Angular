import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestBackendService } from 'src/app/request-backend.service';

@Component({
  selector: 'app-dialog-usuarios',
  templateUrl: './dialog-usuarios.component.html',
  styleUrls: ['./dialog-usuarios.component.scss']
})
export class DialogUsuariosComponent implements OnInit {
  formDialog: FormGroup = new FormGroup({});
  modeForm = "adicion";

  tipos = [
    {
      text: "Propietario",
      value: "propietario",
    },
    {
      text: "Mecánico",
      value: "mecanico",
    },
    {
      text: "Jefe de operaciones",
      value: "jefe de operaciones",
    },
    {
      text: "Administrador",
      value: "admin",
    },
  ];

  constructor(
    private servicioBackend: RequestBackendService,
    private fb: FormBuilder) {
    this.formDialog = this.fb.group({
      // isUsuario: ["648"],
      nombre: [""],
      telefono: [""],
      tipoUsuario: [""],
      fechaNacimiento: [""],
      contrasenia: ["111"],
      sedeId: ["6361dc4882fb6b4b74876fa8"],
      rolId: ["636c745607de2e3f84954c33"],
    });
   }

  ngOnInit(): void {
    this.sortTipos();
  }

  sortTipos(): void {
    this.tipos.sort(function (a, b) {
      if (a.text < b.text) {
        return -1;
      }
      if (a.text > b.text) {
        return 1;
      }
      return 0;
    });
  }

  saveUser(): void {
    const datosUser = this.formDialog.getRawValue();
    datosUser["fechaNacimiento"] = new Date(datosUser["fechaNacimiento"]);
    // datosUser["telefono"] = Number(datosUser["telefono"]);
    console.log(datosUser);

    this.servicioBackend
      .postData("usuarios", JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          // this.getUsers();
          Swal.fire(
            "Usuario creado",
            "Todo ha salido muy bien con la creación del usuario",
            "success"
          );
        },

        error: (error) => {
          console.log(error);
          Swal.fire("Usuario NO creado", "Ocurrió un error", "error");
        },

        complete: () => {
          console.log("complete");
        },
      });
  }

  updateUser(): void {}
}
