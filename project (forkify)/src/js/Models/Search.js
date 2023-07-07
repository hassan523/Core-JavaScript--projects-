export default class Search {
  constructor(query) {
    this.query = query;
  }
  async getrecipe() {
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${this.query}`,
      );
      const jsonFile = await res.json();
      this.recipe = jsonFile.recipes;
    } catch (error) {
      alert(`something went wrong`);
      console.log(error);
    }
  }
}
