const mongoose = require("mongoose");

const newURL =
  "mongodb+srv://AuthClass:AuthClass@codelab.u4drr.mongodb.net/VotersDB?retryWrites=true&w=majority";

const url = "mongodb://localhost/eventDB";

mongoose.connect(url, () => {
  console.log("database is now connected...!");
});

module.export = mongoose;
