import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
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
    type: 'date',
  })
  anio?: string;

  @property({
    type: 'string',
  })
  capasidad?: string;

  @property({
    type: 'string',
  })
  cilindraje?: string;

  @property({
    type: 'string',
  })
  pais?: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @belongsTo(() => Usuario, {name: 'usuario_vehiculo'})
  usuarioId: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
