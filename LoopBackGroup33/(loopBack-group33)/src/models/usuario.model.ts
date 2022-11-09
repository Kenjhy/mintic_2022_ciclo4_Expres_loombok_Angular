import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Sede} from './sede.model';
import {Rol} from './rol.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  cedula?: string;

  @property({
    type: 'string',
  })
  nombre?: string;

  @property({
    type: 'number',
  })
  telefono?: number;

  @property({
    type: 'date',
  })
  fecha_nacimiento?: string;

  @property({
    type: 'string',
  })
  rol?: string;

  @property({
    type: 'string',
  })
  vehiculo?: string;

  @property({
    type: 'string',
  })
  sede?: string;

  @property({
    type: 'string',
  })
  usuaro?: string;

  @property({
    type: 'string',
  })
  contrasenia?: string;

  @belongsTo(() => Sede, {name: 'sede_usuaro_id'})
  sedeId: string;

  @hasOne(() => Rol)
  rol_usuario: Rol;

  @hasOne(() => Vehiculo)
  vehiculo_usuario: Vehiculo;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
