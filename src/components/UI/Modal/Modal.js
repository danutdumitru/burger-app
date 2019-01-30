import React from "react";
import styles from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => {
  const style = [styles.Modal];
  style.push(props.show ? styles.Displayed : styles.Hidden);
  return (
    <>
      <Backdrop show={props.show} onBackdropClick={props.onModalClose}/>
      <div
        className={style.reduce((classes, elem) => {
          return classes.concat(" ", elem);
        }, "")}
      >
        {" "}
        {props.children}
      </div>
    </>
  );
};

export default modal;
