import jwt from 'jsonwebtoken';

export const gerarTokens = (usuarioId) => {
  const accessToken = jwt.sign(
    { sub: usuarioId },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { sub: usuarioId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export const verificarRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (erro) {
    logger.error(`Erro ao verificar refresh token: ${erro.message}`);
    return null;
  }
};