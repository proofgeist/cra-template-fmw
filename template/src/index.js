import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { init } from "fmw-utils";

import './themed-bootstrap.css'
import "./index.css";

import Widget from "./Widget";

//
function BootWidget(props) {
  ReactDOM.render(<Widget {...props} />, document.getElementById("root"));
}

// this is triggered by the body onload event
window.fmwInit = function fmwInit() {
  // init loads the props that have been merged in
  // and the calls BootWidget
  // this helps widgets only load after they have props
  init(BootWidget);
}
