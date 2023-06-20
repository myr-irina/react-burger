describe('test burger drag and drop feature', () => {
  beforeEach('visit localhost:3000', () => {
    cy.visit('http://localhost:3000');
  });

  it('it shows page subtitle', () => {
    cy.contains('Соберите бургер');
  });

  it('open and close modal window', () => {
    cy.get('[data-testid=ingredient-container]').first().click();
    cy.contains('Детали ингредиента');
    cy.contains('Калории');
    cy.contains('Углеводы');
    cy.get('[data-testid=modal-header]').children().last().click();
  });

  it('drags and drops ingredient', () => {
    cy.get('[data-testid=ingredient-container]').first().trigger('dragstart');
    cy.get('[data-testid=constructor-container]').trigger('drop');
    cy.get('[data-testid=ingredient-container]').last().trigger('dragstart');
    cy.get('[data-testid=constructor-container]').trigger('drop');
  });
});
