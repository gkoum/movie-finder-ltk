describe("Search", () => {
  const text = "lords";
  it("when clicking find gets to results", () => {
    cy.visit("/");
    cy.get('input').type(`${text}{enter}`);
    // cy.get('button').click({ force: true });

    cy.contains("h2", "Search For Movies");
  });

  it("selecting results gets to results", () => {
    cy.visit("/results");
    cy.get("#nav")
      .find("ul")
      .find("li")
      .first()
      .click({ force: true });

    cy.contains("h2", "Search For Movies");
  });

  it("Visits the app root url", () => {
    cy.visit("/results");
    cy.get("#nav")
      .find("ul>li")
      .eq(1)
      .click({ force: true });

    cy.contains("div", "Results");
  });
});