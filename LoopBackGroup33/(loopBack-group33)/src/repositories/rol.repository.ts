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

  public readonly s_rol_usuario: HasManyRepositoryFactory<Usuario, typeof Rol.prototype.id_rol>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Rol, dataSource);
    this.s_rol_usuario = this.createHasManyRepositoryFactoryFor('s_rol_usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('s_rol_usuario', this.s_rol_usuario.inclusionResolver);
  }
}
