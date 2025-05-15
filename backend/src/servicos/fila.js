import { Queue } from 'bull';
import { logger } from '../config/logger';

export const filaNotificacoes = new Queue('notificacoes', {
  redis: process.env.REDIS_URL
});

filaNotificacoes.process(async (job) => {
  const { usuarioId, mensagem } = job.data;
  logger.info(`Enviando notificação para usuário ${usuarioId}: ${mensagem}`);
  // Implementar lógica de envio de email/notificação
});

filaNotificacoes.on('completed', (job) => {
  logger.info(`Job ${job.id} concluído`);
});