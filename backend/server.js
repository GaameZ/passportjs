const express = require("express");
const app = express();
const { portNumber } = require("./conf.js");

app.get("/", (req, res) => {
  res.send("Work !");
});

app.listen(portNumber, () => {
  console.log(`API root available at: http://localhost:${portNumber}/`);
});
