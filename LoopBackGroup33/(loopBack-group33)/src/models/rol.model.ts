import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Rol extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id_rol: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
  })
  usuario_rol_id?: string;

  @hasMany(() => Usuario, {keyTo: 'rol_usuario_id'})
  s_rol_usuario: Usuario[];

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;
