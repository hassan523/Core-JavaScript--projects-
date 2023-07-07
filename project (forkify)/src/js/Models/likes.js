export default class Likes {
  constructor() {
    this.likesList = [];
  }

  addLikeList(id, img, auther, title) {
    const itemlikes = {
      id,
      img,
      auther,
      title,
    };
    this.likesList.push(itemlikes);

    // Save data in localStorage
    this.saveData();

    return itemlikes;
  }

  deleteLike(id) {
    const index = this.likesList.findIndex((el) => el.id === id);
    this.likesList.splice(index, 1);

    // Delete data in localStorage
    this.saveData();
  }

  isLiked(id) {
    return this.likesList.findIndex((el) => el.id === id) !== -1;
  }

  getNumLikeList() {
    return this.likesList.length;
  }

  saveData() {
    localStorage.setItem("likesList", JSON.stringify(this.likesList));
  }
  readData() {
    const storage = JSON.parse(localStorage.getItem("likesList"));
    if (storage) this.likesList = storage;
  }
}
