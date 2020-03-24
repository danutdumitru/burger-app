import { put } from "redux-saga/effects";
import axios from "../../axios-orders";

import {
  orderBurgerSuccess,
  orderBurgerFail,
  orderLoadingSuccess,
  orderLoadingFail,
  orderLoadingStart
} from "../actions/orders";
import { setMessage } from "../actions";

export function* placeOrderBurgerSaga(action) {
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.tokenId,
      action.orderData
    );
    yield put(orderBurgerSuccess(response.data.name, action.orderData));
  } catch (error) {
    const errorMsg = "The order could not be saved...";
    yield put(orderBurgerFail(errorMsg));
    yield put(setMessage(errorMsg));
  }
}

const getOrdersFromResponse = data => {
  const orders = [];
  Object.keys(data).forEach(key => {
    orders.push({
      id: key,
      ...data[key]
    });
  });
  return orders;
};

export function* loadOrdersSaga(action) {
  yield put(orderLoadingStart());
  try {
    const response = yield axios.get(
      "/orders.json?auth=" +
        action.tokenId +
        '&orderBy="userId"&equalTo="' +
        action.userId +
        '"'
    );
    const orders = getOrdersFromResponse(response.data);
    yield put(orderLoadingSuccess(orders));
  } catch (error) {
    console.log(error);
    yield put(orderLoadingFail("The Orders could not be loaded..."));
    yield put(setMessage(error));
  }
}
