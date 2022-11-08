import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Rol,
  Usuario,
} from '../models';
import {RolRepository} from '../repositories';

export class RolUsuarioController {
  constructor(
    @repository(RolRepository) protected rolRepository: RolRepository,
  ) { }

  @get('/rols/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Rol has many Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.rolRepository.s_rol_usuario(id).find(filter);
  }

  @post('/rols/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Rol.prototype.id_rol,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInRol',
            exclude: ['id_usuario'],
            optional: ['rol_usuario_id']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id_usuario'>,
  ): Promise<Usuario> {
    return this.rolRepository.s_rol_usuario(id).create(usuario);
  }

  @patch('/rols/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Rol.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.rolRepository.s_rol_usuario(id).patch(usuario, where);
  }

  @del('/rols/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Rol.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.rolRepository.s_rol_usuario(id).delete(where);
  }
}
