const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },

    companyToken: {
      type: String,
    },

    status: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
    },

    vision: {
      type: String,
    },

    password: {
      type: String,
    },

    verifiedToken: {
      type: String,
    },

    verified: {
      type: Boolean,
    },

    staff: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "staffs",
      },
    ],

    hub: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hubs",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("companies", companySchema);
