describe('CashDash', () => {
  it('should add new transaction to list of transactions', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Transactions').click();
    cy.contains('Add Transaction').click();
    cy.get('[data-testid=category-options]').select('Bills');
    cy.get('[data-testid=category-options]').should('have.value', 'Bills');
    cy.get('[data-testid=setAmount]').type('300');
    cy.get('[data-testid=setAmount]').should('have.value', '300');
    cy.get('[data-testid=setNote]').type('Not more bills!');
    cy.get('[data-testid=setNote]').should('have.value', 'Not more bills!');
    cy.contains('Save Transaction').click();
    cy.contains('Not more bills!').should('be.visible');
  });
  it('should edit transaction in current list of transactions', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Transactions').click();
    cy.contains('Freelancing').siblings().find('button').eq(0).click();
    cy.get('[data-testid=category-options]').select('Salary');
    cy.get('[data-testid=category-options]').should('have.value', 'Salary');
    cy.get('[data-testid=setAmount]').clear().type('300');
    cy.get('[data-testid=setAmount]').should('have.value', '300');
    cy.get('[data-testid=setNote]').clear().type('More money!');
    cy.get('[data-testid=setNote]').should('have.value', 'More money!');
    cy.contains('Save Transaction').click();
    cy.contains('More money!').should('be.visible');
  });
});
