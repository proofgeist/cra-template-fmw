import React from "react";
import { Badge } from "reactstrap";

export function buildDefaults(Config) {
  const obj = {};
  Object.keys(Config).forEach(c => {
    obj[c] = Config[c].value;
  });
  return obj;
}

/**
 * Displays the children when it is 'current'
 * @param {*} param0
 */
export function MiniPage({ name, current, children }) {
  const style = current !== name ? { display: "none" } : {};
  return <div style={style}>{children}</div>;
}

/**
 * Displays an error badge when the fields in the array
 * @param {Object} param0
 * @param {Object} errors the form error object
 * @param {Array} fieldArray the array of Fields to count errors in.
 * @
 */
export function ErrorBage({ errors, fieldArray }) {
  const filteredErrors = Object.keys(errors).filter(error => {
    return fieldArray.includes(error);
  });

  const length = filteredErrors.length;
  if (length) {
    return <Badge color="danger">{length}</Badge>;
  }
  return null;
}

/**
 * displays the forter meessage
 * @param {object} param0
 * @param {object} param.formState
 */
export function FooterMessage({ formState }) {
  let message = "";
  let color = "";
  if (!formState.isValid) {
    message = "Please fix the errors before saving.";
    color = "danger";
  } else if (formState.dirty) {
    message = "Please save.";
    color = "warning";
  }

  if (message) {
    return (
      <Badge style={{ padding: "5px" }} color={color}>
        <strong>{message}</strong>
      </Badge>
    );
  }
  return <div className="text-muted">no changes to save</div>;
}
