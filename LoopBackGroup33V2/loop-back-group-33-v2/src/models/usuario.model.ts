import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Sede} from './sede.model';
import {Rol} from './rol.model';
import {Notificacion} from './notificacion.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  isUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
  })
  telefono?: number;

  @property({
    type: 'date',
  })
  fechaNacimiento?: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasenia: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoUsuario: string;

  @belongsTo(() => Sede, {name: 'sede_usuario'})
  sedeId: string;

  @belongsTo(() => Rol, {name: 'rol_usuario'})
  rolId: string;

  @hasMany(() => Notificacion)
  notificaciones_usuario: Notificacion[];

  @hasMany(() => Vehiculo)
  vehiculos_usuario: Vehiculo[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
