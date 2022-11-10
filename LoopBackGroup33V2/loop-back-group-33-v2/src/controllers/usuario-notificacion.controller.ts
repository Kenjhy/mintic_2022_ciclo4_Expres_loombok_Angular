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
  Usuario,
  Notificacion,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioNotificacionController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/notificacions', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Notificacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Notificacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Notificacion>,
  ): Promise<Notificacion[]> {
    return this.usuarioRepository.notificaciones_usuario(id).find(filter);
  }

  @post('/usuarios/{id}/notificacions', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Notificacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.isUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificacion, {
            title: 'NewNotificacionInUsuario',
            exclude: ['id_notificacion'],
            optional: ['usuarioId']
          }),
        },
      },
    }) notificacion: Omit<Notificacion, 'id_notificacion'>,
  ): Promise<Notificacion> {
    return this.usuarioRepository.notificaciones_usuario(id).create(notificacion);
  }

  @patch('/usuarios/{id}/notificacions', {
    responses: {
      '200': {
        description: 'Usuario.Notificacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificacion, {partial: true}),
        },
      },
    })
    notificacion: Partial<Notificacion>,
    @param.query.object('where', getWhereSchemaFor(Notificacion)) where?: Where<Notificacion>,
  ): Promise<Count> {
    return this.usuarioRepository.notificaciones_usuario(id).patch(notificacion, where);
  }

  @del('/usuarios/{id}/notificacions', {
    responses: {
      '200': {
        description: 'Usuario.Notificacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Notificacion)) where?: Where<Notificacion>,
  ): Promise<Count> {
    return this.usuarioRepository.notificaciones_usuario(id).delete(where);
  }
}
