describe('Order procctss', function() {
  Cypress.config().baseUrl

  beforeEach(function() {
    cy.visit('');
    cy.get('[data-cy="ingredient"]').first().as('ingredient');
  });

  it('Should open and close ingredient modal', function() {

    cy.get('@ingredient').click();
    cy.get('[data-cy="ingredientDetails"]').should('be.visible');
    cy.get('[data-cy="closeModalIcon"]').click();
    cy.get('[data-cy="ingredientDetails"]').should('not.exist');
  });

  it('Should drag and drop ingredient and make order', function() {
    cy.get('[data-cy="dropTarget"]').first().as('dropTarget')
    cy.get('[data-cy="constructorItem"]').should('not.exist');

    cy.get('@ingredient').trigger('dragstart');
    cy.get('@dropTarget').trigger('dragover');

    cy.get('@dropTarget').trigger('drop');
    cy.get('[data-cy="constructorItem"]').should('be.visible');

    cy.visit('#/login');
    cy.get('[data-cy="emailInput"').first().type('kurzanbl4@gmail.com');
    cy.get('[data-cy="passwordInput"').first().type('123456');
    cy.get('[data-cy="enterButton"').first().click();

    cy.get('[data-cy="orderButton"]').click();

    cy.get('[data-cy="orderNumber"]').should('be.visible');
    cy.get('[data-cy="orderNumber"]').should('be.not.empty');
    cy.get('[data-cy="closeModalIcon"]').click();
  });

});