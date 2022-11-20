import { Component, OnInit } from "@angular/core";
import { RequestBackendService } from "../request-backend.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";
import { DialogVehiculosComponent } from "./dialog-vehiculos/dialog-vehiculos.component";
import { format } from "date-fns";

@Component({
  selector: "crud-vehiculos",
  templateUrl: "./crud-vehiculos.component.html",
  styleUrls: ["./crud-vehiculos.component.scss"],
})
export class CrudVehiculosComponent implements OnInit {
  titulo = "Hola";
  modeForm = "adicion";
  value = "";
  edad = 0;
  nombrevehiculosSeleccionado = "";

  displayedColumns: string[] = [
    "placa",
    "tipo",
    "marca",
    "modelo",
    "capacidad_pasajeros",
    "cilindraje",
    "pais",
    "descripcion",
    "acciones",
  ];

  datosVehiculos: any = [];

  formVehiculos: FormGroup = new FormGroup({});

  showForm = false;

  constructor(
    private servicioBackend: RequestBackendService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.formVehiculos = this.fb.group({
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
    this.getVehiculos();
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
    this.nombrevehiculosSeleccionado = nombreNuevo;
  }

  getVehiculos(): void {
    this.servicioBackend.getData("vehiculos").subscribe(
      (data) => {
        console.log(data);
        this.datosVehiculos = data;
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

  deleteVehiculos(code: string): void {
    console.log(code);

    Swal.fire({
      title: "¿Está seguro de eliminar el vehiculo?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.servicioBackend.deleteData("vehiculos", code).subscribe({
          next: (data) => {
            this.getVehiculos();
            Swal.fire("Ok!", "Eliminado el vehiculo", "success");
          },
          error: (error) => {
            console.log(error);
            Swal.fire("vehiculo NO eliminado", "Ocurrió un error", "error");
          },
          complete: () => {
            console.log("complete");
          },
        });
      }
    });
  }

  selectVehiculoEdit(vehicle: any): void {
    this.showForm = true;
    this.modeForm = "edicion";
    this.formVehiculos.patchValue(vehicle);
  }

  filter() {
    this.servicioBackend
      .getDataFilter("vehiculos", this.value, "placa")
      .subscribe(
        (data) => {
          console.log(data);
          this.datosVehiculos = data;
        },

        (error) => {
          console.log("Error: " + error);
        }
      );
  }


  openDialogAdd() {
    const dialogRef = this.dialog.open(DialogVehiculosComponent, {
      // width: "330px",
      // height: "400px",
      data: {
        modeForm: "adicion",
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.getVehiculos();
      if (data) {
        this.getVehiculos();
      }
    });
  }

  openDialogEdit(vehiculo?: string) {
    const dialogRef = this.dialog.open(DialogVehiculosComponent, {
      // width: "330px",
      // height: "400px",
      data: {
        vehiculo: vehiculo,
        modeForm: "edicion",
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getVehiculos();
      }
    });
  }
  setaFormat(dateString: string): string {
    const date = new Date(dateString);
    const newDate = format(date, "d-LLL-yyyy");
    return newDate;
  }
}
