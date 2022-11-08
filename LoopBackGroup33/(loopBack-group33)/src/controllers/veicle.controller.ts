import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Veicle} from '../models';
import {VeicleRepository} from '../repositories';

export class VeicleController {
  constructor(
    @repository(VeicleRepository)
    public veicleRepository : VeicleRepository,
  ) {}

  @post('/veicles')
  @response(200, {
    description: 'Veicle model instance',
    content: {'application/json': {schema: getModelSchemaRef(Veicle)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veicle, {
            title: 'NewVeicle',
            exclude: ['placa'],
          }),
        },
      },
    })
    veicle: Omit<Veicle, 'placa'>,
  ): Promise<Veicle> {
    return this.veicleRepository.create(veicle);
  }

  @get('/veicles/count')
  @response(200, {
    description: 'Veicle model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Veicle) where?: Where<Veicle>,
  ): Promise<Count> {
    return this.veicleRepository.count(where);
  }

  @get('/veicles')
  @response(200, {
    description: 'Array of Veicle model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Veicle, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Veicle) filter?: Filter<Veicle>,
  ): Promise<Veicle[]> {
    return this.veicleRepository.find(filter);
  }

  @patch('/veicles')
  @response(200, {
    description: 'Veicle PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veicle, {partial: true}),
        },
      },
    })
    veicle: Veicle,
    @param.where(Veicle) where?: Where<Veicle>,
  ): Promise<Count> {
    return this.veicleRepository.updateAll(veicle, where);
  }

  @get('/veicles/{id}')
  @response(200, {
    description: 'Veicle model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Veicle, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Veicle, {exclude: 'where'}) filter?: FilterExcludingWhere<Veicle>
  ): Promise<Veicle> {
    return this.veicleRepository.findById(id, filter);
  }

  @patch('/veicles/{id}')
  @response(204, {
    description: 'Veicle PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veicle, {partial: true}),
        },
      },
    })
    veicle: Veicle,
  ): Promise<void> {
    await this.veicleRepository.updateById(id, veicle);
  }

  @put('/veicles/{id}')
  @response(204, {
    description: 'Veicle PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() veicle: Veicle,
  ): Promise<void> {
    await this.veicleRepository.replaceById(id, veicle);
  }

  @del('/veicles/{id}')
  @response(204, {
    description: 'Veicle DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.veicleRepository.deleteById(id);
  }
}
