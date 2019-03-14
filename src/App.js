import React, { Component, Suspense} from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Logout/Logout";
import * as actions from "./store/actions";

const CheckoutComponent = React.lazy ( () => import( './containers/Checkout/Checkout'));
const OrdersComponent = React.lazy ( () => import ("./containers/Orders/Orders"));
class App extends Component {
  componentDidMount() {
    this.props.checkAuthHandler();
  }

  render() {
    return (
      <div>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={CheckoutComponent} />
            <Route path="/orders" component={OrdersComponent} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
          </Switch>
          </Suspense>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthHandler: () => dispatch(actions.checkAuthState())
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
