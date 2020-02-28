// Cypress test for appointments
describe("Appointments", () => {
  beforeEach(() => {
   cy.request("GET", "/api/debug/reset");
 
   // go to homepage
   cy.visit("/");
    
   // check that the page contains monday
   cy.contains("Monday");
  });
 
  it("should book an interview", () => {
    // click the first add button
   cy.get("[alt=Add]")
    .first()
    .click();
    
    // find the box with that testid and input the name lydia
   cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
   cy.get('[alt="Sylvia Palmer"]').click();
 
    // check if it contains save and then click the save button
   cy.contains("Save").click();
 
   // check to see if the appointment card shows up with the values we want
   cy.contains(".appointment__card--show", "Lydia Miller-Jones");
   cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // click the first edit button, on a card 
    cy.get("[alt=Edit]")
    .first()
    .click({ force: true });

    // clear the input of whatever it was before and put in lydia
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    
    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });
  
    cy.contains("Confirm").click();
  
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
 });