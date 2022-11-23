const express = require("express");
const cors = require("cors");
const app = express();
const port = 2233;
require("./util/db");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Let's do this...!",
  });
});

app.use("/api/company", require("./router/companyRuter"));
app.use("/api/staff", require("./router/staffRouter"));
app.use("/api/hub", require("./router/hubRouter"));
app.use("/api/sales", require("./router/salesRecordRoute"));

app.listen(port, () => {
  console.log("");
  console.log("Let's do this...!");
  console.log("");
});
