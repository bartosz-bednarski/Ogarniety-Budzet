describe("check", () => {
  it("uno", () => {
    cy.visitHomePage();
    cy.visitExpensesPage();
    cy.visitPlanningPage();
    cy.visitIncomesPage();
    cy.visitPiggyBankPage();
    cy.get("#root").type("{esc}");
  });
});
