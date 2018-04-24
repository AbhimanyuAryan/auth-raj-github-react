const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const jwt = require("express-jwt");
const auth = jwt({
  secret: jwt_secret,
  requestProperty: "payload"
});

const authCtrl = require("./authController");
const profileCtrl = require("./profileController");

console.log("Test")

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/auth/github", authCtrl.gitAuth);
router.get("/auth/github/callback", authCtrl.gitAuth);

router.get("/secret/:uid", auth, profileCtrl.secret);
router.post("/pushtoken/add", profileCtrl.addPushNotificationId);
router.post("/pushtoken/send", profileCtrl.sendPushNotifications);

module.exports = router;
