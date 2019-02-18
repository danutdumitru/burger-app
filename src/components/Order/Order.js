import React from "react";

import styles from './Order.module.css';

const Order = props => {
    const ingredients = [];
    Object.keys(props.ingredients).forEach( elem => {
      ingredients.push ( {ingredientName: elem, amount: +props.ingredients[elem]})
    });
    const ingredientsList = ingredients.map ( elem => {
      return <span key={elem.ingredientName}
      style={{textTransform: 'capitalize'
            , padding:'5px 10px'
            , display:'display-block'
            , margin: '0 10px'
            ,border:'1px solid #ccc'}}>
        {elem.ingredientName} ({elem.amount})
      </span>
    });
    return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientsList}</p>
      <p>
        <strong>Price:</strong> {props.price}
      </p>
    </div>
  );
};

export default Order;
