const mongoose = require("mongoose");

const salesRecordSchema = mongoose.Schema(
  {
    date: {
      type: String,
    },
    name: {
      type: String,
    },
    totalExpense: {
      type: Number,
    },

    totalSales: {
      type: Number,
    },

    submittedBy: {
      type: String,
    },

    profit: {
      type: Number,
    },

    hub: {
      type: mongoose.Types.ObjectId,
      ref: "hubs",
    },

    company: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("salesRecords", salesRecordSchema);
