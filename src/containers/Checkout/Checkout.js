import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
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
          ingredients={this.props.burgerIngredients}
          onContinue={this.onContinueHandler}
          onCancel={this.onCancelHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"} component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    burgerIngredients: state.ingredients,
    burgerPrice: state.totalPrice
  };
};

export default connect(
  mapStateToProps,
  null
)(Checkout);
