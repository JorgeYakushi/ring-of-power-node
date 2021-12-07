const router = require("express").Router();
const passport = require("passport");
const CLIENT_URL = process.env.CLIENT_URL;
// api/auth/twitch
router.get("/login", passport.authenticate("twitch", { scope: ["user_read"] }));
console.log(CLIENT_URL);
console.log(process.env.PORT);
router.get(
  "/login/callback",

  passport.authenticate("twitch", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
