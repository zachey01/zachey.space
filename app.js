const express = require("express");
const ejs = require("ejs");
require("dotenv").config();
const app = express();
const env = process.env;

const homeRoute = require("./src/routes/home");
const blogRoute = require("./src/routes/blog");

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("public"));

app.use("/", homeRoute);
app.use("/blog", blogRoute);

app.listen(env.port, () => {
  console.log(`App listening on port ${env.port}`);
});
