const express = require("express");
const {
  getCompany,
  getSingleCompany,
  removeCompany,
  updateCompany,
  createCompany,
  verifiedCompany,
  signinCompany,

  resetPassword,
  changePassword,
} = require("../controller/companyController");
const { uploader } = require("../util/multer");
const router = express.Router();

router.route("/").get(getCompany);
router.route("/:id").get(getSingleCompany);
router.route("/:id").delete(removeCompany);
router.route("/:id").patch(updateCompany);

router.route("/create").post(uploader, createCompany);

router.route("/:id/verify").get(verifiedCompany);
router.route("/signin").post(signinCompany);

router.route("/reset").post(resetPassword);
router.route("/:id/:token/reset").post(changePassword);
module.exports = router;
