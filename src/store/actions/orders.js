import * as actionTypes from "./actionTypes";

export const orderBurgerSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.ORDER_BURGER_SUCCESS,
    orderId: orderId,
    orderData: orderData
  };
};

export const orderBurgerFail = error => {
  return {
    type: actionTypes.ORDER_BURGER_FAIL,
    error: error
  };
};

export const orderBurgerStart = () => {
  return {
    type: actionTypes.ORDER_BURGER_START
  };
};

export const tryPlaceOrderBurger = (orderData, tokenId) => {
  return {
    type: actionTypes.ORDER_INITIATE_PLACING,
    orderData: orderData,
    tokenId: tokenId
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

export const orderLoadingFail = error => {
  return {
    type: actionTypes.ORDER_LOADING_FAIL
  };
};

export const tryLoadingOrders = (tokenId, userId) => {
  return {
    type: actionTypes.ORDER_INITIATE_LOAD,
    tokenId: tokenId,
    userId: userId
  };
};
