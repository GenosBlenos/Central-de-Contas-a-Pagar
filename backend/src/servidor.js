const express = require('express');
const app = express();
const rotasAutenticacao = require('./rotas/autenticacaoRotas');

app.use(express.json());
app.use('/api/autenticacao', rotasAutenticacao);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});