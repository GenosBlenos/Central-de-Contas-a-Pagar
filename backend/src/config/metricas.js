import prometheus from 'prom-client';

export const registrarMetricas = new prometheus.Registry();

prometheus.collectDefaultMetrics({
  register: registrarMetricas,
  prefix: 'contas_backend_'
});

export const httpRequestCounter = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total de requisições HTTP',
  labelNames: ['method', 'route', 'status_code'],
  registers: [registrarMetricas]
});

export const databaseResponseTime = new prometheus.Histogram({
  name: 'database_response_time_seconds',
  help: 'Tempo de resposta do banco de dados',
  labelNames: ['operation', 'success'],
  buckets: [0.1, 0.5, 1, 2, 5],
  registers: [registrarMetricas]
});