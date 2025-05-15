const Usuario = require('../modelos/Usuario');

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
  
  if (usuario && usuario.senha === senha) { // ⚠️ Use bcrypt em produção!
    res.json({ token: 'TOKEN_FICTICIO' });
  } else {
    res.status(401).json({ erro: 'Credenciais inválidas' });
  }
};