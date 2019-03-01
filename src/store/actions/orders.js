import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const orderBurgerSuccess = (orderId, orderData) => {
  return dispatch => {
    dispatch({
      type: actionTypes.ORDER_BURGER_SUCCESS,
      orderId: orderId,
      orderData: orderData
    });
  };
};

export const orderBurgerFail = error => {
  return dispatch => {
    dispatch({
      type: actionTypes.ORDER_BURGER_FAIL,
      error: error
    });
    dispatch({
      type: actionTypes.SET_MESSAGE,
      message: error
    });
  };
};

export const orderBurgerStart = () => {
  console.log("ORDER BUGER START action creator");
  return {
    type: actionTypes.ORDER_BURGER_START
  };
};

export const tryPlaceOrderBurger = orderData => {
  console.log("[tryPlaceOrderBurger] start");
  return dispatch => {
    axios
      .post("/orders.json", orderData)
      .then(response => {
        dispatch(orderBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        console.log('ERROR ', error);
        dispatch(orderBurgerFail("The order could not be saved..."));
      });
  };
};

export const orderPurchasingInit = () => {
  return {
    type: actionTypes.ORDER_PURCHASING_INIT
  }
}