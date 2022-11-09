import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.placa,
  VehiculoRelations
> {

  public readonly usuario_vehiculo: BelongsToAccessor<Usuario, typeof Vehiculo.prototype.placa>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.usuario_vehiculo = this.createBelongsToAccessorFor('usuario_vehiculo', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario_vehiculo', this.usuario_vehiculo.inclusionResolver);
  }
}
