import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sede, SedeRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class SedeRepository extends DefaultCrudRepository<
  Sede,
  typeof Sede.prototype.id_sede,
  SedeRelations
> {

  public readonly usuarios_sede: HasManyRepositoryFactory<Usuario, typeof Sede.prototype.id_sede>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Sede, dataSource);
    this.usuarios_sede = this.createHasManyRepositoryFactoryFor('usuarios_sede', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios_sede', this.usuarios_sede.inclusionResolver);
  }
}
