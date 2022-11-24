const mongoose = require("mongoose");

const newURL = process.env.DB;

const url = "mongodb://localhost/eventDB";

mongoose.connect(url, () => {
  console.log("database is now connected...!");
});

module.export = mongoose;
