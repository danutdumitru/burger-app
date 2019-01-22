import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" }
];

const BuildControls = props => {
  return (
    <div className={styles.BuildControls}>
      {controls.map(elem => (
        <BuildControl
          label={elem.label}
          key={elem.label}
          onAddIngredient={() => props.onAddIngredient(elem.type)}
          onRemoveIngredient= { () => props.onRemoveIngredient(elem.type)}
          disabled={props.disabledInfo[elem.type]}
        />
      ))}
    </div>
  );
};

export default BuildControls;
