import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandling from "../../hoc/withErrorHandling/withErrorHandling";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.8,
  cheese: 0.4,
  meat: 1.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchesable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  updatePurchaseState(ingredients) {
    for (let elem in ingredients) {
      if (ingredients[elem] > 0) {
        return true;
      }
    }
    return false;
  }

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      })
      .catch(error =>
        this.setState({
          error: true
        })
      );
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
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: "Danut Dumitru",
        address: {
          stret: "sos pantelimon",
          zipCode: "021613",
          country: "Romania"
        },
        email: "test@gmail.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({
          purchasing: false,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          purchasing: false
        });
        console.log(error);
      });
  };

  render() {
    console.log("render...");
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    const orderSumary = this.state.loading ? (
      <Spinner />
    ) : (
      <OrderSummary
        ingredients={this.state.ingredients}
        onContinue={this.continuePurchaseHandler}
        onCancel={this.cancelPurchaseHandler}
        totalPrice={this.state.totalPrice}
      />
    );

    const burger = this.state.ingredients ? (
      <>
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
    ) : this.state.error ? (
      <p>The ingredients could not be loaded...</p>
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

export default withErrorHandling(BurgerBuilder, axios);
