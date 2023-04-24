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
    try {
      reply.status(200).send()
    } catch (e) {
      reply.status(500).send()
    }
  })

} 
