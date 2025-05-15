import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filtros: {
    status: '',
    periodo: '30d'
  }
};

export const faturasSlice = createSlice({
  name: 'faturas',
  initialState,
  reducers: {
    atualizarFiltros: (state, action) => {
      state.filtros = { ...state.filtros, ...action.payload };
    }
  }
});

export const { atualizarFiltros } = faturasSlice.actions;
export default faturasSlice.reducer;