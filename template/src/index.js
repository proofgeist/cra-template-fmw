import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Widget from "./Widget";

function BootWidget(props) {
  ReactDOM.render(<Widget {...props} />, document.getElementById("root"));
}

// if we have merged in initialProps use them to boot the widget
if (window.__initialProps__ !== "__PROPS__") {
  try {
    window.__initialProps__ = JSON.parse(window.__initialProps__);
  } catch (error) {}
  BootWidget(window.__initialProps);
} else {
  // we haven't merged so install loadInitialProps method for FM to use
  window.loadInitialProps = function(props) {
    // boot the widget with those props
    BootWidget(props);
  };

  //comment this step to prevent loading with default props
  // once this is commented out, react won't even render until props are found.
  BootWidget({ message: "Default props are loaded" });
}
