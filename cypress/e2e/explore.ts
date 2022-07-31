/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference path="../support/index.d.ts" />

import {
  priceFields,
  categoriesFields,
  platformsFields,
  sortFields
} from '../../src/utils/filter/fields'

describe('Explore Page', () => {
  before(() => {
    cy.visit('/games')
  })

  it('should render filters columns', () => {
    cy.findByRole('heading', { name: /sort by price/i }).should('exist')
    cy.findByRole('heading', { name: /^price/i }).should('exist')
    cy.findByRole('heading', { name: /platforms/i }).should('exist')
    cy.findByRole('heading', { name: /genres/i }).should('exist')

    cy.shouldRenderFields(priceFields)
    cy.shouldRenderFields(sortFields)
    cy.shouldRenderFields(platformsFields)
    cy.shouldRenderFields(categoriesFields)
  })

  it('should show 15 games and show more games when show more is clicked', () => {
    cy.findAllByTestId('game-card').should('have.length', 15)
    cy.findByRole('button', { name: /show more/i }).click()
    cy.findAllByTestId('game-card').should('have.length', 30)
  })

  it('should order by price', () => {
    cy.findByText(/lowest to highest/i).click()

    cy.location('href').should('contain', 'sort=price%3Aasc')
    cy.wait(500)

    cy.findAllByTestId('game-card')
      .first()
      .within(() => {
        cy.findByText(/free/i).should('exist')
      })

    cy.findByText(/highest to lowest/i).click()

    cy.location('href').should('contain', 'sort=price%3Adesc')
    cy.wait(500)

    cy.findAllByTestId('game-card')
      .first()
      .within(() => {
        cy.findByText(/free/i).should('not.exist')
        cy.priceGreaterThan(0)
      })
  })

  it('should filter by price', () => {
    cy.findByText(/highest to lowest/i).click()
    cy.location('href').should('contain', 'sort=price%3Adesc')

    priceFields.forEach(({ label, name }) => {
      cy.findByRole('radio', { name: label }).click()
      cy.location('href').should('contain', `price_lte=${name}`)
      cy.wait(500)
      cy.findAllByTestId('game-card')
        .first()
        .within(() => {
          name === 0 ? cy.findByText(/free/i).should('exist') : cy.priceLessThan(name)
        })
    })
  })

  it('should filter by platform and genre', () => {
    platformsFields.forEach(({ name, label }) => {
      cy.findByRole('checkbox', { name: label }).click()
      cy.location('href').should('contain', `platforms=${name}`)
    })

    categoriesFields.forEach(({ name, label }) => {
      cy.findByRole('checkbox', { name: label }).click()
      cy.location('href').should('contain', `categories=${name}`)
    })
  })

  it('should return empty when no games match', () => {
    cy.visit('/games')
    cy.findByRole('radio', { name: /free/i }).click()
    cy.findByRole('checkbox', { name: 'Sports' }).click()
    cy.location('href').should('contain', `categories=sports`)

    cy.findByTestId('game-card').should('not.exist')
    cy.findByRole('img', { name: /a gamer in a couch playing videogame/i })
    cy.findByRole('heading', { name: ':(' })
  })
})
