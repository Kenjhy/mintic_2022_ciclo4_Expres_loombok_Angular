import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Repuesto, RepuestoRelations, Revision} from '../models';
import {RevisionRepository} from './revision.repository';

export class RepuestoRepository extends DefaultCrudRepository<
  Repuesto,
  typeof Repuesto.prototype.idRepuesto,
  RepuestoRelations
> {

  public readonly revision_repuesto: BelongsToAccessor<Revision, typeof Repuesto.prototype.idRepuesto>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>,
  ) {
    super(Repuesto, dataSource);
    this.revision_repuesto = this.createBelongsToAccessorFor('revision_repuesto', revisionRepositoryGetter,);
    this.registerInclusionResolver('revision_repuesto', this.revision_repuesto.inclusionResolver);
  }
}
