const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");

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

function workshopparser(userId, res) {
  const MainUrl = `https://steamcommunity.com/profiles/${userId}/myworkshopfiles/`;

  request(MainUrl, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const worksList = $(".workshopItem");
      const worksData = [];

      worksList.each((index, element, link) => {
        const workTitle = $(element).find(".workshopItemTitle").text();
        const workImg = $(element)
          .find(".workshopItemPreviewImage")
          .attr("src");
        const workId = $(".workshopItemPreviewHolder").attr();

        let workIdnum = workId.id.replace(/\D/g, "");

        const workData = {
          title: workTitle,
          image: workImg,
          id: workIdnum,
        };
        if (workImg) {
          worksData.push(workData);
        }
      });
      res.json(worksData);
    }
  });
}

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

router.get("/steamworkshop/:steamid", (req, res) => {
  workshopparser(`${req.params.steamid}`, res);
});

module.exports = router;
