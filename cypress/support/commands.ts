/* eslint-disable cypress/no-unnecessary-waiting */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// Add Testing Library Commands
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('google', () => cy.visit('https://google.com'))

Cypress.Commands.add('shouldRenderBanner', () => {
  cy.get('.slick-slider').within(() => {
    cy.findByRole('heading', {
      name: /the witcher 3: wild hunt - game of the year edition/i
    }).should('exist')
    cy.findByRole('link', { name: /buy now/i }).should('exist')
    cy.get('.slick-dots > :nth-child(2) > button').click()
    cy.wait(500)
    cy.findByRole('heading', { name: /cyberpunk 2077/i }).should('exist')
    cy.findByRole('link', { name: /buy now/i }).should('exist')
    cy.get('.slick-dots > :nth-child(3) > button').click()
    cy.wait(500)
    cy.findByRole('heading', {
      name: /bioshock infinite complete edition includes all the dlc/i
    }).should('exist')
    cy.findByRole('link', { name: /buy now/i }).should('exist')
  })
})

Cypress.Commands.add('shouldRenderShowcase', ({ name, highlight = false }) => {
  cy.get(`[data-testid="${name}"]`).within(() => {
    cy.findByRole('heading', { name }).should('exist')
    cy.get(`[data-testid="highlight"]`).should(highlight ? 'exist' : 'not.exist')
    highlight &&
      cy.get(`[data-testid="highlight"]`).within(() => {
        cy.findByRole('link').should('have.attr', 'href')
      })
    cy.get('[data-testid="game-card"]').should('have.length.gt', 0)
  })
})
