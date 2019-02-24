import * as actionTypes from "../actions";
import _ from "lodash";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.8,
  cheese: 0.4,
  meat: 1.5
};

const initialState = {
  ingredients: {},
  totalPrice: 0,
  initialPrice: 0
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
      break;
    }
    case actionTypes.REMOVE_INGREDIENT: {
      const qty = newState[action.ingredient];
      if (qty > 0) {
        newState.ingredients[action.ingredient]--;
        newState.totalPrice = getTotalPrice(state);
      }
      break;
    }
    case actionTypes.INIT_BURGER: {
      newState.ingredients = { ...action.ingredients };
      newState.totalPrice = action.totalPrice;
      newState.initialPrice = action.totalPrice;
      break;
    }
    default:
    // do nothing
  }
  return newState;
};

export default burgerReducer;
