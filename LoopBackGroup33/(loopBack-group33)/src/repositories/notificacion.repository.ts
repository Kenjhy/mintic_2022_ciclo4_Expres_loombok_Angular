import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Notificacion, NotificacionRelations} from '../models';

export class NotificacionRepository extends DefaultCrudRepository<
  Notificacion,
  typeof Notificacion.prototype.id_notificacion,
  NotificacionRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Notificacion, dataSource);
  }
}
