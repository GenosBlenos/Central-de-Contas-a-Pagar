import request from 'supertest';
import { app } from '../servidor';
import { conectarDB, desconectarDB } from '../config/bancoDados';
import Fatura from '../modelos/Fatura';

describe('Testes de Integração - Faturas', () => {
  beforeAll(async () => {
    await conectarDB();
  });

  afterAll(async () => {
    await Fatura.deleteMany({});
    await desconectarDB();
  });

  test('POST /faturas - Deve criar nova fatura', async () => {
    const resposta = await request(app)
      .post('/faturas')
      .send({
        descricao: 'Teste Integração',
        valor: 1500.50,
        vencimento: '2024-06-01'
      })
      .expect(201);

    expect(resposta.body).toHaveProperty('_id');
    expect(resposta.body.descricao).toBe('Teste Integração');
  });

  test('GET /faturas - Deve listar faturas', async () => {
    const resposta = await request(app)
      .get('/faturas')
      .expect(200);

    expect(resposta.body).toBeInstanceOf(Array);
    expect(resposta.body.length).toBeGreaterThan(0);
  });
});