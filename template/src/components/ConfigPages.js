import React from "react";
import { Col, Row } from "reactstrap";

import {
  ConfigMenu,
  ConfigMenuItem,
  ConfigContent,
  MiniPage,
  Control
} from "./lib/Configurator/ConfigWrapper";

export default function({ menuProps, currentNav, proper }) {
  return (
    <>
      <ConfigMenu>
        <ConfigMenuItem
          {...menuProps}
          link="required"
          label="Required"
          fieldsToTrackErrorsArray={[
            "DisplayLayout",
            "PrimaryKeyField",
            "NameField"
          ]}
        />
        <ConfigMenuItem
          {...menuProps}
          link="optional"
          label="Optional"
          fieldsToTrackErrorsArray={[]}
        />
      </ConfigMenu>

      <ConfigContent>
        <MiniPage current={currentNav} name="required">
          <h4>Required Options</h4>
          <Control {...proper("DisplayLayout")}></Control>
          <Control {...proper("PrimaryKeyField")}></Control>
          <Control {...proper("NameField")}></Control>
        </MiniPage>
        <MiniPage current={currentNav} name="optional">
          <h4>Additional Optional Fields</h4>
          <Control {...proper("ListStyle")}></Control>
        </MiniPage>
      </ConfigContent>
    </>
  );
}
