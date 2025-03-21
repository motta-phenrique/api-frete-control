// src/plugins/prisma.js
import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export default fp(async (fastify) => {
  // Verifica se o decorador 'prisma' já foi registrado
  if (!fastify.hasDecorator('prisma')) {
    fastify.decorate('prisma', prisma);

    // Desconectar ao fechar o servidor
    fastify.addHook('onClose', async () => {
      await prisma.$disconnect();
    });
  }
});
