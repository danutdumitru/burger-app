import * as actionTypes from "./actionTypes";
import axios from "axios";

const AUTH_SIGNUP_URL =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCbefOq-HdgCbjH4kD0dOw58NAoSCX30lY";
const AUTH_SIGNIN_URL =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCbefOq-HdgCbjH4kD0dOw58NAoSCX30lY";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return dispatch => {
    dispatch({
      type: actionTypes.AUTH_SUCCESS,
      email: authData.email,
      token: authData.idToken
    });
  };
};

export const authFail = error => {
  return dispatch => {
    dispatch({
      type: actionTypes.AUTH_FAIL,
      error: error
    });
    dispatch({
      type: actionTypes.SET_MESSAGE,
      message: error
    });
  };
};

export const logutOnTokenExpire = expiresIn => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: actionTypes.AUTH_LOGOUT
      });
    }, expiresIn );
  };
};

export const tryAuth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    const url = isSignUp ? AUTH_SIGNUP_URL : AUTH_SIGNIN_URL;
    axios
      .post(url, authData)
      .then(response => {
        console.log(response.data);
        dispatch(authSuccess(response.data));
        dispatch(logutOnTokenExpire(response.data.expiresIn * 1000));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error.response.data.error.message));
      });
  };
};
