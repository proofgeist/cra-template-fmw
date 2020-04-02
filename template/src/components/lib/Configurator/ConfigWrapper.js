import React, { useState } from "react";
import { fmFetch } from "fmw-utils";
import { SAVE_CONFIG_SCRIPT } from "../../../constants";
import {
  ConfigFormWrapper,
  MiniPage,
  ConfigMenu,
  ConfigContent,
  ConfigMenuItem
} from "./utils";
import { useSchema } from "./customHooks";
import Control from "./Control";

import { buildDefaults } from "./utils";
import { useForm } from "react-hook-form/dist/react-hook-form.ie11";


export { MiniPage, ConfigMenu, ConfigContent, ConfigMenuItem, Control };

/*
Here we set up the FORM, and connect to the FileMaker Database to
get schema, and eventually save the Config to the DB.
*/
export default function Configurator(props) {
  const { Config: initialConfig, children } = props;
  const defaultValues = buildDefaults(initialConfig);

  const [currentNav, setNav] = useState("required");

  // FORM - useForm hook
  const {
    getValues,
    triggerValidation,
    register,
    errors,
    formState,
    handleSubmit
  } = useForm({
    defaultValues,
    mode: "onChange"
  });

  // useSchema Hook
  const { config, schemaLoaded, scanSchema } = useSchema(
    initialConfig,
    getValues,
    triggerValidation
  );

  /**
   * ON CHANGE - we may scan schema again.
   * @param {O)N} e
   */
  const onChange = e => {
    const name = e.target.name;
    const obj = initialConfig[name];
    if (obj && obj.reScanOnChange) {
      scanSchema();
    }
  };

  /**
   * SAVE THE CONFIG TO FM
   * @param {*} config
   */
  const onSaveConfig = async config => {
    const obj = {};
    Object.keys(config).forEach(key => {
      obj[key] = {
        value: config[key].value,
        type: config[key].type,
        reScanOnChange: config[key].reScanOnChange,
        required: config[key].required
      };
    });
    await fmFetch(SAVE_CONFIG_SCRIPT, obj);
  };

  // if the schema hasn't been loaded return null
  if (!schemaLoaded) {
    return null;
  }

  /**
   *
   * @param {object} name the name of the property to Spread
   */
  function proper(name) {
    return { register, ...config[name], name, onChange, errors };
  }

  const menuProps = { errors, onClick: link => setNav(link), currentNav };
  const submitDisabled = !formState.dirty || !formState.isValid;

  const onSubmit = handleSubmit(data => {
    const clone = JSON.parse(JSON.stringify(config));
    Object.keys(clone).forEach(key => {
      clone[key].value = data[key];
    });
    onSaveConfig(clone);
  });

  return (
    <ConfigFormWrapper
      submitDisabled={submitDisabled}
      formState={formState}
      onSubmit={onSubmit}
    >
      {children(menuProps, currentNav, proper)}
    </ConfigFormWrapper>
  );
}
