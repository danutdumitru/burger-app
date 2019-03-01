import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandling from "../../hoc/withErrorHandling/withErrorHandling";
import * as actionCreators from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchesable: false,
    purchasing: false,
    loading: false
  };

  getPurchaseState(ingredients) {
    for (let elem in ingredients) {
      if (ingredients[elem] > 0) {
        return true;
      }
    }
    return false;
  }

  componentDidMount() {
    console.log("BurgerBUilder - componentDidMount TO BE REFACTORED");
    this.props.onInitBurger();
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  cancelPurchaseHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  setLoading = loading => {
    this.setState({
      loading: loading
    });
  };

  continuePurchaseHandler = () => {
    this.props.history.push({
      pathname: "/checkout"
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.burgerIngredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    const orderSumary = (
      <OrderSummary
        ingredients={this.props.burgerIngredients}
        onContinue={this.continuePurchaseHandler}
        onCancel={this.cancelPurchaseHandler}
        totalPrice={this.props.burgerPrice}
      />
    );

    const burger = this.props.errorFetchIngredients ? (
      <p>The ingredients could not be loaded...</p>
    ) : this.props.burgerIngredients ? (
      <>
        <Burger ingredients={this.props.burgerIngredients} />
        <BuildControls
          onAddIngredient={type => this.props.onAddIngredient(type)}
          onRemoveIngredient={type => this.props.onRemoveIngredient(type)}
          disabledInfo={disabledInfo}
          totalPrice={this.props.burgerPrice}
          purchesable={this.getPurchaseState(this.props.burgerIngredients)}
          onPurchasing={this.purchaseHandler}
        />
      </>
    ) : (
      <Spinner />
    );
    return (
      <>
        <Modal
          show={this.state.purchasing}
          onModalClose={this.cancelPurchaseHandler}
        >
          {orderSumary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    burgerIngredients: state.burger.ingredients,
    burgerPrice: state.burger.totalPrice,
    errorFetchIngredients: state.burger.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingredient =>
      dispatch(actionCreators.addIngredient(ingredient)),
    onRemoveIngredient: ingredient =>
      dispatch(actionCreators.removeIngredient(ingredient)),
    onInitBurger: () => dispatch(actionCreators.initIngredients())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(BurgerBuilder, axios));
