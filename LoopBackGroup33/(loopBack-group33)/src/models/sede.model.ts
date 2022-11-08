import {Entity, model, property} from '@loopback/repository';

@model()
export class Sede extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_sede?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  contry?: string;

  @property({
    type: 'string',
  })
  adress?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'object',
    required: true,
  })
  user: object;


  constructor(data?: Partial<Sede>) {
    super(data);
  }
}

export interface SedeRelations {
  // describe navigational properties here
}

export type SedeWithRelations = Sede & SedeRelations;
