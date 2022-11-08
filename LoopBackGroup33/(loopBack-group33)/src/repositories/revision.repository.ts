import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Revision, RevisionRelations} from '../models';

export class RevisionRepository extends DefaultCrudRepository<
  Revision,
  typeof Revision.prototype.id_revision,
  RevisionRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Revision, dataSource);
  }
}
