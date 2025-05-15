export const manipuladorErros = (err, req, res, next) => {
  const errosMapeados = {
    ValidationError: 400,
    CastError: 400,
    JsonWebTokenError: 401,
    TokenExpiredError: 401,
    Default: 500
  };

  const status = errosMapeados[err.name] || errosMapeados.Default;
  const mensagem = status === 500 ? 'Erro interno do servidor' : err.message;

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${new Date().toISOString()}] ERRO:`, err.stack);
  }

  res.status(status).json({
    sucesso: false,
    mensagem,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};