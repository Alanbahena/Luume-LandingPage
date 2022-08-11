const express = require("express");
const req = require("express/lib/request");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile("./index.html", { root: "public" });
});

router.get("/contacto", (req, res) => {
  res.sendFile("./contacto.html", { root: "public" });
});

router.get("/privacidad", (req, res) => {
  res.sendFile("./privacidad.html", { root: "public" });
});

router.get("/suscrito", (req, res) => {
  res.sendFile("./sucess.html", { root: "public" });
});

router.get("/error", (req, res) => {
  res.sendFile("./failure.html", { root: "public" });
});

module.exports = router;
