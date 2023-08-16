const express = require("express");
const compression = require("compression");
const ejs = require("ejs");
const app = express();

let port = 80;

let homeRoute = require("./src/routes/home");
let blogRoute = require("./src/routes/blog");
let projectsRoute = require("./src/routes/projects");
let contactsRoute = require("./src/routes/contacts");

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("public"));
app.use(compression());

app.use("/", homeRoute);
app.use("/blog", blogRoute);
app.use("/projects", projectsRoute);
app.use("/contacts", contactsRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
