import React, { useState, useEffect } from "react";
import { fmFetch } from "fmw-utils";
import { SCHEMA_SCAN_SCRIPT, SAVE_CONFIG_SCRIPT } from "../../constants";
import ConfigForm from "./ConfigForm";

import { buildDefaults } from "./utils";
import { useForm } from "react-hook-form";
import "./index.css";

/*
Here we set up the FORM, and connect to the FileMaker Database to
get schema, and eventually save the Config to the DB.
*/
export default function Configurator(props) {
  const { AddonUUID, Config } = props;
  const defaultValues = buildDefaults(Config);

  // FORM - useForm hook
  const { getValues, triggerValidation, ...formObj } = useForm({
    defaultValues,
    mode: "onChange"
  });

  // STATE store the CONFIG
  const [newConfig, setNewConfig] = useState(Config);

  /**
   * ON CHANGE - we may scan schema again.
   * @param {O)N} e
   */
  const onChange = e => {
    const name = e.target.name;
    const obj = Config[name];
    if (obj && obj.reScanOnChange) {
      scanSchema();
    }
  };

  /**
   * SCANS THE DB FOR META DATA
   */
  async function scanSchema() {
    const currentFormValues = getValues();
    const config = JSON.parse(JSON.stringify(newConfig));
    //add current form state back to config
    Object.keys(config).forEach(key => {
      config[key].value = currentFormValues[key];
    });

    const result = await fmFetch(SCHEMA_SCAN_SCRIPT, config);

    setNewConfig(result);
    triggerValidation();
  }

  /**
   * SAVE THE CONFIG TO FM
   * @param {*} config
   */
  const onSaveConfig = async config => {
    await fmFetch(SAVE_CONFIG_SCRIPT, config);
  };

  useEffect(() => {
    scanSchema();
  }, [Config, AddonUUID]);

  return (
    <ConfigForm
      Config={newConfig}
      {...formObj}
      onSaveConfig={onSaveConfig}
      onChange={onChange}
    ></ConfigForm>
  );
}
