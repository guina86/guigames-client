/// <reference types="cypress" />

type ShowcaseAttributes = {
  name: string
  highlight?: boolean
}

type FieldAttributes = {
  label: string
  name: string | number
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to get element by data-testid
     * @example cy.getByTestId('selector')
     */
    getByTestId(selector: string): Chainable<Element>

    /**
     * Custom command to check banner in page
     * @example cy.shouldRenderBanner()
     */
    shouldRenderBanner(): Chainable<Element>

    /**
     * Custom command to check showcase in page
     * @example cy.shouldRenderShowcase({ name: 'Showcase', highlight: true })
     */
    shouldRenderShowcase(attrs: ShowcaseAttributes): Chainable<Element>

    /**
     * Custom command to check fields in page
     * @example cy.shouldRenderFields([{ label: 'foo', name: 'foo' }])
     */
    shouldRenderFields(fields: FieldAttributes[]): Chainable<Element>

    /**
     * Custom command to check if price is greater than value
     * @example cy.priceGreaterThan(50)
     */
    priceGreaterThan(value: number): Chainable<Element>

    /**
     * Custom command to check if price is less than value
     * @example cy.priceLessThan(100)
     */
    priceLessThan(value: number): Chainable<Element>
  }
}
