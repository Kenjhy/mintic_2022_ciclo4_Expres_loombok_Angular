import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Notificacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_notificacion?: string;

  @property({
    type: 'string',
  })
  mensaje?: string;

  @property({
    type: 'string',
  })
  estado?: string;

  @property({
    type: 'date',
  })
  fecha?: string;

  @belongsTo(() => Usuario, {name: 'usuario_notificacion'})
  usuarioId: string;

  constructor(data?: Partial<Notificacion>) {
    super(data);
  }
}

export interface NotificacionRelations {
  // describe navigational properties here
}

export type NotificacionWithRelations = Notificacion & NotificacionRelations;
