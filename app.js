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
const { google } = require("googleapis");
const handlebars = require("handlebars");
const fs = require("fs");

const hbs = require("nodemailer-express-handlebars");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

require("dotenv").config();

const viewRouter = require("./routes/viewRouter");
const { oauth2 } = require("googleapis/build/src/apis/oauth2");

const app = express();
// app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Global Middlewares
// Serving static files

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", viewRouter);

// POST

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

  // MailChimp

  request(options, (err, response, body) => {
    if (err) {
      res.sendFile("./failure.html", { root: "public" });
    } else {
      res.sendFile("./success.html", { root: "public" });
    }
  });

  // NodeMailer

  const accessToken = oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const handlebarsOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./public"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./public"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarsOptions));

  const mailOptions = {
    from: "Lu'um-e <infoluume@gmail.com>",
    to: email,
    subject: "¡Bienvenido a nuestra Comunidad!",
    text: "Hello from Nodemailer",
    template: "email",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.sendFile("./failure.html", { root: "public" });
    } else {
      console.log("Email sent: " + info.response);
      res.sendFile("./success.html", { root: "public" });
    }
  });
});

module.exports = app;
