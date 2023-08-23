const express = require("express");
const compression = require("compression");
const subdomain = require("express-subdomain");
const https = require("https");
const fs = require("fs");
const ejs = require("ejs");
const app = express();

let homeRoute = require("./src/routes/home");
let blogRoute = require("./src/routes/blog");
let projectsRoute = require("./src/routes/projects");
let contactsRoute = require("./src/routes/contacts");
let donateRoute = require("./src/routes/donate");
let mimicmsSubDomain = express.Router();

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("public", { dotfiles: "allow" }));
app.use(compression());

mimicmsSubDomain.get("/", (req, res) => {
  res.render("mimicms");
});

mimicmsSubDomain.get("/files", (req, res) => {
  const imgFolderPath = path.join(__dirname, "./public/mimicms/mimicms");

  function getFilesFromFolder(folderPath, parentPath = "") {
    let files = [];

    const folderContents = fs.readdirSync(folderPath, { withFileTypes: true });

    folderContents.forEach((item) => {
      const itemPath = path.join(folderPath, item.name);
      const itemRelativePath = path.join(parentPath, item.name);

      if (item.isFile()) {
        files.push(itemRelativePath);
      } else if (item.isDirectory()) {
        const subFolderFiles = getFilesFromFolder(itemPath, itemRelativePath);
        files = files.concat(subFolderFiles);
      }
    });

    return files;
  }

  try {
    const allFiles = getFilesFromFolder(imgFolderPath);
    res.json({ files: allFiles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read directory" });
  }
});

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
