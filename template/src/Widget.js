import React from "react";
import FMScriptButton from "./components/FMScriptButton";
import { useFMPerformJS, useFMFindScript } from "fmw-react-hooks";

function Widget(initialProps) {
  const messageColor = useFMPerformJS("blue", "changeColor");

  const { data, error } = useFMFindScript("AddonNameFind", {
    layouts: "AddonSampleData",
    query: [{ PrimaryKey: "*" }]
  });

  if (error) {
    console.error(error);
  }
  if (!data) return "";

  const style = { color: messageColor };

  return (
    <>
      <h1>Test Addon</h1>
      <p style={style}>{initialProps.message}</p>
      <FMScriptButton
        scriptName="AddonNameHandleOnClick"
        scriptParameter="Hi! I am from the web viewer"
      >
        Run a FileMaker Script
      </FMScriptButton>
      <hr />
      <h2>Fetched From FileMaker</h2>
      <ul>
        {data.map(record => {
          const name = record.fieldData.Name;
          return <li key={name}>{name}</li>;
        })}
      </ul>
    </>
  );
}

export default Widget;
