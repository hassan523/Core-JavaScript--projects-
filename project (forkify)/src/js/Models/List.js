import uniqid from "uniqid";

export default class List {
  constructor() {
    this.itemList = [];
  }

  addItem = (count, unit, ingredient) => {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient,
    };

    this.title = state.recipe.Title;
    this.itemList.push(item);
    return item;
  };

  updateCount = (id, Newcount) => {
    if (this.itemList) {
      this.itemList.find((el) => el.id === id).count = Newcount;
    } else if (this.itemList <= 0) {
      console.log("no item in array");
    }
  };

  deleteItem = (id) => {
    const index = this.itemList.findIndex((el) => el.id === id);
    this.itemList.splice(index, 1);
  };
}
