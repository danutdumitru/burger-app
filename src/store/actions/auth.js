import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: authData.localId,
    email: authData.email,
    token: authData.idToken
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

export const authLogoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const logutOnTokenExpire = expiresIn => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expiresIn
  };
};

export const initiateAuth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_INITIATE_AUTH,
    email: email,
    password: password,
    isSignUp: isSignUp
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const checkAuthState = () => {
  return {
    type: actionTypes.AUTH_INITIATE_AUTOLOGIN
  };
};
