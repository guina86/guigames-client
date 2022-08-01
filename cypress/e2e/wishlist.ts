/// <reference path="../support/index.d.ts" />

describe('Wishlist', () => {
  it('should add and remove games from wishlist', () => {
    cy.visit('/wishlist')

    cy.signIn()

    cy.url().should('eq', `${Cypress.config().baseUrl}/wishlist`)

    cy.findAllByTestId('game-card')
      .first()
      .within(() => {
        cy.findByLabelText(/add to wishlist/i).click()
      })

    cy.findByTestId('wishlist').within(() => {
      // assert wishlist has 1 game-card
      cy.findAllByTestId('game-card').should('have.length', 1)
      // remove game from wishlist
      cy.findByLabelText(/remove from wishlist/i).click()
    })

    cy.findByRole('heading', { name: /your wishlist is empty/i }).should('exist')
  })
})
