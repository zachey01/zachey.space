const express = require("express");
const compression = require("compression");
const subdomain = require("express-subdomain");
const https = require("https");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const app = express();

let homeRoute = require("./src/routes/home");
let blogRoute = require("./src/routes/blog");
let projectsRoute = require("./src/routes/projects");
let contactsRoute = require("./src/routes/contacts");
let donateRoute = require("./src/routes/donate");
let mimicmsSubDomain = require("./src/routes/mimicms");

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("public", { dotfiles: "allow" }));
app.use(compression());

app.use(subdomain("mimicms", mimicmsSubDomain));

app.use("/", homeRoute);
app.use("/blog", blogRoute);
app.use("/projects", projectsRoute);
app.use("/contacts", contactsRoute);
app.use("/donate", donateRoute);

app.listen(80);
https
  .createServer(
    {
      cert: fs.readFileSync(
        "/etc/letsencrypt/live/zachey.space-0001/fullchain.pem"
      ),
      key: fs.readFileSync(
        "/etc/letsencrypt/live/zachey.space-0001/privkey.pem"
      ),
    },
    app
  )
  .listen(443);
