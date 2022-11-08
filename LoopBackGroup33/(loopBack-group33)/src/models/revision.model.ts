import {model, property} from '@loopback/repository';
import {Sede} from '.';

@model()
export class Revision extends Sede {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_revision?: string;

  @property({
    type: 'string',
  })
  tipo_revision?: string;

  @property({
    type: 'date',
  })
  fecha_ingreso?: string;

  @property({
    type: 'date',
  })
  fecha_salida?: string;

  @property({
    type: 'number',
  })
  nivel_aceite?: number;

  @property({
    type: 'number',
  })
  nivel_liquido_frenos?: number;

  @property({
    type: 'number',
  })
  nivel_refrigerante?: number;

  @property({
    type: 'number',
  })
  niel_liquido_direccion?: number;

  @property({
    type: 'number',
  })
  nivel_liquido_direccion?: number;

  @property({
    type: 'object',
  })
  sede?: object;

  @property({
    type: 'object',
  })
  repuesto?: object;


  constructor(data?: Partial<Revision>) {
    super(data);
  }
}

export interface RevisionRelations {
  // describe navigational properties here
}

export type RevisionWithRelations = Revision & RevisionRelations;
