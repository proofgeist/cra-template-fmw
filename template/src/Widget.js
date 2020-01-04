import React, { useState } from "react";
import FMScriptButton from "./components/FMScriptButton";

function Widget(initialProps) {
  const [messageColor, changeMessageColor] = useState("blue");
  const style = { color: messageColor };

  // this function will be exposed to FileMaker
  function changeColor(newColor) {
    changeMessageColor(newColor);
  }

  // by convention we expose this through a nameSpace based on
  // the name of the component that is exposing the function
  // in this case "Widget"
  // in FileMaker we call this by calling the function 'Widget.changeColor'
  window.Widget = { changeColor };

  return (
    <>
      <p style={style}>{initialProps.message}</p>
      <FMScriptButton
        scriptName="HandleOnClick"
        scriptParameter="Hi! I am from the web viewer"
      >
        Run a FileMaker Script
      </FMScriptButton>
    </>
  );
}

export default Widget;
