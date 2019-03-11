import React, { Component } from "react";
import { Redirect} from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";


import styles from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actions from "../../../store/actions";
import * as formUtils from "../../../utils/forms";

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: formUtils.getInputElement("text", "Your name", true, 3),
        email: formUtils.getInputElement("email", "Your email", true),
        street: formUtils.getInputElement("text", "Your Street", true),
        postalCode: formUtils.getInputElement("text", "ZIP Code", true, 5),
        country: formUtils.getInputElement("text", "Your Country", true),
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
      isFormValid: false
    };
  }

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = _.cloneDeep(this.state.orderForm);
    const isValid = formUtils.checkInputValidity(
      event.target.value,
      updatedOrderForm[inputId].validation
    );
    updatedOrderForm[inputId].value = event.target.value;
    updatedOrderForm[inputId].isValid = isValid;
    updatedOrderForm[inputId].isTouched = true;
    const isFormValid = formUtils.checkFormValidity(updatedOrderForm);
    this.setState({
      orderForm: updatedOrderForm,
      isFormValid: isFormValid
    });
  };

  orderHandler = event => {
    event.preventDefault();
    this.props.orderStartHandler();
    this.postData();
  };

  postData = () => {
    const orderData = {};
    Object.keys(this.state.orderForm).forEach(
      key => (orderData[key] = this.state.orderForm[key].value)
    );
    const order = {
      ingredients: this.props.burgerIngredients,
      totalPrice: this.props.burgerPrice,
      orderData: orderData,
      userId: this.props.userId
    };
    this.props.placeOrderHandler(order, this.props.tokenId);
  };
  render() {
    if (this.props.orderSuccess) {
      return <Redirect to="/" />;
    } 
    const form = this.props.orderPostStarted ? (
      <Spinner />
    ) : (
      <form onSubmit={this.orderHandler}>
        {formUtils.getFormElements(this.state.orderForm, this.inputChangedHandler)}
        <Button buttonStyle="Success" disabled={!this.state.isFormValid}>
          ORDER
        </Button>
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
    burgerIngredients: state.burger.ingredients,
    burgerPrice: state.burger.totalPrice,
    orderSuccess: state.order.postedSuccess,
    orderPostStarted: state.order.startedRequest,
    orderId: state.order.orderId,
    tokenId: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    placeOrderHandler: (orderData, tokenId) =>
      dispatch(actions.tryPlaceOrderBurger(orderData, tokenId)),
    orderStartHandler: () => dispatch (actions.orderBurgerStart())
    }
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactData);
