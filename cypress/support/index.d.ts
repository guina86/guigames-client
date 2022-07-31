/// <reference types="cypress" />

type ShowcaseAttributes = {
  name: string
  highlight?: boolean
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to check banner in page
     * @example cy.shouldRenderBanner()
     */
    shouldRenderBanner(): Chainable<Window>

    /**
     * Custom command to check showcase in page
     * @example cy.shouldRenderBanner()
     */
    shouldRenderShowcase(attrs: ShowcaseAttributes): Chainable<Window>
  }
}
