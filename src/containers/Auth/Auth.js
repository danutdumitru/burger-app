import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as formUtils from "../../utils/forms";
import Button from "../../components/UI/Button/Button";
import styles from "./Auth.module.css";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

class Auth extends Component {
  state = {
    authForm: {
      email: formUtils.getInputElement(
        "email",
        "Your email",
        true,
        null,
        null,
        EMAIL_REGEX
      ),
      password: formUtils.getInputElement("password", "Password", true, 7)
    },
    isFormValid: false,
    isSignUp: true
  };

  inputChangedHandler = (event, inputId) => {
    const isValid = formUtils.checkInputValidity(
      event.target.value,
      this.state.authForm[inputId].validation
    );
    const updatedForm = {
      ...this.state.authForm,
      [inputId]: {
        ...this.state.authForm[inputId],
        value: event.target.value,
        isValid: isValid,
        isTouched: true
      }
    };
    this.setState({
      authForm: updatedForm,
      isFormValid: formUtils.checkFormValidity(updatedForm)
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.registerUserHandler(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignUp
    );
  };

  onSwitchSignupHandler = event => {
    event.preventDefault();
    this.setState(prevState => {
      return {
        ...prevState,
        isSignUp: !prevState.isSignUp
      };
    });
  };

  render() {
    let result = this.props.loading ? (
      <Spinner />
    ) : this.props.tokenId && this.props.burgerBuilding ? (
      <Redirect to="/checkout" />
    ) : this.props.tokenId ? (
      <Redirect to="/" />
    ) : (
      <>
        <h3>{this.state.isSignUp ? "SIGN UP" : "SIGN IN"}</h3>
        <form onSubmit={this.onSubmitHandler}>
          {formUtils.getFormElements(
            this.state.authForm,
            this.inputChangedHandler
          )}
          <Button buttonStyle="Success">SUBMIT</Button>
          <Button buttonStyle="Danger" onClick={this.onSwitchSignupHandler}>
            Switch to {this.state.isSignUp ? "LOGIN" : "SIGN UP"}
          </Button>
        </form>
      </>
    );

    return <div className={styles.Auth}>{result}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    tokenId: state.auth.token,
    burgerBuilding: state.burger.building
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerUserHandler: (email, password, isSignUp) =>
      dispatch(actions.initiateAuth(email, password, isSignUp))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
