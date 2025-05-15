import React, { createContext, useEffect, useState } from 'react';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WS_URL);
    
    socket.onmessage = (event) => {
      const mensagem = JSON.parse(event.data);
      setNotificacoes(prev => [...prev, mensagem]);
    };

    setWs(socket);
    return () => socket.close();
  }, []);

  return (
    <WebSocketContext.Provider value={{ ws, notificacoes }}>
      {children}
    </WebSocketContext.Provider>
  );
};