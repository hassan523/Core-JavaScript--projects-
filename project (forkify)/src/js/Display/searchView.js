/****************************************** imports *************************************/
import { elements } from "./base";

/************************************** private functions ***********************************/
// render recipe
const renderRecipe = (recipes) => {
  let markup = `<li>
  <a class="results__link" href="#${recipes.recipe_id}">
      <figure class="results__fig">
          <img src="${recipes.image_url}" alt="${recipes.title}">
      </figure>
      <div class="results__data">
          <h4 class="results__name">${recipeTitle(recipes.title)}</h4>
          <p class="results__author">${recipes.publisher}</p>
      </div>
  </a>
</li>`;
  elements.searchULlist.insertAdjacentHTML("beforeend", markup);
};

// For displaying recipe short titles
export const recipeTitle = (title, limit = 17) => {
  let newTitle = [];
  if (title.length > limit) {
    const split = title.split(" ");
    split.reduce((total, cur) => {
      if (total + cur.length <= limit) {
        newTitle.push(cur);
      }
      return total + cur.length;
    }, 0);
    return `${newTitle.join(" ")} ...`;
  } else {
    return title;
  }
};

// For displying paginations button and numbers

const displayPageBtn = (page, type) =>
  `<button class="${type}" id="pageBTN" data-goto=${
    type === "previous" ? page - 1 : page + 1
  }>
<svg>
  <use href="img/icons.svg#icon-triangle-${
    type === "previous" ? "left" : "right"
  }"></use>
</svg>
<span>PAGE ${type === "previous" ? page - 1 : page + 1}</span>
</button>
<div class="current_pageNum">
<span>${page}</span>
</div>`;

// Function for pagination button
const paginationBtn = (page, totalResults, resultsPerPage) => {
  const pages = Math.ceil(totalResults / resultsPerPage);

  let button;
  if (page === 1) {
    // Only button to go to next page
    button = displayPageBtn(page, "next");
  } else if (page < pages) {
    // For both button
    button = `
    ${displayPageBtn(page, "previous")}
    ${displayPageBtn(page, "next")}
    `;
  } else if (page === pages) {
    // only button to go to previous page
    button = displayPageBtn(page, "previous");
  }

  elements.nextPages.insertAdjacentHTML("afterbegin", button);
};

/******************************************** exports ***************************************/
// For rendring results
export const renderResults = (recipe = [], page = 1, resultsPerPage = 10) => {
  // For Displaying limited recipes
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;

  // For recipes
  recipe.slice(start, end).map(renderRecipe);

  // For paginations buttons
  paginationBtn(page, recipe.length, resultsPerPage);
};

// For clearing inputField
export const clearField = () => (elements.searchInput.value = "");

// For clear results
export const clearSearchResults = () => {
  elements.searchULlist.textContent = " ";
  elements.nextPages.textContent = " ";
};

// For getting input from field
export const getInput = () => elements.searchInput.value;

// For highlighted results
export const highLighted = (id) => {
  // removing classlist
  const arrsearch = Array.from(document.querySelectorAll(".results__link"));
  arrsearch.forEach((el) => {
    el.classList.remove("results__link--active");
  });

  document
    .querySelector(`.results__link[href="#${id}"]`)
    .classList.add("results__link--active");
};
