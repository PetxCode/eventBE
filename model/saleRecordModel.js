const mongoose = require("mongoose");

const salesRecordSchema = mongoose.Schema(
  {
    date: {
      type: String,
    },
    totalExpense: {
      type: Number,
    },

    totalSales: {
      type: Number,
    },

    profit: {
      type: Number,
    },

    hub: {
      type: mongoose.Types.ObjectId,
      ref: "hubs",
    },

    company: {
      type: mongoose.Types.ObjectId(),
      ref: "companies",
    },
  },
  { timestamps: true }
);

exports.module = mongoose.model("salesRecords", salesRecordSchema);
