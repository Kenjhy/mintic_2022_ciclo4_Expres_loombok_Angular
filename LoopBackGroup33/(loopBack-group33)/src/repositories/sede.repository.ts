import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sede, SedeRelations} from '../models';

export class SedeRepository extends DefaultCrudRepository<
  Sede,
  typeof Sede.prototype.id_sede,
  SedeRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Sede, dataSource);
  }
}
