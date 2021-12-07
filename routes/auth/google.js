const router = require("express").Router();
const passport = require("passport");
const CLIENT_URL = process.env.CLIENT_URL;
router.get("/login", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/login/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
