const express = require("express");
const {
  createSalesRecord,
  deleteSalesRecord,
  getSalesRecordInfo,
  getSalesRecords,
} = require("../controller/salesRecordController");
const router = express.Router();

router.route("/:id/:staffID/create").post(createSalesRecord);
router.route("/:id/:salesID").get(getSalesRecordInfo);
router.route("/:id/sales").get(getSalesRecords);
router.route("/:id/:salesID").delete(deleteSalesRecord);

module.exports = router;
