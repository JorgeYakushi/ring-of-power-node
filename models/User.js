const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  google: {
    id: {
      type: String,
    },
    displayName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    token: {
      type: String,
    },
  },
  twitch: {
    id: {
      type: String,
    },
    displayName: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    token: {
      type: String,
    },
  },
});

module.exports = mongoose.model("User", UserSchema);
