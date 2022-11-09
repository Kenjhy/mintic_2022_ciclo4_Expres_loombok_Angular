import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Sede, Rol, Vehiculo} from '../models';
import {SedeRepository} from './sede.repository';
import {RolRepository} from './rol.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.cedula,
  UsuarioRelations
> {

  public readonly sede_usuaro_id: BelongsToAccessor<Sede, typeof Usuario.prototype.cedula>;

  public readonly rol_usuario: HasOneRepositoryFactory<Rol, typeof Usuario.prototype.cedula>;

  public readonly vehiculo_usuario: HasOneRepositoryFactory<Vehiculo, typeof Usuario.prototype.cedula>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Usuario, dataSource);
    this.vehiculo_usuario = this.createHasOneRepositoryFactoryFor('vehiculo_usuario', vehiculoRepositoryGetter);
    this.registerInclusionResolver('vehiculo_usuario', this.vehiculo_usuario.inclusionResolver);
    this.rol_usuario = this.createHasOneRepositoryFactoryFor('rol_usuario', rolRepositoryGetter);
    this.registerInclusionResolver('rol_usuario', this.rol_usuario.inclusionResolver);
    this.sede_usuaro_id = this.createBelongsToAccessorFor('sede_usuaro_id', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede_usuaro_id', this.sede_usuaro_id.inclusionResolver);
  }
}
