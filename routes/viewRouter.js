const express = require("express");
const req = require("express/lib/request");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile("./index.html", { root: "public" });
});

router.get("/caracteristicas", (req, res) => {
  res.sendFile("./index.html#caracteristicas", { root: "public" });
});

router.get("/servicios", (req, res) => {
  res.sendFile("./index.html#servicios", { root: "public" });
});

router.get("/acerca", (req, res) => {
  res.sendFile("./index.html#acerca", { root: "public" });
});

module.exports = router;
