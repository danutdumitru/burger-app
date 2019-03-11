import * as actionTypes from "../actions/actionTypes";
import _ from "lodash";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.8,
  cheese: 0.4,
  meat: 1.5
};

const initialState = {
  ingredients: null,
  totalPrice: 0,
  initialPrice: 0,
  error: false,
  building:false
};

const getTotalPrice = state => {
  if (!state.ingredients) {
    return initialState.initialPrice;
  }
  let price = state.initialPrice;
  Object.keys(state.ingredients).forEach(key => {
    price += state.ingredients[key] * INGREDIENT_PRICES[key];
  });
  return price;
};

const burgerReducer = (state = initialState, action) => {
  const newState = _.cloneDeep(state);
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      //  action.ingredient
      newState.ingredients[action.ingredient]++;
      newState.totalPrice = getTotalPrice(state);
      newState.building = true;
      break;
    }
    case actionTypes.REMOVE_INGREDIENT: {
      const qty = newState[action.ingredient];
      if (qty > 0) {
        newState.ingredients[action.ingredient]--;
        newState.totalPrice = getTotalPrice(state);
        newState.building = true;
      }
      break;
    }
    case actionTypes.SET_INGREDIENTS: {
      newState.ingredients = { ...action.ingredients };
      newState.totalPrice = action.totalPrice;
      newState.initialPrice = action.totalPrice;
      newState.error = false;
      newState.building = false;
      break;
    }
    case actionTypes.ERROR_FETCH_INGREDIENTS: {
      newState.error = true;
      break;
    }
    default:
    // do nothing
  }
  return newState;
};

export default burgerReducer;
