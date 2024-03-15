describe("Application configuration:", () => {
  describe("On Summary screen", () => {
    beforeEach(() => {
      cy.visitHomePage();
    });
    it("on monthScreen button 'Uzupełnij stan konta' should navigate to manageAccount form", () => {
      cy.get('div[tabindex="0"]').contains("Uzupełnij stan konta").click();
      cy.get('[placeholder="10000"]')
        .parents("div")
        .should("contain", "Podaj kwotę przychodów uzyskanych w tym miesiącu");
    });
    it("yearScreen should contain information message", () => {
      cy.get('[role="tablist"]').contains('[role="tab"]', "Rok").click();
      cy.wait(500);
      cy.get('[style="width: 483px;"]')
        .eq(2)
        .should(
          "contain",
          "Po miesiącu użytkowania aplikacji pojawi się pierwsze podsumowanie roczne."
        );
    });
    it("yearsScreen should contain information message", () => {
      cy.get('[role="tablist"]').contains('[role="tab"]', "Lata").click();
      cy.wait(500);
      cy.get('[style="width: 483px;"]')
        .eq(3)
        .should(
          "contain",
          "Po roku użytkowania aplikacji pojawi się pierwsze podsumowanie z zakresu lat."
        );
    });
  });

  describe("On Expenses screen", () => {
    beforeEach(() => {
      cy.visitExpensesPage();
    });
    it("on weekScreen button 'Uzupełnij stan konta' should navigate to manageAccount form", () => {
      cy.get('div[tabindex="0"]').contains("Uzupełnij stan konta").click();
      cy.get('[placeholder="10000"]')
        .parents("div")
        .should("contain", "Podaj kwotę przychodów uzyskanych w tym miesiącu");
    });
    it("on monthScreen button 'Uzupełnij stan konta' should navigate to manageAccount form", () => {
      cy.get('[role="tablist"]').contains('[role="tab"]', "Miesiąc").click();
      cy.wait(500);
      cy.get('[style="width: 483px;"]')
        .eq(2)
        .then((monthScreen) => {
          cy.wrap(monthScreen)
            .find('div[tabindex="0"] div[dir="auto"]', "Uzupełnij stan konta")
            .click();
        });
      cy.get('div[tabindex="0"]').contains("Uzupełnij stan konta").click();
      cy.get('[placeholder="10000"]')
        .parents("div")
        .should("contain", "Podaj kwotę przychodów uzyskanych w tym miesiącu");
    });
    it("yearScreen should contain information message", () => {
      cy.get('[role="tablist"]').contains('[role="tab"]', "Rok").click();
      cy.wait(500);
      cy.get('[style="width: 483px;"]')
        .eq(3)
        .should(
          "contain",
          "Po miesiącu użytkowania aplikacji pojawi się pierwsze zestawienie roczne Twoich wydatków."
        );
    });
  });

  describe("On Planning screen", () => {
    beforeEach(() => {
      cy.visitPlanningPage();
    });
    it("on expensesScreen button 'Uzupełnij stan konta' should navigate to manageAccount form", () => {
      cy.get('div[tabindex="0"]').contains("Uzupełnij stan konta").click();
      cy.get('[placeholder="10000"]')
        .parents("div")
        .should("contain", "Podaj kwotę przychodów uzyskanych w tym miesiącu");
    });
    it("on finantialTargetsScreen button 'Uzupełnij stan konta' should navigate to manageAccount form", () => {
      cy.get('[role="tablist"]')
        .contains('[role="tab"]', "Cele Finansowe")
        .click();
      cy.wait(500);
      cy.get('[style="width: 483px;"]')
        .eq(2)
        .then((finantialTargetsScreen) => {
          cy.wrap(finantialTargetsScreen)
            .find('div[tabindex="0"] div[dir="auto"]', "Uzupełnij stan konta")
            .click();
        });
      cy.get('div[tabindex="0"]').contains("Uzupełnij stan konta").click();
      cy.get('[placeholder="10000"]')
        .parents("div")
        .should("contain", "Podaj kwotę przychodów uzyskanych w tym miesiącu");
    });
  });

  describe("On Incomes screen", () => {
    beforeEach(() => {
      cy.visitIncomesPage();
    });
    it("on monthScreen button 'Uzupełnij stan konta' should navigate to manageAccount form", () => {
      cy.get('div[tabindex="0"]').contains("Uzupełnij stan konta").click();
      cy.get('[placeholder="10000"]')
        .parents("div")
        .should("contain", "Podaj kwotę przychodów uzyskanych w tym miesiącu");
    });
    it("yearScreen should contain information message", () => {
      cy.get('[role="tablist"]').contains('[role="tab"]', "Rok").click();
      cy.wait(500);
      cy.get('[style="width: 483px;"]')
        .eq(2)
        .should(
          "contain",
          "Po miesiącu użytkowania aplikacji pojawi się pierwsze zestawienie roczne Twoich przychodów."
        );
    });
    it("yearsScreen should contain information message", () => {
      cy.get('[role="tablist"]').contains('[role="tab"]', "Lata").click();
      cy.wait(500);
      cy.get('[style="width: 483px;"]')
        .eq(3)
        .should(
          "contain",
          "Po roku użytkowania aplikacji pojawi się pierwsze zestawienie Twoich przychodów z zakresu lat."
        );
    });
  });

  describe("On manage bankAccount form", () => {
    beforeEach(() => {
      cy.visitPiggyBankPage();
    });
    it("should throw error while account value is less than 1", () => {
      cy.get('[aria-label="stan konta"]').type(0);
      cy.contains("Zatwierdź").click();
      cy.get('[aria-label="stan konta"]')
        .parents("div")
        .should("contain", "Stan konta powinien być większy lub równy 1!");
    });
    it("should throw error while income value is less than 0", () => {
      cy.get('[aria-label="kwota przychodów"]').type(-1);
      cy.contains("Zatwierdź").click();
      cy.get('[aria-label="kwota przychodów"]')
        .parents("div")
        .should("contain", "Kwota przychodów powinna być większa lub równa 0!");
    });
  });

  describe.only("On submitForm while incomes>accountStatus", () => {
    beforeEach(() => {
      cy.visitPiggyBankPage();
      cy.get('[aria-label="stan konta"]').type(2000);
      cy.get('[aria-label="kwota przychodów"]').type(6000);
      cy.contains("Zatwierdź").click();
    });
    it("should add incomes category 'Inne'", () => {
      cy.visitSettingsPage();
      cy.contains("Edytuj kategorie przychodów").click();
      cy.contains("Inne");
    });
    it("should add expenses category 'Inne'", () => {
      cy.visitSettingsPage();
      cy.contains("Edytuj kategorie wydatków").click();
      cy.contains("Inne");
    });
    it("incomes sum should be '6000 PLN'", () => {
      cy.visitIncomesPage();
      cy.contains("SUMA").siblings("div").should("contain", "6 000 PLN");
    });
    it("week expenses sum should be '4001 PLN'", () => {
      cy.visitExpensesPage();
      cy.contains("SUMA").siblings("div").should("contain", "4 001 PLN");
    });
    it.only("month expenses sum should be '4001 PLN'", () => {
      cy.visitExpensesPage();
      cy.get('[role="tablist"]').contains('[role="tab"]', "Miesiąc").click();
      cy.wait(500);
      cy.contains("SUMA").siblings("div").should("contain", "4 001 PLN");
    });
    it("bank account status should be '4001 PLN'", () => {
      cy.visitPiggyBankPage();
      cy.contains("STAN KONTA").siblings("div").should("contain", "2 000 PLN");
    });
  });
});
