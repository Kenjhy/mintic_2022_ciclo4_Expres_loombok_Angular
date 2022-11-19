// Uncomment these imports to begin using these cool features!

import { getModelSchemaRef, post, requestBody, response } from "@loopback/rest";
import { Credenciales } from "../models/credenciales.model";

// import {inject} from '@loopback/core';


export class LoginController {
  constructor() {}

  @post('login')
  @response(200,{
  description: 'Usuario model instance',
  content: {'application/json': {schema: getModelSchemaRef(Credenciales)}}
  })
  async login(@requestBody() credenciales: Credenciales) {
    return
  
  }
}


