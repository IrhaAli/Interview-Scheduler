describe("Navigation", () => {
  it("should be able to visit the app", () => {
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
  
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });
});