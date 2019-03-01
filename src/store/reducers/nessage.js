import * as actionTypes from "../actions/actionTypes";

const initialState = {
  message: null
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MESSAGE:
      return {
        message: action.message
      };
    case actionTypes.CLEAR_MESSAGE:
      return {
        message: null
      };
    default:
      return state;
  }
};

export default messageReducer;
