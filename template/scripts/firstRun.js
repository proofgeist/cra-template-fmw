const pkgjson = require("../package.json");
const fs = require("fs");

//set the browserlist for IE 11
const browserlist = {
  production: ["ie 11", "safari 12", "chrome 78", "Edge 18"],
  development: ["ie 11", "safari 12", "chrome 78", "Edge 18"]
};

delete pkgjson.scripts.firstRun;
pkgjson.browserslist = browserlist;

fs.writeFileSync("./package.json", JSON.stringify(pkgjson, null, "  "));
fs.unlinkSync("./scripts/firstRun.js");
//fs.rmdirSync("./scripts");
console.log("First Run Complete");
