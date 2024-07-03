describe('Swag Labs Login', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/v1/index.html')
  })

  it('should log in with a standard user', () => {
    cy.get('input[data-test="username"]').type('standard_user')
    cy.get('input[data-test="password"]').type('secret_sauce')
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  it('should not log in with a locked out user', () => {
    cy.get('input[data-test="username"]').type('locked_out_user')
    cy.get('input[data-test="password"]').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get('h3[data-test="error"]').should('contain.text', 'Sorry, this user has been locked out.')
  })

  it('should log in with a problem user', () => {
    cy.get('input[data-test="username"]').type('problem_user')
    cy.get('input[data-test="password"]').type('secret_sauce')
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  it('should log in with a performance glitch user', () => {
    cy.get('input[data-test="username"]').type('performance_glitch_user')
    cy.get('input[data-test="password"]').type('secret_sauce')
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  it('should not log in with an invalid username', () => {
    cy.get('input[data-test="username"]').type('invalid_user')
    cy.get('input[data-test="password"]').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get('h3[data-test="error"]').should('contain.text', 'Username and password do not match any user in this service')
  })

  it('should not log in with an invalid password', () => {
    cy.get('input[data-test="username"]').type('standard_user')
    cy.get('input[data-test="password"]').type('invalid_password')
    cy.get('#login-button').click()
    cy.get('h3[data-test="error"]').should('contain.text', 'Username and password do not match any user in this service')
  })

  it('should not log in with an empty username', () => {
    cy.get('input[data-test="password"]').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get('h3[data-test="error"]').should('contain.text', 'Username is required')
  })

  it('should not log in with an empty password', () => {
    cy.get('input[data-test="username"]').type('standard_user')
    cy.get('#login-button').click()
    cy.get('h3[data-test="error"]').should('contain.text', 'Password is required')
  })

  it('should not log in with empty username and password', () => {
    cy.get('#login-button').click()
    cy.get('h3[data-test="error"]').should('contain.text', 'Username is required')
  })

  it('should have username and password fields', () => {
    cy.get('input[data-test="username"]').should('be.visible').and('have.attr', 'placeholder', 'Username')
    cy.get('input[data-test="password"]').should('be.visible').and('have.attr', 'placeholder', 'Password')
  })

  it('should have a login button', () => {
    cy.get('#login-button').should('be.visible').and('have.value', 'LOGIN')
  })
})
