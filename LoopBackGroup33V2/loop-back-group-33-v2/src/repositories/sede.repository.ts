import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sede, SedeRelations, Usuario, Revision} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {RevisionRepository} from './revision.repository';

export class SedeRepository extends DefaultCrudRepository<
  Sede,
  typeof Sede.prototype.idSede,
  SedeRelations
> {

  public readonly usuarios_sede: HasManyRepositoryFactory<Usuario, typeof Sede.prototype.idSede>;

  public readonly revisiones_sede: HasManyRepositoryFactory<Revision, typeof Sede.prototype.idSede>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>,
  ) {
    super(Sede, dataSource);
    this.revisiones_sede = this.createHasManyRepositoryFactoryFor('revisiones_sede', revisionRepositoryGetter,);
    this.registerInclusionResolver('revisiones_sede', this.revisiones_sede.inclusionResolver);
    this.usuarios_sede = this.createHasManyRepositoryFactoryFor('usuarios_sede', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios_sede', this.usuarios_sede.inclusionResolver);
  }
}
