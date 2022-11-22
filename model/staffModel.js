const mongoose = require("mongoose");

const staffSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },

    staffToken: {
      type: String,
    },

    status: {
      type: String,
    },

    tokenCheck: {
      type: String,
    },

    email: {
      type: String,
    },

    password: {
      type: String,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
    },

    hub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hubs",
    },
  },
  { timestamps: true }
);

exports.module = mongoose.model("staffs", staffSchema);
