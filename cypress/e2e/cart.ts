/// <reference path="../support/index.d.ts" />

describe('Cart', () => {
  it('should add and remove items from cart', () => {
    cy.visit('/')
    ;[0, 1, 2].forEach(cy.addToCartByIndex)

    cy.findAllByLabelText(/cart items/i)
      .first()
      .should('have.text', '3')
      .click()

    cy.findByTestId('cart-list').within(() => {
      cy.findAllByRole('heading').should('have.length', 3)
    })

    cy.findAllByLabelText(/shopping cart/i)
      .first()
      .click()
    ;[0, 1, 2].forEach(cy.removeFromCartByIndex)

    cy.findByLabelText(/cart items/i).should('not.exist')

    cy.findAllByLabelText(/shopping cart/i)
      .first()
      .click()
    cy.findByRole('heading', { name: /your cart is empty/i }).should('exist')
  })
})
