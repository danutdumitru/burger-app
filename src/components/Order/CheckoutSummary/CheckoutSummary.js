import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./CheckoutSummary.module.css";

const CheckoutSummary = props => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes well :-)</h1>
      <div className={styles.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button buttonStyle="Success" onClick={props.onContinue}>
        CONTINUE
      </Button>
      <Button buttonStyle="Danger" onClick={props.onCancel}>
        CANCEL
      </Button>
    </div>
  );
};

export default CheckoutSummary;
