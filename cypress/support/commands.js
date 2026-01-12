Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Fábio',
    lastName: 'Telles',
    email: 'fabiotel@hnakdffs.com',
    text: 'Teste'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    // ERREI -- cy.contains (cy.get('button[type="submit"]')().click)
    // FORMA CORRETA:
    // O primeiro argumento é a tag e o segundo é o conteúdo
    cy.contains('button', 'Enviar').click()
})
