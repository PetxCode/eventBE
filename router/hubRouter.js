const express = require("express");
const {
  createHub,
  deleteHub,
  getHubInfo,
  getHubs,
} = require("../controller/hubContoller");
const router = express.Router();

router.route("/:id/create").post(createHub);
router.route("/:id").get(getHubInfo);
router.route("/:id/hubs").get(getHubs);
router.route("/:id/:hubID").delete(deleteHub);

module.exports = router;
