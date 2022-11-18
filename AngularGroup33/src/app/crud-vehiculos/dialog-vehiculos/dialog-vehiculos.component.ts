import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RequestBackendService } from "src/app/request-backend.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import Swal from "sweetalert2";

@Component({
  selector: "app-dialog-vehiculos",
  templateUrl: "./dialog-vehiculos.component.html",
  styleUrls: ["./dialog-vehiculos.component.scss"],
})
export class DialogVehiculosComponent implements OnInit {
  formVehiculosDialog: FormGroup = new FormGroup({});
  modeForm = "adicion"; 

  constructor(
    private fb: FormBuilder,
    private servicioBackend: RequestBackendService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogVehiculosComponent>
  ) {
    this.formVehiculosDialog = this.fb.group({
      placa: [""],
      tipo: [""],
      marca: [""],
      modelo: [""],
      capacidad_pasajeros: [""],
      cilindraje: [""],
      pais: [""],
      descripcion: [""],
      usuarioId: ["222"],
    });
    this.sortTipos();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //"???"
    if (this.data && this.data.vehiculo) {
      const vehiculo = JSON.parse(JSON.stringify(this.data.vehiculo)); //crear clon del objeto, Crea una copia para no tener problemas de referencia, dato por referencia y por valor, esto eferenica
      vehiculo["fechaNacimiento"] = vehiculo["fechaNacimiento"].split("T")[0];
      this.formVehiculosDialog.patchValue(vehiculo);
      console.log(this.data);
      this.modeForm = this.data.modeForm;
    }
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

  saveVehicle(): void {
    const datosVehicle = this.formVehiculosDialog.getRawValue();
    datosVehicle["fechaNacimiento"] = new Date(datosVehicle["fechaNacimiento"]);
    // datosVehicle["telefono"] = Number(datosVehicle["telefono"]);
    console.log(datosVehicle);

    this.servicioBackend
      .postData("vehiculo", JSON.stringify(datosVehicle))
      .subscribe({
        next: (data) => {
          console.log(data);
          //   this.getUsers();
          Swal.fire(
            "Usuario creado",
            "Todo ha salido muy bien con la creacion del usuario",
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

  updateVehicle(): void {
    const newData = this.formVehiculosDialog.getRawValue();
    newData["fechaNacimiento"] = new Date(newData["fechaNacimiento"]);
    this.servicioBackend
      .updateData("vehiculo", newData.placa, newData)
      .subscribe({
        next: (data) => {
          console.log(data);
          //   this.getUsers();
          Swal.fire(
            "Usuario editado",
            "Todo ha salido muy bien con la edicion del usuario",
            "success"
          );

          this.dialogRef.close(true);
        },

        error: (error) => {
          console.log(error);
          Swal.fire("Usuario NO editado", "Ocurrió un error", "error");
        },

        complete: () => {
          console.log("complete");
        },
      });
  }

  tipos = [
    {
      text: "Camion",
      value: "camion",
    },
    {
      text: "Buseta",
      value: "Buseta",
    },
    {
      text: "Carro Particular",
      value: "carro-Particular",
    },
    {
      text: "Camioneta",
      value: "camioneta",
    },
    {
      text: "Deportivo",
      value: "deportivo",
    },
  ];

  cars = [
    {
      text: "mazda",
      value: "Mazda / Familia",
    },
    {
      text: "chevrolet",
      value: "Chevrolet / Todoterreno",
    },
    {
      text: "audi",
      value: "Audi / Todoterreno",
    },
    {
      text: "kia",
      value: "KIA / Picanto",
    },
    {
      text: "BMW",
      value: "BMW / Sport3",
    },
    {
      text: "mercedez",
      value: "Mercedez-Benz / Crucero",
    },
    {
      text: "ford",
      value: "Ford / RANGER",
    },
  ];
}
