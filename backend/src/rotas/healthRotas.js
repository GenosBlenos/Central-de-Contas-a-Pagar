import { Router } from 'express';
import { checarConexaoDB } from '../servicos/healthService';

const router = Router();

router.get('/health', async (req, res) => {
  const statusDB = await checarConexaoDB();
  
  const status = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    dependencies: {
      database: statusDB ? 'healthy' : 'unhealthy'
    }
  };

  return res.status(statusDB ? 200 : 503).json(status);
});

export default router;