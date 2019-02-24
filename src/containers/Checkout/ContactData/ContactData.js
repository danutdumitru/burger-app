import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import _ from "lodash";

import styles from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from 'react-redux';

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: this.getInputElement("text", "Your name", true, 3),
        email: this.getInputElement("email", "Your email", true),
        street: this.getInputElement("text", "Your Street", true),
        postalCode: this.getInputElement("text", "ZIP Code", true, 5),
        country: this.getInputElement("text", "Your Country", true),
        deliveryMethod: {
          elementType: "select",
          elementConfig: {
            options: [
              { value: "fastest", displayedValue: "Fastest" },
              { value: "cheapest", displayedValue: "Cheapest" }
            ]
          },
          isValid: true,
          value: "fastest"
        }
      },
      isFormValid: false,
      loading: false,
      posted: false
    };
  }

  getInputElement(type, placeholder, isRequired, minLength, maxLength) {
    return {
      elementType: "input",
      elementConfig: {
        type: type,
        placeholder: placeholder
      },
      value: "",
      isValid: false,
      validation: {
        required: isRequired,
        minLength: minLength ? minLength : 0,
        maxLength: maxLength ? maxLength : 99999999
      },
      isTouched: false
    };
  }

  checkInputValidity(value, rules) {
    if (rules) {
      return (
        (!rules.required || value.trim() !== "") &&
        value.trim().length >= rules.minLength &&
        value.trim().length <= rules.maxLength
      );
    } else {
      return true;
    }
  }

  checkFormValidity = (orderForm) => {
    let valid = true;
    Object.keys(orderForm).forEach ( key => {
      valid = valid && orderForm[key].isValid;
    });
    return valid;
  }

  inputChangedHandler = (event, inputId) => {
    console.log ('input handler');
    const updatedOrderForm = _.cloneDeep(this.state.orderForm);
    const isValid = this.checkInputValidity(
      event.target.value,
      updatedOrderForm[inputId].validation
    );
    updatedOrderForm[inputId].value = event.target.value;
    updatedOrderForm[inputId].isValid = isValid;
    updatedOrderForm[inputId].isTouched = true;
    const isFormValid = this.checkFormValidity(updatedOrderForm); 
    this.setState({
      orderForm: updatedOrderForm,
      isFormValid : isFormValid
    });
  };

  getFormElements = () => {
    const formElements = [];
    Object.keys(this.state.orderForm).forEach(key => {
      formElements.push({ id: key, config: this.state.orderForm[key] });
    });
    return formElements.map(element => {
      return (
        <Input
          key={element.id}
          elementType={element.config.elementType}
          elementConfig={element.config.elementConfig}
          value={element.config.value}
          isValid={element.config.isValid}
          isTouched={element.config.isTouched}
          onChange={event => this.inputChangedHandler(event, element.id)}
        />
      );
    });
  };

  orderHandler = event => {
    event.preventDefault();
    this.postData();
  };

  postData = () => {
    this.setState({
      loading: true
    });
    const orderData = {};
    Object.keys(this.state.orderForm).forEach(
      key => (orderData[key] = this.state.orderForm[key].value)
    );
    const order = {
      ingredients: this.props.burgerIngredients,
      totalPrice: this.props.burgerPrice,
      orderData: orderData
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({
          loading: false,
          posted: true
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          posted: false
        });
        console.log(error);
      });
  };
  render() {
    if (this.state.posted) {
      return <Redirect to="/" />;
    }
    const form = this.state.loading ? (
      <Spinner />
    ) : (
      <form onSubmit={this.orderHandler}>
        {this.getFormElements()}
        <Button buttonStyle="Success" disabled={!this.state.isFormValid}>ORDER</Button>
      </form>
    );
    return (
      <div className={styles.ContactData}>
        <h4>Your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    burgerIngredients: state.ingredients,
    burgerPrice: state.totalPrice
  }
}

export default connect(mapStateToProps,null)(ContactData);
