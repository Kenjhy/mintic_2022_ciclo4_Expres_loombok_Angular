import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Revision} from './revision.model';

@model()
export class Repuesto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idRepuesto?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  marca?: string;

  @property({
    type: 'number',
  })
  precio?: number;

  @belongsTo(() => Revision, {name: 'revision_repuesto'})
  revisionId: string;

  constructor(data?: Partial<Repuesto>) {
    super(data);
  }
}

export interface RepuestoRelations {
  // describe navigational properties here
}

export type RepuestoWithRelations = Repuesto & RepuestoRelations;
