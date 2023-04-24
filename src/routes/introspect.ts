import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

import introspectSchema from '../schema/introspect';

export default async (fastify: FastifyInstance) => {

  fastify.post('/introspect', {
    config: {
      rateLimit: {
        max: 10,
        timeWindow: '1 minute',
        keyGenerator: (request: any) => {
          return request.headers['x-real-ip'];
        }
      }
    },
    schema: introspectSchema,
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const decoded: any = await request.jwtVerify();
      reply
        .status(200)
        .send(decoded);
    } catch (error: any) {
      request.log.error(error)
      reply
        .status(401)
        .send({
          code: 401,
          error: 'UNAUTHORIZED'
        })
    }
  })

} 