import { Component, OnInit } from "@angular/core";
import { RequestBackendService } from "../request-backend.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";
import { DialogMecanicosComponent } from "./dialog-mecanicos/dialog-mecanicos.component";
import { format } from "date-fns";

@Component({
  selector: 'app-crud-mecanicos',
  templateUrl: './crud-mecanicos.component.html',
  styleUrls: ['./crud-mecanicos.component.scss']
})
export class CrudMecanicosComponent implements OnInit {

  titulo = "Hola";
  modeForm = "adicion";
  value = "";
  edad = 0;
  nombreMecanicosSeleccionado = "";

  displayedColumns: string[] = [
    "placa",
    "tipo",
    "marca",
    "modelo",
    "capacidad_pasajeros",
    "cilindraje",
    "pais",
    "descripcion",
    "usuarioId",
    "acciones",
  ];

  datosMecanicos: any = [];

  formMecanicos: FormGroup = new FormGroup({});

  showForm = false;

  constructor(
    private servicioBackend: RequestBackendService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.formMecanicos = this.fb.group({
      placa: [""],
      tipo: [""],
      marca: [""],
      modelo: [""],
      capacidad_pasajeros: [""],
      cilindraje: [""],
      pais: [""],
      descripcion: [""],
      usuarioId: ["Daniel"],
    });
  }

  ngOnInit(): void {
    this.getMecanicos();
  }

  showToast() {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      title: "Success!",
      text: "El detalle del usuario se ha consultado correctamente",
      icon: "success",
    });
  }

  seleccionarNombre(nombreNuevo: string): void {
    this.nombreMecanicosSeleccionado = nombreNuevo;
  }

  getMecanicos(): void {
    this.servicioBackend.getData("vehiculos").subscribe(
      (data) => {
        console.log(data);
        this.datosMecanicos = data;
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

  deleteMecanicos(code: string): void {
    console.log(code);

    Swal.fire({
      title: "¿Está seguro de eliminar el mecanico?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.servicioBackend.deleteData("vehiculos", code).subscribe({
          next: (data) => {
            this.getMecanicos();
            Swal.fire("Ok!", "Eliminado el mecanico", "success");
          },
          error: (error) => {
            console.log(error);
            Swal.fire("mecanico NO eliminado", "Ocurrió un error", "error");
          },
          complete: () => {
            console.log("complete");
          },
        });
      }
    });
  }

  selectMecanicoEdit(vehicle: any): void {
    this.showForm = true;
    this.modeForm = "edicion";
    this.formMecanicos.patchValue(vehicle);
  }

  filter() {
    this.servicioBackend
      .getDataFilter("vehiculos", this.value, "usuarioId")
      .subscribe(
        (data) => {
          console.log(data);
          this.datosMecanicos = data;
        },

        (error) => {
          console.log("Error: " + error);
        }
      );
  }


  openDialogAdd() {
    const dialogRef = this.dialog.open(DialogMecanicosComponent, {
      // width: "330px",
      // height: "400px",
      data: {
        modeForm: "adicion",
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.getMecanicos();
      if (data) {
        this.getMecanicos();
      }
    });
  }

  openDialogEdit(mecanico?: string) {
    const dialogRef = this.dialog.open(DialogMecanicosComponent, {
      // width: "330px",
      // height: "400px",
      data: {
        mecanico: mecanico,
        modeForm: "edicion",
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getMecanicos();
      }
    });
  }
  setaFormat(dateString: string): string {
    const date = new Date(dateString);
    const newDate = format(date, "d-LLL-yyyy");
    return newDate;
  }
}
