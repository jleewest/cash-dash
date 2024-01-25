describe('CashDash', () => {
  it('should add new transaction to list of transactions', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Transactions').click();
    cy.contains('Add Transaction').click();
    cy.get('[data-testid=category-options]').select('Transportation');
    cy.get('[data-testid=category-options]').should(
      'have.value',
      'Transportation'
    );
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
    cy.contains('Transportation').siblings().find('button').eq(0).click();
    cy.get('[data-testid=category-options]').select('Subscriptions');
    cy.get('[data-testid=category-options]').should(
      'have.value',
      'Subscriptions'
    );
    cy.get('[data-testid=setAmount]').clear().type('3000');
    cy.get('[data-testid=setAmount]').should('have.value', '3000');
    cy.get('[data-testid=setNote]').clear().type('So much money!');
    cy.get('[data-testid=setNote]').should('have.value', 'So much money!');
    cy.contains('Save Transaction').click();
    cy.contains('So much money!').should('be.visible');
  });
  it('should delete transaction in current list of transactions', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Transactions').click();
    cy.contains('Subscriptions').siblings().find('button').eq(1).click();
  });
});
