import React from "react";
import ConfigWrapper from "./ConfigWrapper";
import i18n from "../../../i18n";
import "./index.css";

export default function Configurator(props) {
  const { ConfigPages, ...rest } = props;
  const mergedProps = { ...rest, ...addLangToConfig(rest.Config) };

  return (
    <ConfigWrapper {...mergedProps}>
      {(menuProps, currentNav, proper) => {
        return (
          <ConfigPages
            menuProps={menuProps}
            currentNav={currentNav}
            proper={proper}
          />
        );
      }}
    </ConfigWrapper>
  );
}

/**
 * handles merging configurator options with language
 * @param {*} config
 * @param {*} lang
 */
function addLangToConfig(config, lang) {
  const strings = i18n("en");

  const mergedConfig = {};
  Object.keys(strings).forEach(key => {
    const page = strings[key];
    Object.keys(page.Fields).forEach(field => {
      const configField = config[field];

      const pageField = page.Fields[field];
      mergedConfig[field] = { ...configField, ...pageField };
    });
  });
  return { Config: mergedConfig };
}
