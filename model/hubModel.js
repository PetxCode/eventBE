const mongoose = require("mongoose");

const hubSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    hubToken: {
      type: String,
    },

    salesRecord: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "salesRecords",
      },
    ],

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("hubs", hubSchema);
