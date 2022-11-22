const mongoose = require("mongoose");

const staffSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    staffToken: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    company: {
      type: mongoose.Types.ObjectId(),
      ref: "companies",
    },
  },
  { timestamps: true }
);

exports.module = mongoose.model("staffs", staffSchema);
