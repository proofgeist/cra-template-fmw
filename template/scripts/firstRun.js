const pkgjson = require("../package.json");
const fs = require("fs");

//set the browserlist for IE 11
const browserlist = {
  production: ["ie 11", "safari 12", "chrome 78", "Edge 18"],
  development: ["ie 11", "safari 12", "chrome 78", "Edge 18"]
};

pkgjson.browserslist = browserlist;

fs.writeFileSync("./package.json", JSON.stringify(pkgjson, null, "  "));
