import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {
      meat: 0,
      bacon: 0,
      salad: 0,
      cheese: 0
    }
  };

  constructor(props) {
    super(props);
    const params = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let elem of params.entries()) {
      if (elem[0] === 'price') {
        this.state.totalPrice = +elem[1];
      } else {
        ingredients[elem[0]] = +elem[1];
      }
    }
    if (ingredients) {
      this.state.ingredients = ingredients;
    }
  }

  onContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  onCancelHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onContinue={this.onContinueHandler}
          onCancel={this.onCancelHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => {
            return <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} />;
          }}
        />
      </div>
    );
  }
}

export default Checkout;
