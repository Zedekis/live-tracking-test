const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const accountSid = "AC9b84cf10dd4c9c0d4525aff8640bd326";
const authToken = "c162af99721b7bf625c6d938dffed08e";

const client = require("twilio")(accountSid, authToken);

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Express Server");
});

app.get("/send-text", (req, res) => {
  res.send("Hello to the Twilio Server");
  const { recipient, textmessage } = req.query;
  client.messages
    .create({
      body: textmessage,
      from: "+12293034968",
      to: "1" + recipient,
    })
    .then((message) => console.log(message.sid));
});

app.listen(4000, () => console.log("Running on port 4000"));
