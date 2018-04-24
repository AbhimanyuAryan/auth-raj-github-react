require("dotenv").config();
const GIT_APP_ID = process.env.GIT_APP_ID;
const GIT_SECRET = process.env.GIT_SECRET;

module.exports = {
  githubAuth: {
    appID: GIT_APP_ID,
    appSecret: GIT_SECRET,
    callbackURL: "http://localhost:5150/auth/github/callback"
  }
};
