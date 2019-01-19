import React from "react";
import styles from "./BurgerIngredient.module.css";
import PropTypes from "prop-types";

const BurgerIngredient = props => {
  let ingredient = null;
  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={styles.BreadBottom} />;
      break;
    case "bread-top":
      ingredient = (
        <div className={styles.BreadTop}>
          <div className={styles.Seeds1} />
          <div className={styles.Seeds1} />
        </div>
      );
      break;
    case "meat":
      ingredient = <div className={styles.Meat} />;
      break;
    case "cheese":
      ingredient = <div className={styles.Cheese} />;
      break;
    case "salad":
      ingredient = <div className={styles.Salad} />;
      break;
    case "bacon":
      ingredient = <div className={styles.Bacon} />;
      break;
    default:
      ingredient = <div>Not found...</div>;
  }
  return ingredient;
};

BurgerIngredient.propTypes = {
    type:  PropTypes.oneOf(["bread-top", "bread-bottom", "meat", "cheese", "bacon", "salad"])
}

export default BurgerIngredient;
