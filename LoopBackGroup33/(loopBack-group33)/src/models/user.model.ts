import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  cedula: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  phone?: number;

  @property({
    type: 'date',
  })
  birth_date?: string;

  @property({
    type: 'string',
  })
  nikname?: string;

  @property({
    type: 'string',
  })
  password?: string;

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


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
