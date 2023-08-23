const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("mimicms");
});

router.get("/files", (req, res) => {
  const imgFolderPath = path.join(__dirname, "../../public/mimicms");

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

module.exports = router;
