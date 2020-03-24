import * as actionTypes from "./actionTypes";

export const addIngredient = ingredient => {
  return { type: actionTypes.ADD_INGREDIENT, ingredient: ingredient };
};

export const removeIngredient = ingredient => {
  return { type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredient };
};

export const setIngredients = (ingredients, totalPrice) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
    totalPrice: totalPrice
  };
};

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS
  };
};

export const errorFetchIngredients = () => {
  return {
    type: actionTypes.ERROR_FETCH_INGREDIENTS
  };
};
