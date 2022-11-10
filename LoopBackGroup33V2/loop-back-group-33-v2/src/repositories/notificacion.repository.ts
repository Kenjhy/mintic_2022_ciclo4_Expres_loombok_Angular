import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Notificacion, NotificacionRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class NotificacionRepository extends DefaultCrudRepository<
  Notificacion,
  typeof Notificacion.prototype.id_notificacion,
  NotificacionRelations
> {

  public readonly usuario_notificacion: BelongsToAccessor<Usuario, typeof Notificacion.prototype.id_notificacion>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('UsuarioRepository')
    protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Notificacion, dataSource);
    this.usuario_notificacion = this.createBelongsToAccessorFor('usuario_notificacion', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario_notificacion', this.usuario_notificacion.inclusionResolver);
  }
}
