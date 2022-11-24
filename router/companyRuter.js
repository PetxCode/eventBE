const express = require("express");
const {
  getCompany,
  getSingleCompany,
  removeCompany,
  updateCompany,
  createCompany,
  verifiedCompany,
  signinCompany,
} = require("../controller/companyController");
const { uploader, upload } = require("../util/multer");
const router = express.Router();

router.route("/").get(getCompany);
router.route("/:id").get(getSingleCompany);
router.route("/:id").delete(removeCompany);
router.route("/:id").patch(updateCompany);

router.route("/create").post(uploader, createCompany);

router.route("/:id/verify").get(verifiedCompany);
router.route("/signin").post(signinCompany);
module.exports = router;
