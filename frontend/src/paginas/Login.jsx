import React, { useState } from 'react';
import api from '../servicos/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const resposta = await api.post('/autenticacao/login', { email, senha });
      localStorage.setItem('token', resposta.data.token);
      window.location.href = '/dashboard';
    } catch (erro) {
      alert('Login falhou!');
    }
  };

  return (
    <div>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}