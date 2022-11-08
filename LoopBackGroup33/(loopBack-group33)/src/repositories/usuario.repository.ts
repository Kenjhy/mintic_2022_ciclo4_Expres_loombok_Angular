import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Rol, Sede, Veicle} from '../models';
import {RolRepository} from './rol.repository';
import {SedeRepository} from './sede.repository';
import {VeicleRepository} from './veicle.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id_usuario,
  UsuarioRelations
> {

  public readonly rols: HasManyRepositoryFactory<Rol, typeof Usuario.prototype.id_usuario>;

  public readonly r_usuario_sede_id: BelongsToAccessor<Sede, typeof Usuario.prototype.id_usuario>;

  public readonly s_usuario_veicle: HasOneRepositoryFactory<Veicle, typeof Usuario.prototype.id_usuario>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('VeicleRepository') protected veicleRepositoryGetter: Getter<VeicleRepository>,
  ) {
    super(Usuario, dataSource);
    this.s_usuario_veicle = this.createHasOneRepositoryFactoryFor('s_usuario_veicle', veicleRepositoryGetter);
    this.registerInclusionResolver('s_usuario_veicle', this.s_usuario_veicle.inclusionResolver);
    this.r_usuario_sede_id = this.createBelongsToAccessorFor('r_usuario_sede_id', sedeRepositoryGetter,);
    this.registerInclusionResolver('r_usuario_sede_id', this.r_usuario_sede_id.inclusionResolver);
  }
}
