import { createClient } from 'redis';
import { logger } from '../config/logger';

const client = createClient({
  url: process.env.REDIS_URL
});

client.on('error', (err) => logger.error(`Redis Error: ${err.message}`));

export const conectarRedis = async () => {
  await client.connect();
  logger.info('Conectado ao Redis');
};

export const cacheMiddleware = (ttl = 60) => async (req, res, next) => {
  const chave = `cache:${req.originalUrl}`;
  
  try {
    const dadosCache = await client.get(chave);
    if (dadosCache) return res.json(JSON.parse(dadosCache));
    
    const sendOriginal = res.send;
    res.send = (body) => {
      client.setEx(chave, ttl, JSON.stringify(body));
      return sendOriginal.call(res, body);
    };
    
    next();
  } catch (erro) {
    logger.error(`Falha no cache: ${erro.message}`);
    next();
  }
};