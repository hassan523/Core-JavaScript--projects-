export const elements = {
  search: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchBTN: document.querySelector(".search__btn"),
  searchULlist: document.querySelector(".results__list"),
  recipeList: document.querySelector(".results"),
  nextPages: document.querySelector(".next_pages"),
  recipeDetail: document.querySelector(".recipe"),
  shoppingList: document.querySelector(".shopping__list"),
  shopHeading: document.querySelector(".shopitemheading"),
  recipeLike: document.querySelector(".likes__list"),
  popUp: document.querySelector(".popup"),
};

export const elementString = {
  loader: "loader",
};

export const loading = (parent) => {
  const loader = `
    <div class ="${elementString.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>`;
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const clear = document.querySelector(`.${elementString.loader}`);
  if (clear) clear.parentElement.removeChild(clear);
};
