const mongoose = require("mongoose");

require("dotenv").config();

const newURL = process.env.DB;

const url = "mongodb://localhost/eventDB";

mongoose.connect(newURL, () => {
  console.log("database is now connected...!");
});

module.export = mongoose;
