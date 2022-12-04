const mongoose = require("mongoose");

const staffHubSchema = mongoose.Schema(
  {
    HubName: {
      type: String,
    },

    date: {
      type: String,
    },

    staffName: {
      type: String,
    },

    id: {
      type: String,
    },

    staffImage: {
      type: String,
    },

    token: {
      type: String,
    },

    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "staffs",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("staffHubs", staffHubSchema);
