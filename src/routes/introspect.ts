import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

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
    },
    onRequest: [fastify.authenticate]
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const decoded: any = request.user;
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