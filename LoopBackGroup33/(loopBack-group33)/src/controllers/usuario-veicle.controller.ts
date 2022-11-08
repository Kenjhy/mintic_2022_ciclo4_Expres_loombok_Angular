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
  Veicle,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioVeicleController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/veicle', {
    responses: {
      '200': {
        description: 'Usuario has one Veicle',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Veicle),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Veicle>,
  ): Promise<Veicle> {
    return this.usuarioRepository.s_usuario_veicle(id).get(filter);
  }

  @post('/usuarios/{id}/veicle', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Veicle)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id_usuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veicle, {
            title: 'NewVeicleInUsuario',
            exclude: ['placa'],
            optional: ['usuario_veicle']
          }),
        },
      },
    }) veicle: Omit<Veicle, 'placa'>,
  ): Promise<Veicle> {
    return this.usuarioRepository.s_usuario_veicle(id).create(veicle);
  }

  @patch('/usuarios/{id}/veicle', {
    responses: {
      '200': {
        description: 'Usuario.Veicle PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veicle, {partial: true}),
        },
      },
    })
    veicle: Partial<Veicle>,
    @param.query.object('where', getWhereSchemaFor(Veicle)) where?: Where<Veicle>,
  ): Promise<Count> {
    return this.usuarioRepository.s_usuario_veicle(id).patch(veicle, where);
  }

  @del('/usuarios/{id}/veicle', {
    responses: {
      '200': {
        description: 'Usuario.Veicle DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Veicle)) where?: Where<Veicle>,
  ): Promise<Count> {
    return this.usuarioRepository.s_usuario_veicle(id).delete(where);
  }
}
