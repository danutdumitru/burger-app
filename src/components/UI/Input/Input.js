import React from "react";

import styles from "./Input.module.css";

const Input = props => {
  let input = null;
  let validationMessage = "";
  const inputStyles = [styles.InputElement];
  if (props.isTouched && !props.isValid) {
    inputStyles.push(styles.Invalid);
    validationMessage = (
      <span className={styles.ErrorMessage}>
        Please enter a valid value
      </span>
    );
  }
  const style = inputStyles.join(" ");

  switch (props.elementType) {
    case "input":
      input = (
        <input
          className={style}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    case "textarea":
      input = (
        <textarea
          className={style}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    case "select":
      const options = [];
      props.elementConfig.options.forEach(element => {
        options.push(
          <option key={element.value} value={element.value}>
            {element.displayedValue}
          </option>
        );
      });
      input = (
        <select className={style} value={props.value} onChange={props.onChange}>
          {options}
        </select>
      );
      break;

    default:
      input = (
        <input
          className={styles.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
  }
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {input}
      {validationMessage}
    </div>
  );
};

export default Input;
