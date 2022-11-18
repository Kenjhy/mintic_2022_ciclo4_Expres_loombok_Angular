import { Component, OnInit } from "@angular/core";
import { RequestBackendService } from "../request-backend.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";
import { DialogUsuariosComponent } from "./dialog-usuarios/dialog-usuarios.component";
import { format } from 'date-fns';

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
  ) {
    this.formUser = this.fb.group({
      // isUsuario: ["648"],
      nombre: ["", Validators.required],
      telefono: [""],
      tipoUsuario: ["", Validators.required, Validators.minLength(10)],
      fechaNacimiento: [""],
      contrasenia: ["111"],
      sedeId: ["6361dc4882fb6b4b74876fa8"],
      rolId: ["636c745607de2e3f84954c33"],
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.postUser();
  }

  // sortTipos(): void {
  //   this.tipos.sort(function (a, b) {
  //     if (a.text < b.text) {
  //       return -1;
  //     }
  //     if (a.text > b.text) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  // }

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

  postUser(): void {}

  changeShowForm() {
    this.modeForm = "adicion";
    this.showForm = !this.showForm;
  }

  deleteUser(code: string): void {
    //   console.log(code);

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

  filter() {
    this.servicioBackend
      .getDataFilter("usuarios", this.value, "nombre")
      .subscribe(
        (data) => {
          console.log(data);
          this.datos = data;
        },

        (error) => {
          console.log("Error: " + error);
        }
      );
  }


  openDialogAdd() {
    const dialogRef = this.dialog.open(DialogUsuariosComponent, {
      // width: "330px",
      // height: "400px",
      data: {
        modeForm : 'adicion'
      },
    });

    dialogRef.afterClosed().subscribe((data)=>{
      if(data){
        this.getUsers();
      }
    });

  }

  openDialogEdit(user?: string) {
    const dialogRef = this.dialog.open(DialogUsuariosComponent, {
      // width: "330px",
      // height: "400px",
      data: {
        user: user,
        modeForm : 'edicion' 
      },
    });
    dialogRef.afterClosed().subscribe((data)=>{
      if(data){
        this.getUsers();
      }
    });
  }
setaFormat(dateString: string): string{
  const date = new Date(dateString);
  const newDate = format(date, 'd-LLL-yyyy');
  return newDate;
}
  }

// function setaFormat(dateString: any, str: any) {
//   throw new Error("Function not implemented.");
// }

