const express = require("express");
const https = require("https");
const router = express.Router();

let url = "https://zachey.space/projects.json";

https
  .get(url, (res) => {
    let body = "";

    res.on("data", (chunk) => {
      body += chunk;
    });

    res.on("end", () => {
      try {
        let json = JSON.parse(body);
        router.get("/", (req, res) => {
          res.render("projects", { json });
        });
      } catch (error) {
        console.error(error.message);
      }
    });
  })
  .on("error", (error) => {
    console.error(error.message);
  });

module.exports = router;
