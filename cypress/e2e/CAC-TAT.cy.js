describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    // 1. Visita a aplicação usando o caminho relativo
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    // 2. Verifica se o título é exatamente o esperado
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  // Passo 2 e 3: Novo teste preenchendo os campos e enviando
  it('preenche os campos obrigatórios e envia o formulário', () => {
    //DA PRA CRIAR UMA VARIÁVEL DE TEXTO LONGO E USAR A BIBLIOTECA '_' + REPEAT
    const longText = Cypress._.repeat('abababababababababababababbababaab', 2)
    // Localiza os campos pelo ID (seletor CSS #) e digita os valores
    //AÇÕES
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('gabriel@exemplo.com')
    cy.get('#open-text-area').type(longText, { delay: 2 })
    // Clica no botão Enviar (geralmente buscamos pelo tipo submit ou classe do botão)
    cy.contains('button', 'Enviar').click()

    // Verificação opcional: geralmente após o envio, aparece uma mensagem de sucesso
    // RESULTADO ESPERADO
    cy.get('.success').should('be.visible')

    // VERIFICAÇÃO DA MENSAGEM DE SUCESSO:
    // Buscamos o elemento pela classe .success e verificamos se está visível
    cy.get('.success').should('be.visible')
  })

  //Ex.2
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    // 1. Preenche o nome
    cy.get('#firstName').type('Gabriel')

    // 2. Preenche o sobrenome
    cy.get('#lastName').type('Telles')

    // 3. Preenche o e-mail com formato INVÁLIDO (sem o @ ou domínio)
    cy.get('#email').type('email-invalido.com')

    // 4. Preenche a área de texto (usando o delay: 0 que aprendemos!)
    cy.get('#open-text-area').type('Teste de validação de erro', { delay: 0 })

    // 5. Clica no botão de enviar
    cy.contains('button', 'Enviar').click()

    // 6. Verifica se o elemento com a classe .error está visível
    cy.get('.error').should('be.visible')
  })

  //Ex. 3
  it('valor não-numérico for digitado, seu valor continuará vazio.', () => {
    // ---- TELEFONE
    cy.get('#phone').type('fdsjfhbsj').should('have.value', '')
  })
  //Ex. 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('gabriel@exemplo.com')
    cy.get('#open-text-area').type('Testando obrigatoriedade campo telefone')

    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()
    // O que eu espero que aconteça
    cy.get('.error').should('be.visible')
  })

  //Ex. 5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('#firstName')
      .type('Gabriel')
      .should('have.value', 'Gabriel')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Telles')
      .should('have.value', 'Telles')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('gabriel@exemplo.com')
      .should('have.value', 'gabriel@exemplo.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')

    cy.get('#open-text-area')
      .type('Testando inserção e exclusão de dados nos campos', { delay: 50 })
      .should('have.value', 'Testando inserção e exclusão de dados nos campos')
      .clear()
      .should('have.value', '')
  })
  //Ex.6
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

  })

  //Ex. 7 -- Comandos customizados
  it('envia o formuário com sucesso usando um comando customizado', () => {

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

  })

  //Ex. 8
  it('botão novo', () => {

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  //Lição 3 Ex. 1
  /*Crie um novo teste chamado seleciona um produto (YouTube) por seu texto
Verifique que após a seleção, tal opção foi realmente selecinada (.should('have.value', 'valor-aqui'))*/

  /* ERRADO --it.only('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').click('Youtube')
    cy.get('#product').should('have.value', 'YouTube')*/
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube') // Use .select() em vez de .click()
      .should('have.value', 'youtube') // Note que o VALOR geralmente é minúsculo
  })

  //Ex. extra 1
  /*Crie um novo teste chamado seleciona um produto (Mentoria) por seu valor (value)
Verifique que após a seleção, tal opção foi realmente selecinada (.should('have.value', 'valor-aqui'))*/
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria') //Select é usado num campo composto por options
      .should('have.value', 'mentoria')
  })

  //Ex. extra2
  /*Crie um novo teste chamado seleciona um produto (Blog) por seu índice
Verifique que após a seleção, tal opção foi realmente selecinada (.should('have.value', 'valor-aqui'))*/
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

  })

  //Ex. radiobutton
  /* Crie um teste chamado marca o tipo de atendimento "Feedback"
Faça a verificação de que o valor correto foi selecionado após o .check()*/
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("be.checked")
  })

  //Ex. extra radiobutton
  /*Crie um teste chamado marca cada tipo de atendimento
Faça a verificação de que após o .check(), cada radio foi marcado (.should('be.checked')) */

  /* ERRADO --- it.only('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"][value="ajuda"]')
      .check()
      .should("be.checked")

    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should("be.checked")

      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("be.checked")
  })*/

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  //Ex. Checkbox
  /*Crie um teste chamado marca ambos checkboxes, depois desmarca o último
O teste deve possuir verificações de que ambos checkboxes foram marcados, e depois, que o último (.last()) foi desmarcado */
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()                 // Marca TODOS de uma vez
      .should('be.checked')    // Verifica se todos foram marcados
      .last()                  // Seleciona especificamente o último
      .uncheck()               // Desmarca ele
      .should('not.be.checked') // Verifica que ele NÃO está mais marcado
  })
  //Ex. Aula 6
  /* Crie um teste chamado seleciona um arquivo da pasta fixtures
  Tal teste deve verificar que, após a seleção do arquivo, o nome correto do arquivo é persistido no objeto de files do input*/
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  //Ex. extra 1
  /*Crie um teste chamado seleciona um arquivo simulando um drag-and-drop
Tal teste deve verificar que, após a seleção do arquivo, 
o nome correto do arquivo é persistido no objeto de files do input */
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })

      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  //Ex. extra 2
  /* Crie um teste chamado seleciona um arquivo utilizando uma fixture para a qual foi dada um (alias = "apelido")
Tal teste deve verificar que, após a seleção do arquivo, o nome correto do arquivo é persistido no objeto de files do input*/

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  /*Crie um teste chamado verifica que a política de privacidade abre em outra aba sem a necessidade de um clique
Tal teste deve utilizar a alternativa 1 demonstrada acima*/

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {

    cy.contains('a', 'Política de Privacidade').should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  /*Crie um testes chamado acessa a página da política de privacidade removendo o target e então clicando no link
Tal teste deve utilizar a alternativa 2 demonstrada acima */
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

    /*Crie um script no arquivo package.json que abre o Cypress Runner simulando um dispositivo com 410 pixels
     de largura e 860 pixels de altura*/

})