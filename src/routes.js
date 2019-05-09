const express = require("express");
const routes = express.Router();
const HeapSortController = require("./app/controllers/HeapSortController");
routes.use("/heapsort", HeapSortController.index);
module.exports = routes;
