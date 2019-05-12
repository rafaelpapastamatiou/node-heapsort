const express = require("express");
const routes = express.Router();
const HeapSortController = require("./app/controllers/HeapSortController");
routes.get("/heapsort", HeapSortController.index.bind(HeapSortController));
module.exports = routes;
