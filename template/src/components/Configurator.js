import React from "react";
import ConfigWrapper from "./lib/Configuration";
import Configs from "./Configs";

export default function TryThis(props) {
  return (
    <ConfigWrapper {...props}>
      {(menuProps, currentNav, proper) => {
        return (
          <Configs
            menuProps={menuProps}
            currentNav={currentNav}
            proper={proper}
          />
        );
      }}
    </ConfigWrapper>
  );
}
