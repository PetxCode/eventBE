const mongoose = require("mongoose");

const reportHistorySchema = mongoose.Schema(
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

    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "staffs",
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reportHistories", reportHistorySchema);
