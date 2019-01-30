import React from "react";

const orderSummary = props => {
  const ingredientsList = Object.keys(props.ingredients).map(key => {
    return (
      <li key={key}>
        <span style={{textTransform: "capitalize"}}>{key}
            </span> : {props.ingredients[key]}
      </li>
    );
  });
  return (
    <>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientsList}</ul>
      <p>Continue to the checkout?</p>
    </>
  );
};

export default orderSummary;
