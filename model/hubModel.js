const mongoose = require("mongoose");

const hubSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    hubToken: {
      type: String,
    },
    staff: {
      type: String,
    },

    // staff: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "staffs",
    // },

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
