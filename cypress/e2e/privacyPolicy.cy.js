 /*Crie um testes chamado testa a página da política de privacidade de forma independente
Use sua criativade e as funcionalidades que aprendeu até aqui para realizar este teste (a solução é mais simples do que você imagina)*/
  it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    cy.get('#white-background')

      .should('have.css', 'background-color', 'rgb(254, 199, 215)');
    // Nota: O Cypress geralmente lê cores em RGB, não Hexadecimal.
     cy.get('body')

      .should('have.css', 'background-color', 'rgb(24, 24, 24)');
    
  })