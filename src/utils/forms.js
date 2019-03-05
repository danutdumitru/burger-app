import React from 'react';
import Input from '../components/UI/Input/Input';

export const getInputElement = (
  type,
  placeholder,
  isRequired,
  minLength,
  maxLength,
  regex
) => {
  const validation = {
    required: isRequired
  };
  if (minLength) {
    validation.minLength = minLength;
  }
  if (maxLength) {
    validation.maxLength = maxLength;
  }
  if (regex) {
    validation.regex = regex;
  }
  return {
    elementType: "input",
    elementConfig: {
      type: type,
      placeholder: placeholder
    },
    value: "",
    isValid: false,
    validation: validation,
    isTouched: false
  };
};

export const getFormElements = (form, inputChangedHandler) => {
  const formElements = [];
  Object.keys(form).forEach(key => {
    formElements.push({ id: key, config: form[key] });
  });
  return formElements.map(element => {
    return (
      <Input
        key={element.id}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        isValid={element.config.isValid}
        isTouched={element.config.isTouched}
        onChange={event => inputChangedHandler(event, element.id)}
      />
    );
  });
};

export const checkInputValidity = (value, rules) => {
  if (rules) {
    return (
      (!rules.required || value.trim() !== "") &&
      ((!rules.minLength) || (value.trim().length >= rules.minLength) ) &&
      ((!rules.maxLength) || (value.trim().length <= rules.maxLength)) &&
      ((!rules.regex) || (rules.regex.test(value)))
    );
  } else {
    return true;
  }
};

export const checkFormValidity = orderForm => {
  let valid = true;
  Object.keys(orderForm).forEach(key => {
    valid = valid && orderForm[key].isValid;
  });
  return valid;
};
