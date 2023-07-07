/***************************************** imports ****************************************/
// Moduels
import Search from "./Models/Search";
import Recipe from "./Models/recipe";
import List from "./Models/List";
import Likes from "./Models/likes";

// Displays
import { elements, loading, clearLoader } from "./Display/base";
import * as searchViews from "./Display/searchView";
import * as recipeView from "./Display/recipeView";
import * as listView from "./Display/ListView";
import * as likeView from "./Display/likesView";

/***************************************** State ******************************************/

const state = [];
window.r = state;
/***************************************** Control Search *********************************/
let search, like, list, recipe;
const controlSearch = async () => {
  // 0) Get query from input
  const query = searchViews.getInput();

  if (query) {
    // 1) Add to state
    state.search = new Search(query);

    // 2) assign a variable
    search = state.search;
    try {
      // 3) Prepare results in UI
      searchViews.clearSearchResults();
      searchViews.clearField();
      loading(elements.recipeList);

      // 4)  Get results from API
      await search.getrecipe();

      // 5) Display results on UI
      clearLoader();
      searchViews.renderResults(search.recipe);
    } catch (error) {
      alert("No Recipe Found");
      console.log(error);
    }
  }
};

/***************************************** Control Recipe *********************************/

const controlRecipe = async () => {
  // 0) Get ID from Search recipe
  const id = window.location.hash.replace("#", "");

  if (id) {
    // 1) Add to state
    state.recipe = new Recipe(id);

    // 2) assign a variable
    recipe = state.recipe;

    // 3) For highlighted results
    if (search) {
      searchViews.highLighted(id);
    }
    try {
      // 4) Prepare results in UI
      recipeView.clearRecipeResults();
      loading(elements.recipeDetail);

      // 5) Get result from recipe
      await recipe.getrecipeid();

      // 6) prepare result for UI
      recipe.parseIngredients();

      // 8) Calculate Time and Serving
      recipe.caclServing();
      recipe.calcRecipeTime();

      // 9) Display recipe on UI
      clearLoader();
      recipeView.recipeview(recipe, state.like.isLiked(id));
    } catch (error) {
      clearLoader();
      alert("Something Went Wrong :(");
      console.log(error);
    }
  }
};

/***************************************** Control List ************************************/

let id;

const controlList = () => {
  // 0) add list to state
  state.List = new List();

  // 1) assign a variable
  list = state.List;

  // 2) add each items to the list
  recipe.ingredients.forEach((el) => {
    const item = list.addItem(el.count, el.unit, el.ingredients);
    listView.renderShopItem(item);
  });
};

// 4) delete item from shopping list
elements.shoppingList.addEventListener("click", (e) => {
  id = e.target.closest("#shopping__item").dataset.itemid;

  // for handle delete button
  if (e.target.matches(".shopping__delete, .shopping__delete *")) {
    // Delete from backend
    list.deleteItem(id);

    // Delete from UI
    listView.deleteShopItem(id);
  }
});

// 3) update count
elements.shoppingList.addEventListener("click", (e) => {
  if (e.target.matches(".shopping__item--input")) {
    const val = parseFloat(e.target.value);
    list.updateCount(id, val);
  }
});

/***************************************** Control Like ************************************/

const controlLike = () => {
  // 0) add to state
  if (!state.like) state.like = new Likes();

  // 1) assign a variable
  like = state.like;

  // 3) id for like and delete
  const currentID = recipe.id;

  // 4) For Liked or not liked function
  if (!like.isLiked(currentID)) {
    // Add item to like
    const newLike = like.addLikeList(
      currentID,
      recipe.img,
      recipe.publisher,
      recipe.Title,
    );

    // Add from UI
    likeView.likeViewRender(newLike);

    // Toggle btn
    likeView.toggleLike(true);

    recipeView.open_pop();

    setTimeout(() => {
      recipeView.close_pop();
    }, 1200);
    //
  } else {
    // Remove item to like
    like.deleteLike(currentID);

    // Remove from UI
    likeView.deleteLikeRecipe(currentID);

    // Toggle btn
    likeView.toggleLike(false);
  }
};

/***************************************** AddEventListners *******************************/

const init = () => {
  // Event for search BTN
  elements.search.addEventListener("submit", (e) => {
    e.preventDefault();
    controlSearch();
  });

  // Event for pagination BTN
  elements.nextPages.addEventListener("click", (e) => {
    const closestEl = e.target.closest("#pageBTN");
    if (closestEl) {
      const gotoPage = parseInt(closestEl.dataset.goto);
      searchViews.clearSearchResults();
      searchViews.renderResults(state.search.recipe, gotoPage);
    }
  });

  // Event for hashchange and load
  ["hashchange", "load"].forEach((event) =>
    window.addEventListener(event, controlRecipe),
  );

  // Event for load
  window.addEventListener("load", () => {
    state.like = new Likes();

    // restore likes
    state.like.readData();

    // render likes in UI
    state.like.likesList.forEach((el) => {
      likeView.likeViewRender(el);
    });
  });

  // Event for 'inc' and 'dec' BTN
  elements.recipeDetail.addEventListener("click", (e) => {
    if (e.target.matches(".btn-increase, .btn-increase *")) {
      // for servingUpdate
      recipe.servingUpdate("inc");
      // For timeUpdate
      recipe.servingTimeUpdate("inc");
      // For renderUpdate
      recipeView.updataRecipeUI(recipe);
    } else if (e.target.matches(".btn-decrease, .btn-decrease *")) {
      if (recipe.serving > 1) {
        // for servingUpdate
        recipe.servingUpdate("dec");
        // For timeUpdate
        recipe.servingTimeUpdate("dec");
        // For renderUpdate
        recipeView.updataRecipeUI(recipe);
      }
    }
  });

  // Event for ShoppingList BTN
  elements.recipeDetail.addEventListener("click", (e) => {
    if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
      listView.clearShopItem();
      controlList();
      listView.renderShopItemName(list);
    }
  });

  // For like button
  elements.recipeDetail.addEventListener("click", (e) => {
    if (e.target.matches(".recipe__love,.recipe__love *")) {
      controlLike();
      // elements.popUp.classList.add(".open-popup");
    }
  });
};

init();
