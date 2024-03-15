/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("visitHomePage", () => {
  cy.visit("http://localhost:19006");
  cy.get('div[role="tablist"]').contains("Podsumowanie").click();
});
Cypress.Commands.add("visitExpensesPage", () => {
  cy.visit("http://localhost:19006");
  cy.get('div[role="tablist"]').contains("Wydatki").click();
});
Cypress.Commands.add("visitPlanningPage", () => {
  cy.visit("http://localhost:19006");
  cy.get('div[role="tablist"]').contains("Planowanie").click();
});
Cypress.Commands.add("visitIncomesPage", () => {
  cy.visit("http://localhost:19006");
  cy.get('div[role="tablist"]').contains("Przychody").click();
});
Cypress.Commands.add("visitPiggyBankPage", () => {
  cy.visit("http://localhost:19006");
  cy.get('div[role="tablist"]').contains("Rachunki").click();
});
Cypress.Commands.add("visitSettingsPage", () => {
  cy.visit("http://localhost:19006");
  cy.get(
    '[style="font-size: 30px; color: rgb(212, 175, 55); margin-right: 10px; font-family: ionicons; font-weight: normal; font-style: normal;"]'
  ).click();
});
