import React from "react";
import {
  Badge,
  Col,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  Container,
  Form,
  Row,
  Button
} from "reactstrap";
import { fmCallScript } from "fmw-utils";
import { SAVE_CONFIG_SCRIPT } from "../../../constants";
import pkg from "../../../../package.json";

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

export function ConfigContent({ xs = 8, children }) {
  return (
    <Col
      style={{
        marginTop: "20px",
        backgroundColor: "white",
        height: "100vh",
        borderTopLeftRadius: "40px",
        paddingRight: "0px",
        border: "solid 1px #d9d9d9"
      }}
      xs={8}
    >
      <div className="scrollableRighthand">
        <div
          style={{
            paddingTop: "26px",
            paddingLeft: "12px",
            paddingRight: "30px"
          }}
        >
          {children}
        </div>
        <div style={{ width: "100%", height: "80px" }}> </div>
      </div>
    </Col>
  );
}

export function ConfigMenu({ children }) {
  return (
    <Col style={{ height: "100vh", paddingBottom: "5px" }} xs={4}>
      <h4 style={{ paddingTop: "5px" }}>Settings</h4>
      <Nav vertical pills>
        {children}
      </Nav>
      <span
        className="text-muted"
        style={{ fontSize: "smaller", position: "absolute", bottom: "60px" }}
      >
        v{pkg.version}
      </span>
    </Col>
  );
}

export function ConfigMenuItem({
  currentNav,
  link,
  label,
  onClick,
  errors = {},
  fieldsToTrackErrorsArray = []
}) {
  return (
    <NavItem>
      <NavLink
        active={currentNav === link}
        href="#"
        onClick={() => {
          onClick(link);
        }}
      >
        {label}{" "}
        <ErrorBage
          errors={errors}
          fieldArray={fieldsToTrackErrorsArray}
        ></ErrorBage>
      </NavLink>
    </NavItem>
  );
}

export function ConfigFormWrapper({
  children,
  onSubmit,
  submitDisabled,
  formState
}) {
  return (
    <Container
      style={{
        backgroundColor: "#F2F2F2",
        height: "100%"
      }}
      fluid
    >
      <Form onSubmit={onSubmit}>
        <Row style={{ height: "100%" }}>{children}</Row>

        {/* FOOTER */}
        <Navbar fixed="bottom" color="dark">
          <FooterMessage formState={formState} />
          <div className="float-right">
            <Button
              onClick={() =>
                fmCallScript(SAVE_CONFIG_SCRIPT, null, { eventType: "cancel" })
              }
              outline
            >
              {submitDisabled ? "Close" : "Cancel"}
            </Button>{" "}
            <Button disabled={submitDisabled} color="primary">
              Save
            </Button>
          </div>
        </Navbar>
      </Form>
    </Container>
  );
}
