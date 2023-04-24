import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async (fastify: FastifyInstance) => {

  fastify.get('/', {
    config: {
      rateLimit: {
        max: 3,
        timeWindow: '1 minute'
      }
    }
  }, async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ ok: true })
  })

}