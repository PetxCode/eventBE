const mongoose = require("mongoose");

const hubSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    hubToken: {
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

exports.module = mongoose.model("hubs", hubSchema);
