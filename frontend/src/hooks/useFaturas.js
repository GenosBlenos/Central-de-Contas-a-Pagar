import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { atualizarFiltros } from '../redux/faturasSlice';
import api from '../servicos/api';

export const useFaturas = () => {
  const dispatch = useDispatch();
  const filtros = useSelector((state) => state.faturas.filtros);

  const buscarFaturas = async () => {
    try {
      const response = await api.get('/faturas', { params: filtros });
      return response.data;
    } catch (erro) {
      console.error('Erro ao buscar faturas:', erro);
      throw erro;
    }
  };

  useEffect(() => {
    buscarFaturas();
  }, [filtros]);

  return {
    filtros,
    atualizarFiltros: (novosFiltros) => dispatch(atualizarFiltros(novosFiltros))
  };
};