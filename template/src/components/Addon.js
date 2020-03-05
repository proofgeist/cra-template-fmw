import React, { useState } from "react";
import FMScriptButton from "./FMScriptButton";
import { fmCallScript } from "fmw-utils";
import { useFindRecords } from "../customHooks";

function Addon(initialProps) {
  const [messageColor, setMessageColor] = useState("green");
  window.changeColor = color => setMessageColor(color); //allows FM To set color
  const { data, error } = useFindRecords("*"); // find all records

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

export default Addon;
