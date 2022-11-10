import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id_rol,
  RolRelations
> {

  public readonly usaurios_rol: HasManyRepositoryFactory<Usuario, typeof Rol.prototype.id_rol>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Rol, dataSource);
    this.usaurios_rol = this.createHasManyRepositoryFactoryFor('usaurios_rol', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usaurios_rol', this.usaurios_rol.inclusionResolver);
  }
}
