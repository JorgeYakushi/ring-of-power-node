const express = require("express");
const auth = express.Router();
console.log("routes/auth/index");
auth.use("/google", require("./google"));
auth.use("/twitch", require("./twitch"));
// spotify
// facebook
// ig
// tiktok
module.exports = auth;
