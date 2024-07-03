import loginData from '../fixtures/loginData.json'

describe('Swag Labs Login', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/v1/index.html')
  })

  it('should log-in with a standard user', () => {
    const { user_Email, user_Password } = loginData.standardUser[0];

    cy.get('input[data-test="username"]').type(user_Email)
    cy.get('input[data-test="password"]').type(user_Password)
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  it('should not log-in with a locked out user', () => {
    const { user_Email, user_Password } = loginData.nonlogIn[1];
    cy.get('input[data-test="username"]').type(user_Email)
    cy.get('input[data-test="password"]').type(user_Password)
    cy.get('#login-button').click()
    cy.get('h3[data-test="error"]').should('contain.text', 'Sorry, this user has been locked out.')
  })

  it('should log-in with a problem user', () => {
    const { user_Email, user_Password } = loginData.problemUser[2];
    cy.get('input[data-test="username"]').type(user_Email)
    cy.get('input[data-test="password"]').type(user_Password)
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  it('should log-in with a performance glitch user', () => {
    const { user_Email, user_Password } = loginData.performanceGlitchUser[3];
    cy.get('input[data-test="username"]').type(user_Email)
    cy.get('input[data-test="password"]').type(user_Password)
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  it('should not log in with an invalid username', () => {
    const { user_Email, user_Password} = loginData.invalidUser[4];
    cy.get('input[data-test="username"]').type(user_Email)
    cy.get('input[data-test="password"]').type(user_Password)
    cy.get('#login-button').click()
    cy.get('h3[data-test="error"]').should('contain.text', 'Username and password do not match any user in this service')
  })

  it('should not log in with an invalid password', () => {
    const { user_Email, user_Password} = loginData.invalidPassword[5];
    cy.get('input[data-test="username"]').type(user_Email)
    cy.get('input[data-test="password"]').type(user_Password)
    cy.get('#login-button').click()
    cy.get('h3[data-test="error"]').should('contain.text', 'Username and password do not match any user in this service')
  })

  it('should not log in with an empty username', () => {
    const { user_Email } = loginData.emptyUser[6];
    cy.get('input[data-test="password"]').type(user_Email)
    cy.get('#login-button').click()
    cy.get('h3[data-test="error"]').should('contain.text', 'Username is required')
  })

  it('should not log in with an empty password', () => {
    const { user_Password } = loginData.emptyPassword[7];
    cy.get('input[data-test="username"]').type(user_Password)
    cy.get('#login-button').click()
    cy.get('h3[data-test="error"]').should('contain.text', 'Password is required')
  })

  it('should not log in with empty username and password', () => {
    const { user_Email, user_Password } = loginData.emptyEmailemptyPassword[8];
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
