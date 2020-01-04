import React from "react";
import PropTypes from "prop-types";

export default function FMScriptButton({
  scriptName,
  scriptParameter,
  children,
  style
}) {
  if (typeof scriptParameter === "object" && scriptParameter !== null) {
    try {
      scriptParameter = JSON.stringify(scriptParameter);
    } catch (e) {}
  }

  return (
    <button
      style={style}
      onClick={() => {
        window.FileMaker.PerformScript(scriptName, scriptParameter);
      }}
    >
      {children}
    </button>
  );
}

FMScriptButton.defaultProps = {
  children: "Run a script"
};

FMScriptButton.propTypes = {
  scriptName: PropTypes.string.isRequired,
  style: PropTypes.object,
  children: PropTypes.string,
  scriptParameter: PropTypes.string || PropTypes.object
};
