import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from '../request-backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'crud-vehiculos',
  templateUrl: './crud-vehiculos.component.html',
  styleUrls: ['./crud-vehiculos.component.scss'],
})
export class CrudVehiculosComponent implements OnInit {
  titulo = 'Hola';

  modeForm = 'adicion';

  value = '';

  edad = 0;
  nombrevehiculosSeleccionado = '';

  displayedColumns: string[] = [
    'placa',
    'tipo',
    'marca',
    'modelo',
    'capacidad_pasajeros',
    'cilindraje',
    'pais',
    'descripcion',
    'acciones',
  ];
  datos = [];

  formVehiculos: FormGroup = new FormGroup({});

  tipos = [
    {
      text: 'Propietario',
      value: 'propietario',
    },
    {
      text: 'Mecánico',
      value: 'mecanico',
    },
    {
      text: 'Jefe de operaciones',
      value: 'jefe-operaciones',
    },
    {
      text: 'Administrador',
      value: 'admin',
    },
  ];

  showForm = false;

  constructor(
    private servicioBackend: RequestBackendService,
    private fb: FormBuilder
  ) {
    this.getVehiculos();
    this.sortTipos();

    this.formVehiculos = this.fb.group({
      placa: [''],
      tipo: [''],
      marca: [''],
      modelo: [''],
      capacidad_pasajeros: [''],
      cilindraje: [''],
      pais: [''],
      descripcion: [''],
      usuarioId: ['222']
    });
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

  // cambiarTitulo(): void {
  //   this.titulo = 'He cambiado de nombre, ahora me llamo de Maicol';
  // }

  focusBuscar(): void {
    console.log('hizo focus');
  }

  blurBuscar(): void {
    console.log('salio del focus');
  }

  seleccionarNombre(nombreNuevo: string): void {
    this.nombrevehiculosSeleccionado = nombreNuevo;
  }

  getVehiculos(): void {
    this.servicioBackend.getData('vehiculos').subscribe(
      (data) => {
        console.log(data);
        this.datos = data;
      },

      (error) => {
        console.log('Error: ' + error);
      }
    );
  }

  saveVehiculos(): void {
    const datosUser = this.formVehiculos.getRawValue();
    // datosUser['fechaNacimiento'] = new Date(datosUser['fechaNacimiento']);

    console.log(datosUser);

    this.servicioBackend
      .postData('vehiculos', JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getVehiculos();
          Swal.fire(
            'vehiculo creado',
            'Todo ha salido muy bien con la creación del vehiculo',
            'success'
          );
        },
        error: (error) => {
          console.log(error);
          Swal.fire('vehiculo NO creado', 'Ocurrió un error', 'error');
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  changeShowForm() {
    this.modeForm = 'adicion';
    this.showForm = !this.showForm;
  }

  deleteUser(code: string): void {
    console.log(code);

    Swal.fire({
      title: '¿Está seguro de eliminar el vehiculo?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.servicioBackend.deleteData('vehiculos', code).subscribe({
          next: (data) => {
            this.getVehiculos();
            Swal.fire('Ok!', 'Eliminado', 'success');
          },
          error: (error) => {
            console.log(error);
            Swal.fire('vehiculo NO eliminado', 'Ocurrió un error', 'error');
          },
          complete: () => {
            console.log('complete');
          },
        });
      }
    });
  }

  selectUserEdit(user: any): void {
    this.showForm = true;
    this.modeForm = 'edicion';
    this.formVehiculos.patchValue(user);
  }

  updateUser(): void {}
}
