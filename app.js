import express from "express";
import subdomain from "express-subdomain";
import pkg from "./package.json" assert { type: "json" };
import dotenv from "dotenv";
const env = process.env;
dotenv.config();
const app = express();

app.get("/", function (req, res) {
  res.send("Homepage");
});

var router = express.Router();
app.use(subdomain("api", router));
//api specific routes
router.get("/", function (req, res) {
  res.send("Welcome to our API!");
});

router.get("/users", function (req, res) {
  res.json([{ name: "Brian" }]);
});

app.listen(env.port, () => {
  console.log(`${pkg.name} listening on port ${env.port}`);
});
