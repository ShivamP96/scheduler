describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
  
    cy.contains("[data-testid=day] li", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });
});