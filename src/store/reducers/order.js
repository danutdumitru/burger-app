import _ from "lodash";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  startedRequest: false,
  postedSuccess: false,
  orderId: null,
  orders: []
};

const orderReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case actionTypes.ORDER_PURCHASING_INIT:
      return {
        ...state,
        postedSuccess: false
      }
    case actionTypes.ORDER_BURGER_START:
      // newState = _.cloneDeep(state);
      // newState.startedRequest = true;
      // newState.orderId = null;
      // newState.postedSuccess = false;
      return {
        ...state,
        orderId: null,
        postedSuccess: false
      }
      ;
    case actionTypes.ORDER_BURGER_SUCCESS:
      newState = _.cloneDeep(state);
      newState.orders.push(action.orderData);
      newState.startedRequest = false;
      newState.orderId = action.orderId;
      newState.postedSuccess = true;
      return newState;
    case actionTypes.ORDER_BURGER_FAIL:
      return {
        ...state,
        startedRequest: false,
        orderId: null,
        postedSuccess: false
      };
    default:
      return state;
  }
};

export default orderReducer;
