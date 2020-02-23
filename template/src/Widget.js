import React from "react";
import FMScriptButton from "./components/FMScriptButton";
import { useFMPerformJS, useFMFindScript } from "fmw-react-hooks";
import { fmCallScript } from "fmw-utils";

function Widget(initialProps) {
  const messageColor = useFMPerformJS("green", "changeColor");

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
      <p style={style}>{initialProps.Other.message}</p>
      <FMScriptButton
        scriptName="AddonNameHandleOnClick"
        scriptParameter="Hi! I am from the web viewer"
      >
        Run a FileMaker Script
      </FMScriptButton>
      <hr />
      <h2>Fetched From FileMaker</h2>
      <div>click the links below to show a card window</div>
      <ul>
        {data.map(record => {
          const { Name, PrimaryKey } = record.fieldData;
          return (
            <li key={Name}>
              <a
                href=""
                onClick={e => {
                  e.preventDefault();
                  fmCallScript("AddonShowDetail", { PrimaryKey });
                }}
              >
                {Name}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Widget;
