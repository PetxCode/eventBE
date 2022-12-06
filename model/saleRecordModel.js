const mongoose = require("mongoose");

const salesRecordSchema = mongoose.Schema(
  {
    date: {
      type: String,
    },

    hubName: {
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

    note: {
      type: String,
    },

    dated: {
      type: String,
    },

    month: {
      type: String,
    },

    detail: {
      type: Array,
    },

    image: {
      type: String,
    },

    profit: {
      type: Number,
    },

    hub: {
      type: mongoose.Types.ObjectId,
      ref: "hubs",
    },

    staff: {
      type: mongoose.Types.ObjectId,
      ref: "staffs",
    },

    company: {
      type: mongoose.Types.ObjectId,
      ref: "companies",
    },

    // company: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("salesRecords", salesRecordSchema);
