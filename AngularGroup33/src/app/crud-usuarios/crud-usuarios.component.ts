import { Component, OnInit } from "@angular/core";
import { RequestBackendService } from "../request-backend.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { DialogUsuariosComponent } from "./dialog-usuarios/dialog-usuarios.component";

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
    // "isUsuario",
    "nombre",
    "telefono",
    "tipoUsuario",
    "fechaNacimiento",
    "acciones",
  ];
  
  datos: any = [];
  formUser: FormGroup = new FormGroup({});
  showForm = false;

  constructor(
    private servicioBackend: RequestBackendService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsers();
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
            Swal.fire("Ok!", "Eliminado el Usuario", "success");
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

  openDialog() {
    this.dialog.open(DialogUsuariosComponent);
  }
}
