import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const schemaAmbiente = z.object({
  JWT_SECRET: z.string().min(32),
  DB_URI: z.string().url(),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production']).default('development')
});

export const validarAmbiente = () => {
  try {
    return schemaAmbiente.parse(process.env);
  } catch (erro) {
    throw new Error(`Configuração de ambiente inválida: ${erro.errors.map(e => e.path.join('.')).join(', ')}`);
  }
};