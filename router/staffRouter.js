const express = require("express");
const {
  createStaff,
  getStaffs,
  getStaffInfo,
  deleteStaff,
  verifiedStaff,
  staffSignin,
  getStaffHistory,
} = require("../controller/staffController");
const { uploader } = require("../util/multer");
const router = express.Router();

router.route("/create").post(uploader, createStaff);

router.route("/:id").get(getStaffInfo);
router.route("/:id/gethistory").get(getStaffHistory);

router.route("/:id/company").get(getStaffs);

router.route("/signin").post(staffSignin);

router.route("/:id/verify").get(verifiedStaff);

router.route("/:id/:staffID").delete(deleteStaff);
router.route("/signin").post(staffSignin);

module.exports = router;
