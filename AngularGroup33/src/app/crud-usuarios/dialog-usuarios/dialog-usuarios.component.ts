import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RequestBackendService } from "src/app/request-backend.service";
import Swal from "sweetalert2";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { IfStmt } from "@angular/compiler";
import { DataRowOutlet } from "@angular/cdk/table";



@Component({
  selector: "app-dialog-usuarios",
  templateUrl: "./dialog-usuarios.component.html",
  styleUrls: ["./dialog-usuarios.component.scss"],
})
export class DialogUsuariosComponent implements OnInit {
  formUserDialog: FormGroup = new FormGroup({});
  modeForm = "adicion";

  constructor(
    private fb: FormBuilder,
    private servicioBackend: RequestBackendService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formUserDialog = this.fb.group({
      nombre: [''],
      telefono: [''],
      tipoUsuario: [''],
      fechaNacimiento: ['2022-11-08T00:22:27.812Z'],
      contrasenia: ['111'],
      sedeId: ['6361dc4882fb6b4b74876fa8'],
      rolId: ['636c745607de2e3f84954c33'],
    });
    
    this.sortTipos();
  // }
    if(data && data.user){
      this.formUserDialog.patchValue(data.user);
      console.log(data);
     this.modeForm = data.modeForm;
    }
  }
  ngOnInit(): void {}

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
    const datosUser = this.formUserDialog.getRawValue(); 
    
    datosUser["fechaNacimiento"] = new Date(datosUser["fechaNacimiento"]);
    // datosUser["telefono"] = Number(datosUser["telefono"]);
    console.log(datosUser);

    this.servicioBackend
      .postData("usuarios", JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
       //   this.getUsers();
       Swal.fire(
        'Usuario creado',
        'Todo ha salido muy bien con la creacion del usuario',
        'success'
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
      value: "jefe-operaciones",
    },
    {
      text: "Administrador",
      value: "admin",
    },
  ];
}
