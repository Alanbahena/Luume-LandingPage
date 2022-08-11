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

app.post("/subscription", (req, res) => {
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
      },
    ],
  };

  const postData = JSON.stringify(data);

  const options = {
    url: `https://us14.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_ID}`,
    method: "POST",
    headers: {
      Authorization: `auth ${process.env.MAILCHIMP_KEY}`,
    },
    body: postData,
  };

  request(options, (err, response, body) => {
    if (err) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      res.sendFile(__dirname + "/success.html");
    }
  });
});

module.exports = app;
