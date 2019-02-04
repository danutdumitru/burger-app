import React from "react";
import Button from "../../UI/Button/Button";
import PropTypes from "prop-types";

const orderSummary = props => {
  const ingredientsList = Object.keys(props.ingredients).map(key => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span> :{" "}
        {props.ingredients[key]}
      </li>
    );
  });
  return (
    <>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientsList}</ul>
      <p>
        <strong>Total price: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to the checkout?</p>
      <Button buttonStyle="Success" onClick={props.onContinue}>
        CONTINUE
      </Button>
      <Button buttonStyle="Danger" onClick={props.onCancel}>
        CANCEL
      </Button>
    </>
  );
};

orderSummary.propTypes = {
  ingredients: PropTypes.object
};

export default orderSummary;
