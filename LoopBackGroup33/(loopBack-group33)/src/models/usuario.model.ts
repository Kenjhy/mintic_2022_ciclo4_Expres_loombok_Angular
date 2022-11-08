import {Entity, model, property, hasMany, belongsTo, hasOne} from '@loopback/repository';
import {Rol} from './rol.model';
import {Sede} from './sede.model';
import {Veicle} from './veicle.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_usuario?: string;

  @property({
    type: 'string',
    required: true,
  })
  cedula: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
  })
  telefono?: number;

  @property({
    type: 'date',
  })
  birt_date?: string;

  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @property({
    type: 'object',
    required: true,
  })
  veicle: object;

  @property({
    type: 'object',
    required: true,
  })
  rol: object;

  @property({
    type: 'object',
  })
  notificacion: object;

  @hasMany(() => Rol, {keyTo: 'usuario_rol_id'})
  rols: Rol[];

  @belongsTo(() => Sede, {name: 'r_usuario_sede_id'})
  usuario_sede_id: string;

  @hasOne(() => Veicle, {keyTo: 'usuario_veicle'})
  s_usuario_veicle: Veicle;

  @property({
    type: 'string',
  })
  rol_usuario_id?: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
