import React from "react";
import { Input, FormGroup, FormText, Label, FormFeedback } from "reactstrap";

export default function Control(props) {
  if (props.type === "select") {
    const opts = Array.isArray(props.options) ? props.options : [];
    const display = props.hidden ? "none" : "";

    const valObj = {
      validate: value => {
        if (!value) return;
        if (!props.options) return;
        if (props.options.indexOf(value) >= 0) return;
        return "Please select from the available options";
      }
    };
    if (props.required) {
      valObj.required = "This option is required.";
    }

    let error = props.errors ? props.errors[props.name] : null;
    if (error && error.message) {
      error = error.message;
    }

    return (
      <FormGroup style={{ display }}>
        <span className="schema float-right">{props.rightLabel}</span>
        <Label for={props.name}>{props.label}</Label>
        <Input
          invalid={error ? true : false}
          onChange={props.onChange}
          innerRef={props.register(valObj)}
          bsSize="sm"
          type="select"
          name={props.name}
          id={props.name}
          disabled={props.disabled}
        >
          <option value="">select...</option>
          {opts.map(o => {
            return (
              <option value={o} key={o}>
                {o}
              </option>
            );
          })}
        </Input>
        <FormText>{props.help}</FormText>
        <FormFeedback invalid>{error}</FormFeedback>
      </FormGroup>
    );
  } else {
    let error = props.errors ? props.errors[props.name] : null;
    if (error && error.message) {
      error = error.message;
    }
    return (
      <FormGroup check>
        <div style={{ height: "10px" }} />
        <div className="checkbox-label">Read only</div>
        <Label check>
          <Input
            invalid={error ? true : false}
            onClick={props.onChange}
            innerRef={props.register}
            type="checkbox"
            name={props.name}
            id={props.name}
          />{" "}
          <FormText>{props.label}</FormText>
        </Label>
        <FormText>{props.help}</FormText>
        <FormFeedback invalid>{error}</FormFeedback>
      </FormGroup>
    );
  }
}
