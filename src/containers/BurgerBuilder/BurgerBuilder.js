import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  render() {
    return (
      <>
        <Burger>Burger</Burger>
        <div>Burger Controls</div>
      </>
    );
  }
}

export default BurgerBuilder;