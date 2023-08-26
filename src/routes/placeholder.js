const express = require("express");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const favicon = require("serve-favicon");
const router = express.Router();

const publicPath = path.join("public");
const animeArtNormalPath = path.join(
  publicPath,
  "placeholders",
  "anime",
  "art-normal"
);
const animeArtNswfPath = path.join(
  publicPath,
  "placeholders",
  "anime",
  "art-nswf"
);
const animeAvatarsPath = path.join(
  publicPath,
  "placeholders",
  "anime",
  "avatars"
);

router.use(favicon(path.join(publicPath, "img/favicons/placeholder.ico")));
router.use(express.static(publicPath));

router.get("/", (req, res) => {
  res.send(`
  <body>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Placeholders</title>

  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
    crossorigin="anonymous"
  />
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
    crossorigin="anonymous"
  ></script>
  <style>
    .demo-img {
      border-radius: 5px;
      margin-left: 90%;
    }
    body {
      border: 1px solid black;
      border-radius: 5px;
    }
  </style>
  <div class="container-sm">
    <h1 class="text-center">
      Placeholders <img src="/img/favicons/placeholder.ico" alt="Icon" width="30" />
    </h1>
    <h3>Creative placeholders</h3>
  </div>
  <hr />
  <div class="container-sm">
    <code>/p</code> - Default placeholder
    <img src="/p/100" alt="" class="demo-img" />
    <p>
      Example: <code>/p/50x50/red/black/Test</code
      ><img src="/p/100x100/red/black/Test" alt="" class="demo-img" />
    </p>
  </div>
  <hr />
  <div class="container-sm">
    <code>/anime</code> - Anime placeholder
    <img src="/anime/100" alt="" class="demo-img" />
  </div>
  <hr />
  <div class="container-sm">
    <code>/avatar</code> - Anime avatar
    <img src="/avatar" alt="" width="100" class="demo-img" />
  </div>
  <hr />
  <div class="container-sm">
    <code>/anime-nswf</code> - Anime NSWF placeholder
    <p>
      Warning: NSWF images are not recommended!<img
        src="/p/100/black/white/18+"
        alt=""
        width="100"
        class="demo-img"
      />
    </p>
  </div>
</body>

  `);
});

router.get(
  "/p/?(:width(\\d+))?(x:height(\\d+))?(/:color)?(/:tcolor)?(/:text)?",
  (req, res) => {
    const { width, height, color, text, tcolor } = req.params;
    const imageWidth = parseInt(width) || 300;
    const imageHeight = parseInt(height) || imageWidth;
    const backgroundColor = color || "lightgray";
    const textColor = tcolor || "black";
    const textSize = Math.floor(imageHeight / 6);
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${imageWidth}" height="${imageHeight}" viewBox="0 0 ${imageWidth} ${imageHeight}" fill="${backgroundColor}">
        <rect width="${imageWidth}" height="${imageHeight}"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="${textSize}" fill="${textColor}">${
      text || `${imageWidth}x${imageHeight}`
    }</text>
      </svg>
    `;
    res.set("Content-Type", "image/svg+xml");
    res.send(svg);
  }
);

router.get("/anime/?(:width(\\d+))?(x:height(\\d+))?", async (req, res) => {
  try {
    const { width, height } = req.params;
    const imageWidth = parseInt(width) || 700;
    const imageHeight = parseInt(height) || imageWidth;
    const files = await fs.promises.readdir(animeArtNormalPath);
    if (files.length === 0) {
      console.log("The folder is empty.");
      res.status(404).send("Files not found");
      return;
    }
    const randomIndex = Math.floor(Math.random() * files.length);
    const randomFile = files[randomIndex];
    const imagePath = path.join(animeArtNormalPath, randomFile);
    const imageBuffer = await sharp(imagePath)
      .resize(imageWidth, imageHeight)
      .png()
      .toBuffer();

    res.set("Content-Type", "image/png");
    res.send(imageBuffer);
  } catch (error) {
    console.error("Folder read error:", error);
    res.status(500).send("Internal server error");
  }
});

router.get(
  "/anime-nswf/?(:width(\\d+))?(x:height(\\d+))?",
  async (req, res) => {
    try {
      const { width, height } = req.params;
      const imageWidth = parseInt(width) || 700;
      const imageHeight = parseInt(height) || 500;
      const files = await fs.promises.readdir(animeArtNswfPath);
      if (files.length === 0) {
        console.log("The folder is empty.");
        res.status(404).send("Files not found");
        return;
      }
      const randomIndex = Math.floor(Math.random() * files.length);
      const randomFile = files[randomIndex];
      const imagePath = path.join(animeArtNswfPath, randomFile);
      const imageBuffer = await sharp(imagePath)
        .resize(imageWidth, imageHeight)
        .png()
        .toBuffer();
      res.set("Content-Type", "image/png");
      res.send(imageBuffer);
    } catch (error) {
      console.error("Folder read error:", error);
      res.status(500).send("Internal server error");
    }
  }
);

router.get("/avatar", (req, res) => {
  fs.readdir(animeAvatarsPath, (err, files) => {
    if (err) {
      console.error("Folder read error:", err);
      res.status(500).send("Internal server error");
      return;
    }
    if (files.length === 0) {
      console.log("The folder is empty.");
      res.status(404).send("Files not found");
      return;
    }
    const randomIndex = Math.floor(Math.random() * files.length);
    const randomFile = files[randomIndex];
    const filePath = path.resolve(animeAvatarsPath, randomFile);
    res.sendFile(filePath);
  });
});

module.exports = router;
