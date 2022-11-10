import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Sede, Rol, Notificacion, Vehiculo} from '../models';
import {SedeRepository} from './sede.repository';
import {RolRepository} from './rol.repository';
import {NotificacionRepository} from './notificacion.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.isUsuario,
  UsuarioRelations
> {

  public readonly sede_usuario: BelongsToAccessor<Sede, typeof Usuario.prototype.isUsuario>;

  public readonly rol_usuario: BelongsToAccessor<Rol, typeof Usuario.prototype.isUsuario>;

  public readonly notificaciones_usuario: HasManyRepositoryFactory<Notificacion, typeof Usuario.prototype.isUsuario>;

  public readonly vehiculos_usuario: HasManyRepositoryFactory<Vehiculo, typeof Usuario.prototype.isUsuario>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>, @repository.getter('NotificacionRepository') protected notificacionRepositoryGetter: Getter<NotificacionRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Usuario, dataSource);
    this.vehiculos_usuario = this.createHasManyRepositoryFactoryFor('vehiculos_usuario', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos_usuario', this.vehiculos_usuario.inclusionResolver);
    this.notificaciones_usuario = this.createHasManyRepositoryFactoryFor('notificaciones_usuario', notificacionRepositoryGetter,);
    this.registerInclusionResolver('notificaciones_usuario', this.notificaciones_usuario.inclusionResolver);
    this.rol_usuario = this.createBelongsToAccessorFor('rol_usuario', rolRepositoryGetter,);
    this.registerInclusionResolver('rol_usuario', this.rol_usuario.inclusionResolver);
    this.sede_usuario = this.createBelongsToAccessorFor('sede_usuario', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede_usuario', this.sede_usuario.inclusionResolver);
  }
}
