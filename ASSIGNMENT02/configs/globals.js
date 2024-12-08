require("dotenv").config();

const configurations = {
  ConnectionStrings: {
    MongoDb: process.env.CONNECTION_STRING_MONGODB,
  },
  Authentication: {
    GitHub: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB,
    },
  },
};

module.exports = configurations;
