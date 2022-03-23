/// <reference types="cypress" />

it('resolves the promise', () => {
  cy.visit('/')
  cy.contains('button', 'Resolve').click()
  cy.contains('Promise Resolved').should('be.visible')
})

it.only('looks at the status', () => {
  cy.visit('/')
  cy.get('button').should('have.length', 2).eq(Cypress._.random(0, 1)).click()

  // observe the page
  // cy.contains('Loading it...').should('not.exist')
  // observe the state machine
  // Tip: have to use a should(callback)
  // because window.state is replaced when the state changes
  // see https://on.cypress.io/retry-ability
  // cy.window().should((win) => {
  //   expect(win.state.matches('pending')).to.be.false
  // })
  // observe the page to know it has rendered the final state
  // tip: you can also check the settled object's text
  cy.get('.settled')

  cy.contains('Promise Rejected')
    .should(Cypress._.noop)
    .then(($el) => {
      if ($el.length) {
        cy.contains('Promise Rejected').should('be.visible')
      } else {
        cy.contains('Promise Resolved').should('be.visible')
      }
    })
})
