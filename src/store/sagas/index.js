import * as actionTypes from "../actions/actionTypes";

import { takeEvery } from "redux-saga/effects";
import { logoutSaga, checkTimeoutSaga, authSaga, autoLoginSaga } from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { placeOrderBurgerSaga, loadOrdersSaga } from "./orders";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_AUTH, authSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_AUTOLOGIN, autoLoginSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrderSaga() {
  yield takeEvery(actionTypes.ORDER_INITIATE_PLACING, placeOrderBurgerSaga);
  yield takeEvery(actionTypes.ORDER_INITIATE_LOAD, loadOrdersSaga);
}
