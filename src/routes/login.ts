import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Knex } from "knex";
import * as crypto from 'crypto'

import loginSchema from '../schema/login';

import { LoginModel } from '../models/login'

export default async (fastify: FastifyInstance) => {

  const loginModel = new LoginModel();
  const db: Knex = fastify.db;

  fastify.post('/', {
    schema: loginSchema,
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    const body: any = request.body
    const username = body.username
    const password = body.password

    try {
      const encPassword = crypto.createHash('md5').update(password).digest('hex')
      const rs: any = await loginModel.login(db, username, encPassword)

      if (rs) {
        const user: any = rs
        const payload: any = {
          userId: user.user_id,
          firstName: user.first_name,
          lastName: user.last_name
        }

        const token = fastify.jwt.sign(payload)
        reply.send({ token })
      } else {
        reply.status(401).send({ ok: false, message: 'Login failed' })
      }
    } catch (error: any) {
      console.error(error);
      reply.status(500).send({ message: error.message })
    }
  })

} 
