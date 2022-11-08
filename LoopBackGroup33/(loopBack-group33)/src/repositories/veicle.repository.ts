import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Veicle, VeicleRelations} from '../models';

export class VeicleRepository extends DefaultCrudRepository<
  Veicle,
  typeof Veicle.prototype.placa,
  VeicleRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Veicle, dataSource);
  }
}
