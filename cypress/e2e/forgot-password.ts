/// <reference path="../support/index.d.ts" />

describe('Forgot password', () => {
  it('should fill the input and receive a success message', () => {
    cy.intercept('POST', '**/auth/forgot-password', (res) => {
      res.reply({
        status: 200,
        body: { ok: true }
      })

      expect(res.body.email).to.eq('valid@guigames.com')
    })

    cy.visit('/forgot-password')

    cy.findByPlaceholderText(/email/i).type('valid@guigames.com')
    cy.findByRole('button', { name: /send email/i }).click()

    cy.findByText(/you just received an email!/i).should('exist')
  })

  it('should fill the input with an invalid email and receive an error', () => {
    cy.intercept('POST', '**/auth/forgot-password', (res) => {
      res.reply({
        status: 400,
        body: {
          error: 'Bad Request',
          message: [
            {
              messages: [
                {
                  message: 'This email does not exist'
                }
              ]
            }
          ]
        }
      })
    })

    cy.visit('/forgot-password')

    cy.findByPlaceholderText(/email/i).type('invalid@guigames.com')
    cy.findByRole('button', { name: /send email/i }).click()

    cy.findByText(/This email does not exist/i).should('exist')
  })
})
