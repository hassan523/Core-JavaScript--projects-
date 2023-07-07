/******************************************** import ***************************************/

import { elements } from "./base";
import { recipeTitle } from "./searchView";

/******************************************** export ***************************************/

export const likeViewRender = (like) => {
  const markup = `
    <li>
      <a class="likes__link" href="#${like.id}">
        <figure class="likes__fig">
          <img src="${like.img}" alt="${like.title}">
        </figure>
        <div class="likes__data">
          <h4 class="likes__name">${recipeTitle(like.title)}</h4>
          <p class="likes__author">${like.auther}</p>
        </div>
      </a>
    </li>`;
  elements.recipeLike.insertAdjacentHTML("beforeend", markup);
};

export const deleteLikeRecipe = (id) => {
  const el = document.querySelector(
    `.likes__link[href*="${id}"]`,
  ).parentElement;
  el.parentElement.removeChild(el);
};

export const toggleLike = (condition) => {
  const iconsting = condition ? "icon-heart" : "icon-heart-outlined";
  document
    .querySelector(".header__likes--use")
    .setAttribute("href", `img/icons.svg#${iconsting}`);
};
