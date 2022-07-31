/// <reference path="../support/index.d.ts" />

describe('Game Page', () => {
  before(() => {
    cy.visit('/game/little-nightmares-ii')
  })

  it('should render Game page', () => {
    cy.findByTestId('game-info').within(() => {
      cy.findByRole('heading', { name: /Little Nightmares II/i }).should('exist')
      cy.findByText(/^Little Nightmares II DEMO is available/i).should('exist')
      cy.findByText('$79.79').should('exist')
      cy.findByRole('button', { name: /add to cart/i }).should('exist')
    })
    cy.findAllByRole('button', { name: /thumb \-/i }).should('have.length.gt', 0)
    cy.findByTestId('content').within(() => {
      cy.findByRole('heading', { name: /description/i }).should('exist')
    })
    cy.findByTestId('content').children().should('have.length.at.least', 2)
    cy.findByTestId('game-details').within(() => {
      cy.findByRole('heading', { name: /game details/i }).should('exist')
      cy.findByRole('heading', { name: /developer/i }).should('exist')
      cy.findByRole('heading', { name: /release date/i }).should('exist')
      cy.findByRole('heading', { name: /platforms/i }).should('exist')
      cy.findByRole('heading', { name: /publisher/i }).should('exist')
      cy.findByRole('heading', { name: /rating/i }).should('exist')
      cy.findByRole('heading', { name: /genres/i }).should('exist')

      cy.findByText(/tarsier studios/i).should('exist')
      cy.findByText(/feb 9, 2021/i).should('exist')
      cy.findByRole('img', { name: /windows/i }).should('exist')
      cy.findByText('BANDAI NAMCO Entertainment Europe').should('exist')
      cy.findByText(/free/i).should('exist')
      cy.findByText('Action / Adventure / Puzzle').should('exist')
    })

    cy.shouldRenderShowcase({ name: 'Upcoming Games', highlight: true })
    cy.shouldRenderShowcase({ name: 'You may like these games', highlight: false })
  })

  it('should add/remove game to cart', () => {
    cy.findByTestId('game-info').within(() => {
      cy.findByRole('button', { name: /add to cart/i }).click()
      cy.findByRole('button', { name: /remove from cart/i }).should('exist')
    })

    cy.findAllByLabelText(/cart items/i)
      .first()
      .should('have.text', '1')
      .click()

    cy.findByTestId('cart-list').within(() => {
      cy.findByRole('heading', { name: /little nightmares ii/i }).should('exist')
    })

    cy.findAllByLabelText(/shopping cart/i)
      .first()
      .click()

    cy.findByTestId('game-info').within(() => {
      cy.findByRole('button', { name: /remove from cart/i }).click()
      cy.findByRole('button', { name: /add to cart/i }).should('exist')
    })

    cy.findByLabelText(/cart items/i).should('not.exist')

    cy.findAllByLabelText(/shopping cart/i)
      .first()
      .click()
    cy.findByRole('heading', { name: /your cart is empty/i }).should('exist')
  })
})
