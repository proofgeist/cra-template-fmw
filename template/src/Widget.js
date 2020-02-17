import React from "react";
import FMScriptButton from "./components/FMScriptButton";
import { useFMPerformJS, useFMScript } from "fmw-react-hooks";

function Widget(initialProps) {
  const messageColor = useFMPerformJS("blue", "changeColor");
  const { data } = useFMScript("getvalue", null);
  const style = { color: messageColor };

  return (
    <>
      <p style={style}>{initialProps.message}</p>
      <FMScriptButton
        scriptName="HandleOnClick"
        scriptParameter="Hi! I am from the web viewer"
      >
        Run a FileMaker Script
      </FMScriptButton>
      <hr />
      {data}
    </>
  );
}

export default Widget;
