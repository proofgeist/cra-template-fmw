import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { init } from "fmw-utils";

import "./themed-bootstrap.css";
import "./index.css";

import Widget from "./Widget";

function BootWidget(props) {
  ReactDOM.render(<Widget {...props} />, document.getElementById("root"));
}

window.onWebdInternalRefresh = () => {
  // this will only run on WebDirect when webD refreshes, like when window resizing or returning to layout (should be a bug)
  // so we reboot the whole widget when this happens
  // the widget itself will look for cached values to restore
  init(BootWidget, null, true);
};

//this function is run via the body's onload attribute
//<body onload="fmwInit()">
window.fmwInit = function fmwInit() {
  //On Web Direct this only runs on first load. Even returning to a layout that has been loaded doesn't run this
  init(BootWidget);
};
