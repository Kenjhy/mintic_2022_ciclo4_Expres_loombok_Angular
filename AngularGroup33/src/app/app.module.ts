import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudUsuariosComponent } from './crud-usuarios/crud-usuarios.component';
import { CrudVehiculosComponent } from './crud-vehiculos/crud-vehiculos.component';
import { DialogUsuariosComponent } from './crud-usuarios/dialog-usuarios/dialog-usuarios.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { LayoutComponent } from './layout/layout.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContentComponent } from './layout/content/content.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { EditorNombreComponent } from './crud-usuarios/editor-nombre/editor-nombre.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogVehiculosComponent } from './crud-vehiculos/dialog-vehiculos/dialog-vehiculos.component';
import { CrudMecanicosComponent } from './crud-mecanicos/crud-mecanicos.component';
import { DialogMecanicosComponent } from './crud-mecanicos/dialog-mecanicos/dialog-mecanicos.component';
import { CrudRepuestoComponent } from './crud-repuesto/crud-repuesto.component';
import { CrudRevisionComponent } from './crud-revision/crud-revision.component';
import { CrudSedeComponent } from './crud-sede/crud-sede.component';
import { CrudJefeOperacionesComponent } from './crud-jefe-operaciones/crud-jefe-operaciones.component';
import { DialogJefeOperacionesComponent } from './crud-jefe-operaciones/dialog-jefe-operaciones/dialog-jefe-operaciones.component';
import { DialogSedeComponent } from './crud-sede/dialog-sede/dialog-sede.component';
import { DialogRevisionComponent } from './crud-revision/dialog-revision/dialog-revision.component';
import { DialogRepuestoComponent } from './crud-repuesto/dialog-repuesto/dialog-repuesto.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudUsuariosComponent,
    CrudVehiculosComponent,
    LayoutComponent,
    ToolbarComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    EditorNombreComponent,
    DialogUsuariosComponent,
    DialogVehiculosComponent,
    CrudMecanicosComponent,
    DialogMecanicosComponent,
    CrudRepuestoComponent,
    CrudRevisionComponent,
    CrudSedeComponent,
    CrudJefeOperacionesComponent,
    DialogJefeOperacionesComponent,
    DialogSedeComponent,
    DialogRevisionComponent,
    DialogRepuestoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
