const getStore = () => cy.window().its("app.$store");
const text = "lords";

describe("Store", () => {
  it("has the right properties", () => {
    getStore()
      .its("state")
      .should("have.keys", [
        "loadingMovies",
        "loadingMovie",
        "moviesList",
        "searchString",
        "movieSelected",
        "page"
      ]);
  });
  it("sets serch string", () => {
    cy.visit("/");
    cy.get("input").type(`${text}{enter}`);
    getStore()
      .its("state.searchString")
      .should("equal", text);
  });
});
