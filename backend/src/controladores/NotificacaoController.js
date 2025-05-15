import { filaNotificacoes } from '../servicos/fila';

export const enviarNotificacao = async (req, res) => {
  await filaNotificacoes.add({
    usuarioId: req.usuario.id,
    mensagem: 'Nova fatura cadastrada'
  });
  
  res.status(202).json({ mensagem: 'Notificação em processamento' });
};