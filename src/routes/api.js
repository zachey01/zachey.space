const express = require("express");
const router = express.Router();

const versionsJson = {
  MimiCMS: {
    "1.0": {
      url: "https://example.com/1.0.0.zip",
    },
    "2.0": {
      url: "https://example.com/1.0.0.zip",
    },
  },
  test: {
    "1.0": {
      url: "https://example.com/1.0.0.zip",
    },
    "2.0": {
      url: "https://example.com/1.0.0.zip",
    },
  },
};

router.get("/v/:name", (req, res) => {
  const name = req.params.name;
  const versions = versionsJson[name];

  if (versions) {
    res.json(versions);
  } else {
    res.json({ error: "Name not found" });
  }
});

router.get("/v/:name/:yourVersion", (req, res) => {
  const name = req.params.name;
  const yourVersion = req.params.yourVersion;
  const versions = versionsJson[name];

  if (versions) {
    const latestVersion = Object.keys(versions).pop();

    if (yourVersion === latestVersion) {
      res.json({ lastest: true, message: "Latest version" });
    } else {
      res.json({ lastest: false, message: "Not latest version" });
    }
  } else {
    res.json({ error: "Name not found" });
  }
});

module.exports = router;
