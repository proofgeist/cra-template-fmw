const open = require("open");
const path = require("path");
const fmw = require("../fmw.json");

const fileUrl = `fmp://${fmw.server}/${fmw.file}?script=${fmw.uploadScript}&param=`;

const thePath = path.join(__dirname, "../", "inlined", "index.html");
const url = fileUrl + encodeURIComponent(thePath);

open(url);
