import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id_rol,
  RolRelations
> {

  public readonly usuario_rol: BelongsToAccessor<Usuario, typeof Rol.prototype.id_rol>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Rol, dataSource);
    this.usuario_rol = this.createBelongsToAccessorFor('usuario_rol', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario_rol', this.usuario_rol.inclusionResolver);
  }
}
