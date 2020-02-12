import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { init } from "fmw-utils";

import "./index.css";
import Widget from "./Widget";

function BootWidget(props) {
  ReactDOM.render(<Widget {...props} />, document.getElementById("root"));
}

init(BootWidget);
