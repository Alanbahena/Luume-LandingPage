"use strict";

const path = require("path");
const express = require("express");
const exp = require("constants");
const nodemailer = require("nodemailer");
const enforce = require("express-sslify");
const { default: helmet } = require("helmet");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

require("dotenv").config();

const viewRouter = require("./routes/viewRouter");

const app = express();
app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Global Middlewares
// Serving static files

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", viewRouter);

module.exports = app;
