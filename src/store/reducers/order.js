import * as actionTypes from "../actions/actionTypes";

const initialState = {
  startedRequest: false,
  postedSuccess: false,
  orderId: null,
  orders: []
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_PURCHASING_INIT:
      return {
        ...state,
        postedSuccess: false
      }
    case actionTypes.ORDER_BURGER_START:
      return {
        ...state,
        orderId: null,
        postedSuccess: false
      }
      ;
    case actionTypes.ORDER_BURGER_SUCCESS:
      return {
        ...state,
        startedRequest: false,
        orderId: action.orderId,
        postedSuccess: true
      };
    case actionTypes.ORDER_BURGER_FAIL:
      return {
        ...state,
        startedRequest: false,
        orderId: null,
        postedSuccess: false
      };
    case actionTypes.ORDER_LOADING_START: 
      return {
        ...state,
        startedRequest: true,
        orderId: null,
        orders: []
      }; 
    case actionTypes.ORDER_LOADING_SUCCESS: 
      return {
        ...state,
        startedRequest: false,
        orders: action.orders.concat()
      };
    case actionTypes.ORDER_LOADING_FAIL: 
      return {
        ...state,
        startedRequest: false
      }
    default:
      return state;
  }
};

export default orderReducer;
