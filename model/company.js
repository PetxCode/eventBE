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

    staff: [
      {
        type: mongoose.Types.ObjectId(),
        ref: "staffs",
      },
    ],

    hub: [
      {
        type: mongoose.Types.ObjectId(),
        ref: "hubs",
      },
    ],
  },
  { timestamps: true }
);

exports.module = mongoose.model("companies", companySchema);
