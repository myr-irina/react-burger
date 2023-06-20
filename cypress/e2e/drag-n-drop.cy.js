import { email, password } from '../fixtures/auth.json';

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

  it('should drag ingredinet to the constructor container', () => {
    cy.get('[data-testid=ingredient-container]').first().trigger('dragstart');
    cy.get('[data-testid=constructor-container]').trigger('drop');
    cy.get('[data-testid=ingredient-container]').last().trigger('dragstart');
    cy.get('[data-testid=constructor-container]').trigger('drop');
  });

  it('should create order', () => {
    cy.get('[data-testid=ingredient-container]').first().trigger('dragstart');
    cy.get('[data-testid=constructor-container]').trigger('drop');
    cy.get('[data-testid=ingredient-container]').last().trigger('dragstart');
    cy.get('[data-testid=constructor-container]').trigger('drop');
    cy.get('[data-testid=constructor-button]').click();

    cy.contains('Вход');
    cy.get('[data-testid=login-email-input]').type(email);
    cy.get('[data-testid=login-password-input]').type(password);
    cy.get('[data-testid=login-button]').click();
    cy.get('.button').contains('Оформить заказ').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(20000);
    cy.contains('идентификатор заказа');
    cy.get('[data-testid=modal-close]').click();
  });
});
