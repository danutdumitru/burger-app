import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as keys from "../../private/keys";

const AUTH_SIGNUP_URL =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
  keys.GOOGLE_API_KEY;
const AUTH_SIGNIN_URL =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
  keys.GOOGLE_API_KEY;

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

function saveAuthDataToLocalStorage(authData) {
  localStorage.setItem("token", authData.idToken);
  localStorage.setItem("userId", authData.localId);
  localStorage.setItem("email", authData.email);
  const expirationDate = new Date(
    new Date().getTime() + authData.expiresIn * 1000
  );
  localStorage.setItem("expirationDate", expirationDate);
}

function cleanAuthDataFromLocalStorage() {
  localStorage.clear();
}

export const authSuccess = authData => {
  return dispatch => {
    saveAuthDataToLocalStorage(authData);
    dispatch({
      type: actionTypes.AUTH_SUCCESS,
      userId: authData.localId,
      email: authData.email,
      token: authData.idToken
    });
  };
};

export const authLogout = () => {
  cleanAuthDataFromLocalStorage();
  return {
    type: actionTypes.AUTH_LOGOUT
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
    }, expiresIn);
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

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    const newExpirationTime = expirationDate.getTime() - new Date().getTime();
    if (newExpirationTime > 0) {
      const email = localStorage.getItem("email");
      const userId = localStorage.getItem("userId");
      dispatch(
        authSuccess({
          idToken: token,
          email: email,
          localId: userId,
          expiresIn: newExpirationTime
        })
      );
      dispatch(logutOnTokenExpire(newExpirationTime));
    } else {
      dispatch (authLogout());
    }
  };
};
