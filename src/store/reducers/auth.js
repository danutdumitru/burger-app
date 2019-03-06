import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

function authStart(state, action) {
  return {
    loading: true,
    userId: null,
    token: null,
    error: null
  };
}

function authFail(state, action) {
  return {
    loading: false,
    error: action.error,
    userId: null,
    token: null
  };
}

function authSuccess(state, action) {
  return {
    loading: false,
    userId: action.email,
    token: action.token,
    error: null
  };
}

function authLogout (state, action) {
  return {
    ...state,
    userId: null,
    token: null
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};


export default authReducer;