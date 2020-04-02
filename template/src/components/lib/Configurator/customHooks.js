import { useState } from "react";
import { fmFetch } from "fmw-utils";
import { SCHEMA_SCAN_SCRIPT } from "../../../constants";

export function useSchema(Config, getValues, triggerValidation) {
  const [scannedConfig, setScannedConfig] = useState(Config);
  const [schemaLoaded, setSchemaLoaded] = useState(false);

  const scanSchema = async () => {
    const currentFormValues = getValues();
    const clonedConfig = JSON.parse(JSON.stringify(scannedConfig));
    //add current form state
    Object.keys(clonedConfig).forEach(key => {
      clonedConfig[key].value = currentFormValues[key];
    });

    const result = await fmFetch(SCHEMA_SCAN_SCRIPT, clonedConfig);

    setScannedConfig(result);
    setSchemaLoaded(true);
    triggerValidation();
  };

  // scan the schema the on the first render
  if (!schemaLoaded) {
    scanSchema();
  }

  return { schemaLoaded, config: scannedConfig, scanSchema };
}
