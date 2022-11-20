
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RequestBackendService } from "src/app/request-backend.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import Swal from "sweetalert2";

@Component({
  selector: 'app-dialog-mecanicos',
  templateUrl: './dialog-mecanicos.component.html',
  styleUrls: ['./dialog-mecanicos.component.scss']
})
export class DialogMecanicosComponent implements OnInit {
  formMecanicosDialog: FormGroup = new FormGroup({});
  modeForm = "adicion"; 

  constructor(
    private fb: FormBuilder,
    private servicioBackend: RequestBackendService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogMecanicosComponent>
  ) {
    this.formMecanicosDialog = this.fb.group({
      placa: [''],
      tipo: [''],
      marca: [''],
      modelo: [''],
      capacidad_pasajeros: [''],
      cilindraje: [''],
      pais: [''],
      descripcion: [''],
      usuarioId: ["Daniel"],
    });
    this.sortTipos();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //"???"
    if (this.data && this.data.mecanico) {
      const mecanico = JSON.parse(JSON.stringify(this.data.mecanico)); //crear clon del objeto, Crea una copia para no tener problemas de referencia, dato por referencia y por valor, esto eferenica
      //mecanico["fechaNacimiento"] = mecanico["fechaNacimiento"].split("T")[0];
      this.formMecanicosDialog.patchValue(mecanico);
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
    const datosVehicle = this.formMecanicosDialog.getRawValue();
    //datosVehicle["fechaNacimiento"] = new Date(datosVehicle["fechaNacimiento"]);
    // datosVehicle["telefono"] = Number(datosVehicle["telefono"]);
    console.log(datosVehicle);
    //if(datosVehicle.placs == ""){
      //delete datosVehicle.placs;
    //}
    
    this.servicioBackend
      .postData("vehiculos", JSON.stringify(datosVehicle))
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
    const newData = this.formMecanicosDialog.getRawValue();
    //newData["fechaNacimiento"] = new Date(newData["fechaNacimiento"]);
    this.servicioBackend
      .updateData("vehiculos", newData.placa, newData)
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
