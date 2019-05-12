const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nunjucks = require("nunjucks");
const path = require("path");
class App {
  constructor() {
    if (
      process.env.NODE_ENV != "production" &&
      process.env.NODE_ENV != "testing"
    ) {
      require("dotenv-safe").load();
      console.log("dotenv-safe loaded");
      this.isDev = true;
    } else {
      this.isDev = false;
    }
    this.express = express();
    this.middlewares();
    this.views();
    this.routes();
  }
  configs() {
    this.express.use(cors());
  }
  middlewares() {
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(bodyParser.json());
  }
  routes() {
    this.express.use(require("./routes"));
  }
  views() {
    nunjucks.configure(path.resolve(__dirname, "app", "views"), {
      watch: this.isDev,
      express: this.express,
      autoescape: false
    });
    this.express.use(express.static(path.resolve(__dirname, "public")));
    this.express.set("view engine", "njk");
  }
}

module.exports = new App().express;
