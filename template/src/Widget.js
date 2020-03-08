import React from "react";
import defaultConfig from "./configuration.json";
import Addon from "./components/Addon";
import Configurator from "./components/Configurator";

function Widget(initialProps) {
  const Config = initialProps.Config;
  if (!Config || Object.keys(Config).length < 1) {
    initialProps = { ...initialProps, Config: defaultConfig };
    window.__initialProps__ = initialProps;
  }

  if (initialProps.ShowConfig) return <Configurator {...initialProps} />;
  return <Addon {...initialProps} />;
}

export default Widget;
