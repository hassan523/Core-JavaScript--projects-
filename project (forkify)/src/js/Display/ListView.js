/****************************************** importing modules ******************************/
import { elements } from "./base";

/****************************************** exporting modules ******************************/
export const renderShopItem = (item) => {
  const markup = `
      <li class="shopping__item" id="shopping__item" data-itemid="${item.id}">
        <div class="shopping__count">
          <input type="number" value="${item.count}" step="${item.count}"  class="shopping__item--input">
          <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
          <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
          </svg>
        </button>
      </li>`;
  elements.shoppingList.insertAdjacentHTML("beforeend", markup);
};

export const renderShopItemName = (item) => {
  const markupTwo = `
  <h4 class="Shoplist-Name">${item.title}</h4>
  `;
  elements.shopHeading.insertAdjacentHTML("afterbegin", markupTwo);
};

export const deleteShopItem = (id) => {
  const item = document.querySelector(`[data-itemId="${id}"]`);
  item.parentElement.removeChild(item);
};

export const clearShopItem = () => {
  elements.shoppingList.textContent = " ";
  elements.shopHeading.textContent = " ";
};
