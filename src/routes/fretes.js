/**
 * @param {import('fastify').FastifyInstance} fastify - Instância do Fastify
 * @param {import('fastify').FastifyPluginOptions} opts - Opções do plugin
 */

export default async function (fastify, opts) {
    fastify.get('/fretes', async(request, response) => {
        const fretes = await fastify.prisma.frete.findMany();
        return fretes
    })

    fastify.post('/create-fretes', async (request, response) => {
        const { origem, destino, peso } = request.body
        return { message: `Frete criado de ${origem} para ${destino} com peso ${peso}kg` };
    })
}