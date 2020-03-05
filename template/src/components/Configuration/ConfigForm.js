import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  Button,
  Form
} from "reactstrap";
import Control from "./Control";
import { MiniPage, ErrorBage, FooterMessage } from "./utils";

/**
 *
 * HERE WE DRAW THE LAYOUT OF THE FORM
 * This handles the navigation between tabs
 * we use at least two columns
 *
 * @param {*} props
 */
export default function ConfigForm(props) {
  const {
    Config,
    register,
    errors,
    formState,
    handleSubmit,
    onChange,
    onSaveConfig
  } = props;
  const [currentNav, setNav] = useState("required");

  function proper(name) {
    return { register, ...Config[name], name, onChange, errors };
  }

  const onSubmit = data => {
    const config = JSON.parse(JSON.stringify(Config));
    Object.keys(config).forEach(key => {
      config[key].value = data[key];
    });
    onSaveConfig(config);
  };

  const submitDisabled = !formState.dirty || !formState.isValid;

  return (
    <Container
      style={{
        backgroundColor: "#F2F2F2",
        height: "100%"
      }}
      fluid
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row style={{ height: "100%" }}>
          {/* LEFT COLUMN */}
          <Col style={{ height: "100%" }} xs={4}>
            <h4 style={{ paddingTop: "5px" }}>Settings</h4>
            <Nav vertical pills>
              <NavItem>
                <NavLink
                  active={currentNav === "required"}
                  href="#"
                  onClick={() => {
                    setNav("required");
                  }}
                >
                  Required{" "}
                  <ErrorBage
                    errors={errors}
                    fieldArray={[
                      "DisplayLayout",
                      "PrimaryKeyField",
                      "NameField"
                    ]}
                  ></ErrorBage>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => {
                    setNav("optional");
                  }}
                  active={currentNav === "optional"}
                  href="#"
                >
                  Optional
                </NavLink>
              </NavItem>
            </Nav>
          </Col>

          {/* SECOND COLUMN */}
          <Col
            style={{
              marginTop: "20px",
              backgroundColor: "white",
              height: "100vh",
              borderTopLeftRadius: "40px",
              paddingRight: "30px",
              border: "solid 1px #d9d9d9"
            }}
            xs={8}
          >
            <div style={{ paddingTop: "26px", paddingLeft: "12px" }}>
              <MiniPage current={currentNav} name="required">
                <h4>Required Options</h4>
                <Control {...proper("DisplayLayout")}></Control>
                <Control {...proper("PrimaryKeyField")}></Control>
                <Control {...proper("NameField")}></Control>
              </MiniPage>
              <MiniPage current={currentNav} name="optional">
                <h4>Required Options</h4>
                <Control {...proper("ListStyle")}></Control>
              </MiniPage>
            </div>
          </Col>
        </Row>

        {/* FOOTER */}
        <Navbar fixed="bottom" color="dark">
          <FooterMessage formState={formState} />
          <Button
            disabled={submitDisabled}
            className="float-right"
            color="primary"
          >
            Save
          </Button>
        </Navbar>
      </Form>
    </Container>
  );
}
