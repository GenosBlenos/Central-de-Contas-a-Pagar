describe('Testes do Dashboard', () => {
  beforeEach(() => {
    cy.login('usuario@exemplo.com', 'senha123');
    cy.visit('/dashboard');
  });

  it('Deve exibir gráfico de faturas', () => {
    cy.get('[data-testid="grafico-linhas"]').should('be.visible');
  });

  it('Deve filtrar faturas por status', () => {
    cy.get('[data-testid="filtro-status"]').select('pendente');
    cy.get('[data-testid="lista-faturas"] .fatura-item').should('have.length.gt', 0);
  });
});