const express = require("express");
const {
  createStaff,
  getStaffs,
  getStaffInfo,
  deleteStaff,
  verifiedStaff,
  staffSignin,
} = require("../controller/staffController");
const upload = require("../util/multer");
const router = express.Router();

router.route("/create").post(upload, createStaff);

router.route("/:id").get(getStaffInfo);
router.route("/:id/company").get(getStaffs);

router.route("/signin").post(staffSignin);

router.route("/:id/verify").get(verifiedStaff);

router.route("/:id/:staffID").delete(staffSignin);

module.exports = router;
