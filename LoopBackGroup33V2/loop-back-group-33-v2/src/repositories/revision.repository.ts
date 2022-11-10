import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Revision, RevisionRelations, Sede, Repuesto} from '../models';
import {SedeRepository} from './sede.repository';
import {RepuestoRepository} from './repuesto.repository';

export class RevisionRepository extends DefaultCrudRepository<
  Revision,
  typeof Revision.prototype.idRevision,
  RevisionRelations
> {

  public readonly sede_revision: BelongsToAccessor<Sede, typeof Revision.prototype.idRevision>;

  public readonly repuestos_revision: HasManyRepositoryFactory<Repuesto, typeof Revision.prototype.idRevision>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('RepuestoRepository') protected repuestoRepositoryGetter: Getter<RepuestoRepository>,
  ) {
    super(Revision, dataSource);
    this.repuestos_revision = this.createHasManyRepositoryFactoryFor('repuestos_revision', repuestoRepositoryGetter,);
    this.registerInclusionResolver('repuestos_revision', this.repuestos_revision.inclusionResolver);
    this.sede_revision = this.createBelongsToAccessorFor('sede_revision', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede_revision', this.sede_revision.inclusionResolver);
  }
}
