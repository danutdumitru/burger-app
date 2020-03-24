import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as actions from "../actions";

const orderIngredients = ingredients => {
  const arr = [];
  const result = {};
  Object.keys(ingredients).forEach(key =>
    arr.push({ key: key, order: ingredients[key].order })
  );
  arr
    .sort((a, b) => a.order - b.order)
    .forEach(elem => (result[elem.key] = ingredients[elem.key]["quantity"]));
  return result;
};

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get("/burger.json");
    const ingredients = orderIngredients(response.data["ingredients"]);
    yield put(actions.setIngredients(ingredients, +response.data["price"]));
  } catch (error) {
    yield put(actions.errorFetchIngredients());
  }
}
