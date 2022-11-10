import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Sede} from './sede.model';
import {Repuesto} from './repuesto.model';

@model()
export class Revision extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idRevision?: string;

  @property({
    type: 'date',
  })
  fechaIngreso?: string;

  @property({
    type: 'date',
  })
  fechaSalida?: string;

  @property({
    type: 'number',
  })
  nivelAceite?: number;

  @property({
    type: 'number',
  })
  nivelLiquidoDefrenos?: number;

  @property({
    type: 'number',
  })
  nivelLiquidoRefrigerante?: number;

  @property({
    type: 'number',
  })
  nivelLiquidoDireccion?: number;

  @belongsTo(() => Sede, {name: 'sede_revision'})
  sedeId: string;

  @hasMany(() => Repuesto)
  repuestos_revision: Repuesto[];

  constructor(data?: Partial<Revision>) {
    super(data);
  }
}

export interface RevisionRelations {
  // describe navigational properties here
}

export type RevisionWithRelations = Revision & RevisionRelations;
