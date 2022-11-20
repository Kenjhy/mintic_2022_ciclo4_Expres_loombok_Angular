import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudMecanicosComponent } from './crud-mecanicos/crud-mecanicos.component';
import { CrudJefeOperacionesComponent } from './crud-jefe-operaciones/crud-jefe-operaciones.component';
import { CrudRepuestoComponent } from './crud-repuesto/crud-repuesto.component';
import { CrudRevisionComponent } from './crud-revision/crud-revision.component';
import { CrudSedeComponent } from './crud-sede/crud-sede.component';
import { CrudUsuariosComponent } from './crud-usuarios/crud-usuarios.component';
import { CrudVehiculosComponent } from './crud-vehiculos/crud-vehiculos.component';

const routes: Routes = [
  { path: '', component: CrudUsuariosComponent },
  { path: 'usuarios', component: CrudUsuariosComponent },
  { path: 'vehiculos', component: CrudVehiculosComponent },
  { path: 'mecanicos', component: CrudMecanicosComponent },
  { path: 'repuesto', component: CrudRepuestoComponent },
  { path: 'revision', component: CrudRevisionComponent },
  { path: 'sede', component: CrudSedeComponent },
  { path: 'Jefe-operaciones', component: CrudJefeOperacionesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
