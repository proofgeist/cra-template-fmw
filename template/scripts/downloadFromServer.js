/**
 * this script will download the file from the server
 * This requires that Otto from Geist Interactive be running on the server
 * It also requires that the fmw.json file have the file name and server url defined
 */

const fmw = require("../fmw.json");
const https = require("https");
const fs = require("fs");

if (!process.env.FMS_SERVER_USER) {
  throw Error(
    "Server user name must be set as an environmental variable 'FMS_SERVER_USER'"
  );
}

if (!process.env.FMS_SERVER_PASS) {
  throw Error(
    "Server user password must be set as an environmental variable 'FMS_SERVER_PASS'"
  );
}

const FileName = fmw.file;

const URL = `https://${process.env.FMS_SERVER_USER}:${process.env.FMS_SERVER_PASS}@claris.gicloud.net:3030/api/file/download/${FileName}`;

https
  .get(URL, response => {
    if (response.statusCode === 200) {
      response.pipe(fs.createWriteStream(`./${FileName}`)).on("close", () => {
        console.log(`${FileName} downloaded`);
      });
    } else {
      console.log(
        `download failed with a HTTP status code of ${response.statusCode}`
      );
    }
  })
  .on("error", e => {
    console.error(e);
  });
