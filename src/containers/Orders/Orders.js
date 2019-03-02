import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";

class Orders extends Component {

  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    const orders = this.props.orders.map(elem => {
      console.log (elem);
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

const mapStateToProps = state => {
  return {
    loading: state.order.startedRequest,
    orders: state.order.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(actions.tryLoadingOrders())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
