const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
class App {
  constructor() {
    if (!process.env.NODE_ENV) {
      require("dotenv-safe").load();
      console.log("dotenv-safe loaded");
    }
    this.express = express();
    this.middlewares();
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
}

module.exports = new App().express;
