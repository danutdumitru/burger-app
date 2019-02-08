import React, { Component } from "react";
import styles from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.show !== nextProps.show) 
      || (this.props.children !== nextProps.children)
  }

  componentWillUpdate() {
    console.log ("Modal - willUpdate");
  }

  render() {
    const style = [styles.Modal];
    style.push(this.props.show ? styles.Displayed : styles.Hidden);
    return (
      <>
        <Backdrop
          show={this.props.show}
          onBackdropClick={this.props.onModalClose}
        />
        <div
          className={style.reduce((classes, elem) => {
            return classes.concat(" ", elem);
          }, "")}
        >
          {" "}
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;
