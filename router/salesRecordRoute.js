const express = require("express");
const {
  createSalesRecord,
  deleteSalesRecord,
  getSalesRecordInfo,
  getSalesRecords,
  getAllSalesRecords,
  getStaffSalesRecords,
} = require("../controller/salesRecordController");
const router = express.Router();

router.route("/:id/:staffID/create").post(createSalesRecord);
router.route("/:id/sales").patch(getSalesRecordInfo);

router.route("/:id/saleshistory").patch(getStaffSalesRecords);

router.route("/:id/record").patch(getAllSalesRecords);

router.route("/:id").get(getSalesRecords);

router.route("/:id/:salesID").delete(deleteSalesRecord);

module.exports = router;
