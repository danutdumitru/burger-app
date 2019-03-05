import React, { Component } from "react";
import {connect} from 'react-redux';

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
        <SideDrawer isDisplayed={this.state.isSideDrawerDisplayed} onClose={this.sideDrawerCloseHandler} tokenId={this.props.tokenId}/>
        <Toolbar onMenuButtonClick={this.sideDrawerToggleHandler} tokenId={this.props.tokenId}/>
        <main className={styles.Content}>{this.props.children}</main>
        <Message/>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    tokenId: state.auth.token
  }
}

export default connect(mapStateToProps, null)(Layout);
