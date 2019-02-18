import React, { Component } from "react";

import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  getOrders = () => {
    axios
      .get("/orders.json")
      .then(response => {
        const orders = [];
        Object.keys(response.data).forEach(key => {
          orders.push({
            id: key,
            ...response.data[key]
          });
        });
        this.setState({ orders: orders, loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
        return error;
      });
  };

  componentDidMount() {
    this.getOrders();
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }

    const orders = this.state.orders.map(elem => {
      return (
        <Order
          ingredients={elem.ingredients}
          price={elem.totalPrice}
          key={elem.id}
        />
      );
    });
    return <div>{orders}</div>;
  }
}

export default Orders;
