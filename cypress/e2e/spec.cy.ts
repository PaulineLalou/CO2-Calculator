describe('CO2 Calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Assuming the app is served on the root URL
  });
  cy.on('uncaught:exception', (err, runnable) => {
  return false;
});

  it('should calculate CO2 emissions correctly', () => {
    // Set up test data
    cy.get('#origin').wait(1000).type('2 rue de la miséricorde').wait(1000)
     cy.get('.suggestions').first().click().wait(1000)
    cy.get('#destination').type('rue de la folie méricourt').wait(1000)
    cy.get('.suggestions').first().click().wait(1000)

    cy.get('#transportation-mode').select('Car');

    // Click the "Calculate Distance" button
    cy.get('button').contains('Calculate Distance').click().wait(1000);

    // Wait for the distance calculation to complete
    cy.get('.distance-in-km').should('contain', 'Distance: ');

    // Verify the CO2 emission calculation
    cy.get('.co2-calculator').should('contain', 'CO2 Emission: ');

    // Verify error messages are not displayed
    cy.get('.error-message').should('not.exist');
  });

  it('should display error messages for invalid inputs', () => {
    // Set up test data with invalid inputs
    cy.get('#origin').wait(1000).type('Invalid origin').wait(1000);
    cy.get('#destination').type('Invalid destination').wait(1000);
    cy.get('#transportation-mode').select('Car').wait(1000);

    // Click the "Calculate Distance" button
    cy.get('button').contains('Calculate Distance').click().wait(1000);

    // Verify the error message is displayed
    cy.get('.error-message').should('be.visible');
  });
});
