const express = require("express");
const http = require("http");
const router = express.Router();

let url = "http://localhost/projects.json";

http
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
