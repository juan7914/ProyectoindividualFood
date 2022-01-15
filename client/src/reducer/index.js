const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case "GET_NAME_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };
    case "FILTER_BY_DIET":
      const allRecipes = state.allRecipes;
      const dietsAPI = [];
      const dietsDB = [];
      allRecipes.forEach((e) => {
        if (e.hasOwnProperty("diets") && e.diets.includes(action.payload)) {
          dietsAPI.push(e);
        }
      });
      allRecipes.forEach((e) => {
        if (
          e.hasOwnProperty("diets") &&
          e.diets.find((c) => c.name === action.payload)
        ) {
          dietsDB.push(e);
        }
      });
      const find = dietsAPI.concat(dietsDB);
      if (find.length) {
        return {
          ...state,
          recipes: find,
        };
      }
      break;

    case "POST_RECIPE":
      return {
        ...state,
      };
    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "created"
          ? state.allRecipes.filter((el) => el.createdInDB)
          : state.allRecipes.filter((el) => !el.createdInDB);
      return {
        ...state,
        recipes: action.payload === "All" ? state.allRecipes : createdFilter,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_RECIPE_TYPE":
      return {
        ...state,
        diets: action.payload,
      };
    case "ORDER_BY_SCORE":
      let sortedArr =
        action.payload === "UP"
          ? state.recipes.sort(function (a, b) {
              if (a.score > b.score) {
                return 1;
              }
              if (b.score > a.score) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.score > b.score) {
                return -1;
              }
              if (b.score > a.score) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sortedArr,
      };
    case "FILTER_BY_ALPHA":
      let alphaArr =
        action.payload === "A-Z"
          ? state.allRecipes.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.allRecipes.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: alphaArr,
      };
    default:
      return state;
  }
}
export default rootReducer;
