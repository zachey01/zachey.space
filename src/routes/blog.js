const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

function getAllFilesFromFolder(folderPath, callback) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return callback(err, null);
    }

    const fileNames = [];

    let pending = files.length;

    if (pending === 0) {
      return callback(null, fileNames);
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Error getting file stats:", err);
          return callback(err, null);
        }

        if (stats.isFile()) {
          const fileObj = path.parse(filePath);
          fileNames.push(fileObj.name);
        } else if (stats.isDirectory()) {
          getAllFilesFromFolder(filePath, (err, nestedFileNames) => {
            if (err) {
              return callback(err, null);
            }
            fileNames.push(...nestedFileNames);
            pending--;
            if (pending === 0) {
              callback(null, fileNames);
            }
          });
        }

        pending--;
        if (pending === 0) {
          callback(null, fileNames);
        }
      });
    });
  });
}

router.get("/", (req, res) => {
  getAllFilesFromFolder("articles", (err, fileNames) => {
    if (err) {
      res.status(500).send("Error reading files");
      return;
    }

    const fileData = [];

    fileNames.forEach((fileName) => {
      const filePath = path.join("articles", fileName + ".md");
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }
        fileData.push({ name: fileName, content: data });

        if (fileData.length === fileNames.length) {
          res.render("blog", { fileData });
        }
      });
    });
  });
});

router.get("/article/:name", (req, res) => {
  const fileName = req.params.name;
  const filePath = path.join("articles", fileName + ".md");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }

    const fileData = { name: fileName, content: data };
    res.render("article", { fileData });
  });
});

module.exports = router;
