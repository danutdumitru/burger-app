import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
import {} from 'react-redux';

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

export const tryPlaceOrderBurger = (orderData, tokenId) => {
  console.log("[tryPlaceOrderBurger] start");
  return dispatch => {
    axios
      .post("/orders.json?auth=" + tokenId, orderData)
      .then(response => {
        dispatch(orderBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        console.log("ERROR ", error);
        dispatch(orderBurgerFail("The order could not be saved..."));
      });
  };
};

export const orderPurchasingInit = () => {
  return {
    type: actionTypes.ORDER_PURCHASING_INIT
  };
};

export const orderLoadingStart = () => {
  return {
    type: actionTypes.ORDER_LOADING_START
  };
};

export const orderLoadingSuccess = orders => {
  return {
    type: actionTypes.ORDER_LOADING_SUCCESS,
    orders: orders
  };
};

export const orderLoadingFail = (error) => {
  return dispatch => {
    dispatch ( {
      type: actionTypes.ORDER_LOADING_FAIL
    });
    dispatch ( {
      type: actionTypes.SET_MESSAGE,
      message: error
    })
  }
}

export const tryLoadingOrders = (tokenId) => {
  return dispatch => {
    dispatch( orderLoadingStart());
    axios
      .get("/orders.json?auth=" + tokenId)
      .then(response => {
        const orders = [];
        Object.keys(response.data).forEach(key => {
          orders.push({
            id: key,
            ...response.data[key]
          });
        });
        dispatch( orderLoadingSuccess(orders));
      })
      .catch(error => {
        console.log(error);
        dispatch (orderLoadingFail("The Orders could not be loaded..."));
      });
  };
};
