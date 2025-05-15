import WebSocket from 'ws';
import { logger } from '../config/logger';

export class WebSocketServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.clientes = new Set();
    
    this.iniciar();
  }

  iniciar() {
    this.wss.on('connection', (ws) => {
      this.clientes.add(ws);
      logger.info(`Novo cliente WebSocket conectado (Total: ${this.clientes.size})`);

      ws.on('close', () => {
        this.clientes.delete(ws);
        logger.info(`Cliente desconectado (Total: ${this.clientes.size})`);
      });
    });
  }

  notificarTodos(mensagem) {
    const dados = JSON.stringify(mensagem);
    this.clientes.forEach((cliente) => {
      if (cliente.readyState === WebSocket.OPEN) {
        cliente.send(dados);
      }
    });
  }
}