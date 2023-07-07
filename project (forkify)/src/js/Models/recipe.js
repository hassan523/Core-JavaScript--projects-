export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  /**************************************** Get recipe from APi *****************************/
  async getrecipeid() {
    try {
      const getID = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      const getIDjson = await getID.json();
      this.Title = getIDjson.recipe.title;
      this.publisher = getIDjson.recipe.publisher;
      this.recipeID = getIDjson.recipe.recipe_id;
      this.ingredients = getIDjson.recipe.ingredients;
      this.img = getIDjson.recipe.image_url;
      this.sourceUrl = getIDjson.recipe.source_url;
    } catch (error) {
      console.log(error);
    }
  }

  /**************************************** Calculate recipe Time ***************************/
  calcRecipeTime = () => {
    this.Time = 30;
  };

  /*********************************** Calculate recipe serving *****************************/
  caclServing = () => {
    this.serving = 4;
  };

  /*********************************** Parse recipe ingredients *****************************/
  parseIngredients = () => {
    let longUnit = [
      "cups",
      "ounce",
      "ounces",
      "ozs",
      "pounds",
      "teaspoons",
      "teaspoon",
      "tablespoon",
      "tablespoons",
      "tbsps",
    ];
    let shortUnit = [
      "cup",
      "oz",
      "oz",
      "oz",
      "pound",
      "tsp",
      "tsp",
      "tbsp",
      "tbsp",
      "tbsp",
    ];

    const ingredientsMap = this.ingredients.map((el) => {
      // For lowercase
      let ingredients = el.toLowerCase();

      // For uniform unit
      longUnit.forEach((curVal, index) => {
        ingredients = ingredients.replace(curVal, shortUnit[index]);
      });
      // For removing parenthese
      ingredients = ingredients.replace(/([()])/g, "");

      // 3) parse ingredients
      const ingSplit = ingredients.split(" ");
      const findindex = ingSplit.findIndex((el2) => shortUnit.includes(el2));

      let obj;
      if (findindex > -1) {
        // There is an unit
        let arrCount = ingSplit.slice(0, findindex);

        //
        let count;
        // console.log(arrCount);
        if (arrCount.length == 1) {
          count = eval(arrCount[0].replace("-", "+"));
        } else if (arrCount.length > 1) {
          count = eval(
            arrCount
              .slice(0, findindex)
              .join("+")
              .replace(/jars|packages|add|cans|package|can|tomato|sauce/g, "0")
          );
        }
        //
        obj = {
          count: count,
          unit: ingSplit[findindex],
          ingredients: ingSplit.slice(findindex + 1).join(" "),
        };
      } else if (parseInt(ingSplit[0])) {
        // First element is number
        obj = {
          count: parseInt(ingSplit[0]),
          unit: "",
          ingredients: ingSplit.slice(1).join(" "),
        };
      } else if (findindex === -1) {
        // There is no unit
        obj = {
          count: 1,
          unit: "",
          ingredients: ingredients,
        };
      }

      ingredients = obj;
      return ingredients;
    });
    this.ingredients = ingredientsMap;
  };

  /*********************************** Calculate serving *****************************/
  servingUpdate = (type) => {
    const newServing = type === "inc" ? this.serving + 1 : this.serving - 1;
    // For ingredients count
    this.ingredients.forEach((ing) => {
      ing.count *= newServing / this.serving;
    });
    this.serving = newServing;
  };
  servingTimeUpdate = (type) => {
    const newTime = type === "inc" ? this.Time + 10 : this.Time - 10;
    return (this.Time = newTime);
  };
}
