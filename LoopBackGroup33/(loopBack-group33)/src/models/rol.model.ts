import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Rol extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_rol?: string;

  @property({
    type: 'string',
  })
  tipo_rol?: string;

  @belongsTo(() => Usuario, {name: 'usuario_rol'})
  usuarioId: string;

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;
