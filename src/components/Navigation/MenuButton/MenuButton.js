import React from "react";
import styles from "./MenuButton.module.css";

const MenuButton = props => {
  return (
    <div onClick={props.onButtonClick} className={styles.ButtonMenu}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default MenuButton;
