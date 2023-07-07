/******************************************** importing *************************************/
import { elements } from "./base";
import { Fraction } from "fractional";

/********************************************* Private Function *****************************/

// For display ingredients on UI
const createIngredient = (ing) =>
  `<li class="recipe__item">
  <svg class="recipe__icon">
      <use href="img/icons.svg#icon-check"></use>
  </svg>
  <div class="recipe__count">${formateCount(ing.count)}</div>
  <div class="recipe__ingredient">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.ingredients}
  </div>
</li>
   `;

// Funtion For formate count
const formateCount = (count) => {
  if (count) {
    const [int, dec] = count
      .toString()
      .split(".")
      .map((el) => parseInt(el));

    if (!dec) return count;
    if (int == 0) {
      const fr = new Fraction(count);
      return `${fr.numerator.toString().slice(0, 1)}/${fr.denominator
        .toString()
        .slice(0, 1)}`;
    } else {
      const fr = new Fraction(count - int);
      return `${int} ${fr.numerator.toString().slice(0, 1)}/${fr.denominator
        .toString()
        .slice(0, 1)}`;
    }
  }
  return count;
};
/******************************************** exporting *************************************/

// For displaying recipe on UI
export const recipeview = (recipe, isLikeds) => {
  const markUp = `
  <div class="popup" id="pop">
        <img src="img/tick2.png" alt="" />
        <h4>ADD TO LIST</h4>
      </div>
    <figure class="recipe__fig">
        <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.Title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.Time
            }</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.serving
            }</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${
                  isLikeds ? " " : "-outlined"
                }" class="header__likes--use"></use>
            </svg>
        </button>
    </div>

    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
        ${recipe.ingredients.map((el) => createIngredient(el)).join("")}
        </ul>

        <button class="btn-small recipe__btn recipe__btn--add">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${
              recipe.Title
            }</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${
          recipe.sourceUrl
        }" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>`;
  elements.recipeDetail.insertAdjacentHTML("afterbegin", markUp);
};
// For popUp
export const popUP = () => {
  const markupTwo = `
        <div class="popup">
          <img src="img/tick2.png" alt="" />
          <h4>ADD TO LIST</h4>
        </div>`;
  elements.recipeDetail.insertAdjacentHTML("afterbegin", markupTwo);
};

// For add popUp
let pop;
export const open_pop = () => {
  pop = document.querySelector(".popup");
  pop.classList.add("open-popup");
};

// For remove popUp
export const close_pop = () => {
  pop.classList.remove("open-popup");
};

// For updating data in recipe area
export const updataRecipeUI = (recipe) => {
  // For servings
  document.querySelector(".recipe__info-data--people").textContent =
    recipe.serving;

  // For Time
  document.querySelector(".recipe__info-data--minutes").textContent =
    recipe.Time;
  if (recipe.Time <= 60) {
    document.querySelector(".recipe__info-text").textContent = "minutes";
  } else if (recipe.Time >= 1440) {
    document.querySelector(".recipe__info-text").textContent = "Days";
    const updateDays = 1440 / 1440;
    document.querySelector(".recipe__info-data--minutes").textContent =
      updateDays;
  } else if (recipe.Time >= 60) {
    // For parseElement in Time
    let parseTime = recipe.Time / 60;

    // Split the decimel
    const [int, dec] = parseTime.toString().split(".");
    const newDec = dec ? dec.slice(0, 1) : "0";

    // Add selector for UI
    // 1) selector
    document.querySelector(
      ".recipe__info-data--minutes"
    ).textContent = `${int}.${newDec}`;

    // 2) selector
    document.querySelector(".recipe__info-text").textContent = "Hours";
  }

  // For ingredients
  const ingArr = Array.from(document.querySelectorAll(".recipe__count"));
  ingArr.forEach((curEl, i) => {
    curEl.textContent = formateCount(recipe.ingredients[i].count);
  });
};

// For clearing recipe data
export const clearRecipeResults = () => {
  elements.recipeDetail.textContent = " ";
};
