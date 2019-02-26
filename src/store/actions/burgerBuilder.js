import axios from "../../axios-orders";
import * as actionTypes from "./actionTypes";

export const addIngredient = ingredient => {
  return { type: actionTypes.ADD_INGREDIENT, ingredient: ingredient };
};

export const removeIngredient = ingredient => {
  return { type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredient };
};

const setIngredients = (ingredients, totalPrice) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
    totalPrice: totalPrice
  };
};

export const initIngredients = () => {
  console.log ('InitIngredients');
  return dispatch => {
    console.log ('called AXIOS');
    axios
      .get("/burger.json")
      .then(response => {
        dispatch(
          setIngredients(response.data["ingredients"], +response.data["price"])
        );
      })
      .catch(error => dispatch(errorFetchIngredients()));
  };
};

export const errorFetchIngredients = () => {
  return {
    type: actionTypes.ERROR_FETCH_INGREDIENTS
  };
};
