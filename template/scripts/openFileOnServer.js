const open = require("open");
const fmw = require("../fmw.json");

const fileUrl = `fmp://${fmw.user}:${fmw.pass}@${fmw.server}/${fmw.file}`;

open(fileUrl);
