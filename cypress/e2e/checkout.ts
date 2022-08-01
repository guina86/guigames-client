/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference path="../support/index.d.ts" />

import { createUser } from '../support/generate'

describe('Checkout', () => {
  let user: User

  describe('Free Games', () => {
    before(() => {
      user = createUser()
    })

    it('should buy free games', () => {
      cy.visit('/sign-up')

      cy.signUp(user)

      cy.url().should('eq', `${Cypress.config().baseUrl}/`)

      cy.findByRole('link', { name: /explore/i }).click()

      cy.url().should('contain', '/games')

      cy.findByRole('radio', { name: /free/i }).click()
      cy.location('href').should('contain', `price_lte=0`)
      cy.wait(500)

      cy.addToCartByIndex(0)

      cy.findAllByLabelText(/cart items/i)
        .first()
        .should('have.text', '1')
        .click()

      cy.findByTestId('cart-list').within(() => {
        cy.findByRole('link', { name: /open cart/i }).click()
      })

      cy.url().should('contain', '/cart')
      cy.findByRole('link', { name: /checkout/i }).click()

      cy.url().should('contain', '/checkout')

      cy.findByText(/Click on Buy now to add the games to your account and enjoy./i).should('exist')

      cy.findByRole('button', { name: /buy now/i }).click()

      cy.url().should('contain', '/success')

      cy.findByRole('heading', { name: /Your purchase was successful!/i })

      cy.findByRole('link', { name: /orders list/i }).click()

      cy.url().should('contain', '/profile/orders')

      cy.findAllByTestId('game-item').should('have.length', 1)
    })
  })

  describe('Paid Games', () => {
    before(() => {
      user = createUser()
    })

    it.only('should buy paid games', () => {
      cy.visit('/sign-up')

      cy.signUp(user)

      cy.url().should('eq', `${Cypress.config().baseUrl}/`)

      cy.findByRole('link', { name: /explore/i }).click()

      cy.url().should('contain', '/games')

      cy.findByRole('radio', { name: /highest to lowest/i }).click()
      cy.location('href').should('contain', `sort=price%3Adesc`)
      cy.wait(500)

      cy.addToCartByIndex(0)

      cy.findAllByLabelText(/cart items/i)
        .first()
        .should('have.text', '1')
        .click()

      cy.findByTestId('cart-list').within(() => {
        cy.findByRole('link', { name: /open cart/i }).click()
      })

      cy.url().should('contain', '/cart')
      cy.findByRole('link', { name: /checkout/i }).click()

      cy.url().should('contain', '/checkout')

      cy.findByRole('button', { name: /buy now/i }).should('have.attr', 'disabled')

      cy.fillElementsInput('cardNumber', '4242424242424242')
      cy.fillElementsInput('cardExpiry', '1040')
      cy.fillElementsInput('cardCvc', '432')

      cy.findByRole('button', { name: /buy now/i }).click()

      cy.url().should('contain', '/success')

      cy.findByRole('heading', { name: /Your purchase was successful!/i })

      cy.findByRole('link', { name: /orders list/i }).click()

      cy.url().should('contain', '/profile/orders')

      cy.findAllByTestId('game-item').should('have.length', 1)
    })
  })
})
