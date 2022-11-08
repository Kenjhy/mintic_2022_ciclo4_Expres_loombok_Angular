import {Entity, model, property} from '@loopback/repository';

@model()
export class Veicle extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  placa?: string;

  @property({
    type: 'string',
  })
  tipo?: string;

  @property({
    type: 'string',
  })
  marca?: string;

  @property({
    type: 'string',
  })
  anio?: string;

  @property({
    type: 'string',
  })
  passengers?: string;

  @property({
    type: 'string',
  })
  cylinder?: string;

  @property({
    type: 'string',
  })
  country?: string;

  @property({
    type: 'string',
  })
  detail?: string;

  @property({
    type: 'string',
  })
  usuario_veicle?: string;

  constructor(data?: Partial<Veicle>) {
    super(data);
  }
}

export interface VeicleRelations {
  // describe navigational properties here
}

export type VeicleWithRelations = Veicle & VeicleRelations;
