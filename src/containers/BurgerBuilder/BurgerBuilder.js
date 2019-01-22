import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

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
    totalPrice: 4
  };

  addIngredientHandler = type => {
    this.setState((prevState, props) => {
      const newQty = prevState.ingredients[type] + 1;
      const newIngredients = {
        ...prevState.ingredients
      };
      newIngredients[type] = newQty;
      const newPrice = prevState.totalPrice + INGREDIENT_PRICES[type];
      return {
        ingredients: newIngredients,
        totalPrice: newPrice
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
      return {
        ingredients: updatedIngredients,
        totalPrice: newPrice
      };
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          onAddIngredient={this.addIngredientHandler}
          onRemoveIngredient={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
        />
      </>
    );
  }
}

export default BurgerBuilder;
