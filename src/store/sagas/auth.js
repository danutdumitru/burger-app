import { put, delay } from "redux-saga/effects";
import * as actions from "../actions";
import axios from "axios";

import * as keys from "../../private/keys";

const AUTH_SIGNUP_URL =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
  keys.GOOGLE_API_KEY;
const AUTH_SIGNIN_URL =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
  keys.GOOGLE_API_KEY;

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

export function* logoutSaga(action) {
  yield cleanAuthDataFromLocalStorage();
  yield put(actions.authLogoutSuccess());
}

export function* checkTimeoutSaga(action) {
  yield delay(action.expirationTime);
  yield put(actions.authLogout());
}

export function* authSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  const url = action.isSignUp ? AUTH_SIGNUP_URL : AUTH_SIGNIN_URL;
  try {
    const response = yield axios.post(url, authData);
    console.log(response.data);
    saveAuthDataToLocalStorage(authData);
    yield put(actions.authSuccess(response.data));
    yield put(actions.logutOnTokenExpire(response.data.expiresIn * 1000));
  } catch (error) {
    console.log(error);
    const errorMessage = error.response.data.error.message;
    yield put(actions.authFail(errorMessage));
    yield put(actions.setMessage(errorMessage));
  }
}

export function* autoLoginSaga(action) {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  const expirationDate = new Date(localStorage.getItem("expirationDate"));
  const newExpirationTime = expirationDate.getTime() - new Date().getTime();
  if (newExpirationTime > 0) {
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");
    yield put(
      actions.authSuccess({
        idToken: token,
        email: email,
        localId: userId,
        expiresIn: newExpirationTime
      })
    );
    yield put(actions.logutOnTokenExpire(newExpirationTime));
  } else {
    yield put(actions.authLogout());
  }
}
