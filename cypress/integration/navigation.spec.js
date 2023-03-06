describe("Navigation", () => {
  // Visit the app
  it("should be able to visit the app", () => {
    cy.visit("/");
    cy.contains("Monday");
  });

  // Navigate to another day
  it("should navigate to Tuesday", () => {
    cy.visit("/");
  
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });
});