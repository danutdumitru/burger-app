import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import * as actions from '../../store/actions';

class Checkout extends Component {
  onContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  onCancelHandler = () => {
    this.props.history.goBack();
  };

  componentWillMount() {
    this.props.onPurchasingInit();
  }
  render() {
    return this.props.burgerIngredients?(
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
    ): (
      <Redirect to="/"/>
    );
  }
}

const mapStateToProps = state => {
  return {
    burgerIngredients: state.burger.ingredients,
    burgerPrice: state.burger.totalPrice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchasingInit: () => dispatch(actions.orderPurchasingInit())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
