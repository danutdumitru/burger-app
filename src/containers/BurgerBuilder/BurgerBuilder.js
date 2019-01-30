import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.8,
  cheese: 0.4,
  meat: 1.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchesable: false,
    purchasing: false
  };

  updatePurchaseState(ingredients) {
    for (let elem in ingredients) {
      if (ingredients[elem] > 0) {
        return true;
      }
    }
    return false;
  }

  addIngredientHandler = type => {
    this.setState((prevState, props) => {
      const newQty = prevState.ingredients[type] + 1;
      const newIngredients = {
        ...prevState.ingredients
      };
      newIngredients[type] = newQty;
      const newPrice = prevState.totalPrice + INGREDIENT_PRICES[type];
      const newPurchesable = this.updatePurchaseState(newIngredients);
      return {
        ingredients: newIngredients,
        totalPrice: newPrice,
        purchesable: newPurchesable
      };
    });
  };

  removeIngredientHandler = type => {
    this.setState((prevState, props) => {
      const newQty = prevState.ingredients[type] - 1;
      if (newQty < 0) {
        return prevState;
      }
      const updatedIngredients = { ...prevState.ingredients };
      updatedIngredients[type] = newQty;
      const newPrice = prevState.totalPrice - INGREDIENT_PRICES[type];
      const newPurchesable = this.updatePurchaseState(updatedIngredients);
      return {
        ingredients: updatedIngredients,
        totalPrice: newPrice,
        purchesable: newPurchesable
      };
    });
  };

  purchaseHandler = () => {
    this.setState ({
      purchasing: true
    });
  }

  cancelPurchaseHandler = () => {
    this.setState( {
      purchasing: false
    });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <>
        <Modal show={this.state.purchasing} onModalClose={this.cancelPurchaseHandler}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          onAddIngredient={this.addIngredientHandler}
          onRemoveIngredient={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          totalPrice={this.state.totalPrice}
          purchesable={this.state.purchesable}
          onPurchasing={this.purchaseHandler}
        />
      </>
    );
  }
}

export default BurgerBuilder;
