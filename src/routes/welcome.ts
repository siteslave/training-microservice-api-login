import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async (fastify: FastifyInstance) => {

  fastify.get('/', {
    config: {
      rateLimit: {
        max: 10,
        timeWindow: '1 minute',
        keyGenerator: (request: any) => {
          return request.headers['x-real-ip'];
        }
      }
    }
  }, async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ ok: true })
  })

}