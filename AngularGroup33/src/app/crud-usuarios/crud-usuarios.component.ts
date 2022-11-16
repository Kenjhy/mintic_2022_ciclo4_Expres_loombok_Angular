import { Component, OnInit } from "@angular/core";
import { RequestBackendService } from "../request-backend.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "crud-usuarios",
  templateUrl: "./crud-usuarios.component.html",
  styleUrls: ["./crud-usuarios.component.scss"],
})
export class CrudUsuariosComponent implements OnInit {
  titulo = "Hola";
  modeForm = "adicion";
  value = "";
  edad = 0;
  nombreUsuarioSeleccionado = "";

  displayedColumns: string[] = [
    "isUsuario",
    "nombre",
    "telefono",
    "fechaNacimiento",
    "contrasenia",
    "tipoUsuario",
    "sedeId",
    "rolId",
    "acciones",
  ];
  datos: any = [];

  formUser: FormGroup = new FormGroup({});

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

  showForm = false;

  constructor(
    private servicioBackend: RequestBackendService,
    private fb: FormBuilder
  )  {    
    this.formUser = this.fb.group({
      isUsuario: ["648"],
      nombre: [""],
      telefono: [""],
      fechaNacimiento: ["2022-11-08T00:22:27.812Z"],
      contrasenia: [""],
      tipoUsuario: [""],
      sedeId: ["8765456"],
      rolId: ["987654345675678"],
    });
  }

  ngOnInit(): void {
    this.getUsers();
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

  // cambiarTitulo(): void {
  //   this.titulo = 'He cambiado de nombre, ahora me llamo de Maicol';
  // }

  focusBuscar(): void {
    console.log("hizo focus");
  }

  blurBuscar(): void {
    console.log("salio del focus");
  }

  seleccionarNombre(nombreNuevo: string): void {
    this.nombreUsuarioSeleccionado = nombreNuevo;
  }

  getUsers(): void {
    this.servicioBackend.getData("usuarios").subscribe(
      (data) => {
        console.log(data);
        this.datos = data;
      },

      (error) => {
        console.log("Error: " + error);
      }
    );
  }

  saveUser(): void {
    const datosUser = this.formUser.getRawValue();
    datosUser["fechaNacimiento"] = new Date(datosUser["fechaNacimiento"]);

    console.log(datosUser);

    this.servicioBackend
      .postData("usuarios", JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getUsers();
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

  changeShowForm() {
    this.modeForm = "adicion";
    this.showForm = !this.showForm;
  }

  deleteUser(code: string): void {
    console.log(code);

    Swal.fire({
      title: "¿Está seguro de eliminar el usuario?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.servicioBackend.deleteData("usuarios", code).subscribe({
          next: (data) => {
            this.getUsers();
            Swal.fire("Ok!", "Eliminado", "success");
          },
          error: (error) => {
            console.log(error);
            Swal.fire("Usuario NO eliminado", "Ocurrió un error", "error");
          },
          complete: () => {
            console.log("complete");
          },
        });
      }
    });
  }

  selectUserEdit(user: any): void {
    this.showForm = true;
    this.modeForm = "edicion";
    this.formUser.patchValue(user);
  }

  updateUser(): void {}
}
