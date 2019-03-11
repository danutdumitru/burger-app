import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";

class Orders extends Component {

  componentDidMount() {
    if (this.props.userId) {
      this.props.getOrders(this.props.tokenId, this.props.userId);
    }
  }

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }
    if (!this.props.userId) {
      return <Redirect to="/"/>
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
    orders: state.order.orders,
    tokenId: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: (tokenId, userId) => dispatch(actions.tryLoadingOrders(tokenId, userId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
