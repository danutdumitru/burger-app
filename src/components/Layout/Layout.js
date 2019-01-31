import React, { Component } from "react";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    isSideDrawerDisplayed: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({
      isSideDrawerDisplayed: false
    });
  };

  sideDrawerOpenHandler = () => {
    this.setState({
      isSideDrawerDisplayed: true
    });
  };

  render() {
    return (
      <>
        <SideDrawer isDisplayed={this.state.isSideDrawerDisplayed} onClose={this.sideDrawerCloseHandler} />
        <Toolbar />
        <main className={styles.Content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
