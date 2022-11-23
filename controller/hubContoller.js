const companyModel = require("../model/company");
const hubModel = require("../model/hubModel");
const staffModel = require("../model/staffModel");
const crypto = require("crypto");
const mongoose = require("mongoose");

const getHubs = async (req, res) => {
  try {
    const hub = await companyModel.findById(req.params.id).populate({
      path: "hub",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({
      message: `These are your hubs' profile`,
      data: hub,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const getHubInfo = async (req, res) => {
  try {
    const staff = await hubModel.findById(req.params.id);

    return res.status(200).json({
      message: `this is ${staff.userName} profile`,
      data: staff,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const createHub = async (req, res) => {
  try {
    const { name } = req.body;

    const company = await companyModel.findById(req.params.id);
    const getToken = crypto.randomBytes(2).toString("hex");

    const hub = await hubModel.create({
      name,
      hubToken: getToken,
    });
    company.hub.push(mongoose.Types.ObjectId(hub._id));
    company.save();

    return res.json({
      message: `hub has been created`,
      data: hub,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const deleteHub = async (req, res) => {
  try {
    const company = await companyModel.findById(req.params.id);

    const hub = await hubModel.findByIdAndDelete(req.params.hubID);

    company.staff.pull(mongoose.Types.ObjectId(hub._id));
    company.save();

    return res.json({
      message: `Hub has been deleted`,
      data: company,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

module.exports = {
  createHub,
  deleteHub,
  getHubInfo,
  getHubs,
};
