import React, { Component } from "react";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Message from "../../components/UI/Message/Message";

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

  sideDrawerToggleHandler= () => {
    this.setState ( (prevState, props) => {
      return {isSideDrawerDisplayed: !prevState.isSideDrawerDisplayed};
    });
  }
  
  render() {
    return (
      <>
        <SideDrawer isDisplayed={this.state.isSideDrawerDisplayed} onClose={this.sideDrawerCloseHandler} />
        <Toolbar onMenuButtonClick={this.sideDrawerToggleHandler}/>
        <main className={styles.Content}>{this.props.children}</main>
        <Message/>
      </>
    );
  }
}

export default Layout;
