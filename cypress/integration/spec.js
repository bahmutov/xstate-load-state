/// <reference types="cypress" />

it.skip('resolves the promise (wrong question)', () => {
  cy.visit('/')
  cy.contains('Loading it...').should('be.visible')
  cy.contains('button', 'Resolve').click()
  cy.contains('Loading it...').should('not.exist')
})

it.skip('resolves the promise (more wrong questions)', () => {
  cy.visit('/')
  cy.contains('Loading it...').should('be.visible')
  cy.contains('button', 'Resolve').click()
  cy.contains('Promise Rejected').should('not.exist')
})

it.skip('resolves the promise after no longer loading', () => {
  cy.visit('/')
  cy.contains('Loading it...').should('be.visible')
  cy.contains('button', 'Resolve').click()
  cy.contains('Loading it...').should('not.exist')
  cy.contains('Promise Rejected').should('not.exist')
})

it('moves away from the pending state', () => {
  cy.visit('/')
  cy.contains('button', 'Resolve').click()
  // observe the state machine
  // Tip: have to use a should(callback)
  // because window.state is replaced when the state changes
  // see https://on.cypress.io/retry-ability
  cy.window().should((win) => {
    expect(win.state.matches('pending')).to.be.false
  })
})

it('resolves the promise', () => {
  cy.visit('/')
  cy.contains('button', 'Resolve').click()
  cy.contains('Promise Resolved').should('be.visible')
})

it('A negative assertion and app delay', () => {
  cy.visit('/')
  cy.contains('Loading it...').should('be.visible')
  cy.contains('button', 'Reject').click()
  cy.contains('Promise Resolved').should('not.exist')
})

it('looks at the status', () => {
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

Cypress.Commands.add('reachedState', (state) => {
  cy.log(`expecting **${state}** state`)
  cy.window({ log: false }).should((win) => {
    if (win.state.matches(state) !== true) {
      throw new Error(`Expected state "${state}", got "${win.state.value}"`)
    }
  })
})

it('Checks the state (data attribute)', () => {
  cy.visit('/')
  cy.get('[data-state="initial"]')
  cy.contains('button', 'Reject').click()
  cy.get('[data-state="loaded"]')
  cy.contains('Promise Resolved').should('not.exist')
})

it.only('Checks the state machine', () => {
  cy.visit('/')
  cy.reachedState('pending')
  cy.contains('button', 'Reject').click()
  // optional: check the intermediate state
  cy.reachedState('loading')
  cy.reachedState('rejected')
  cy.contains('Promise Rejected').should('be.visible')
})
