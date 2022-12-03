const mongoose = require("mongoose");

const staffSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
    },

    userName: {
      type: String,
    },

    staffToken: {
      type: String,
    },

    status: {
      type: String,
    },

    verifiedToken: {
      type: String,
    },

    verified: {
      type: Boolean,
    },

    email: {
      type: String,
    },

    password: {
      type: String,
    },

    userImage: {
      type: String,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
    },

    hub: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "staffHubs",
      },
    ],

    salesRecord: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "salesRecords",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("staffs", staffSchema);
