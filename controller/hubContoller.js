const companyModel = require("../model/company");
const hubModel = require("../model/hubModel");
const staffModel = require("../model/staffModel");
const crypto = require("crypto");
const mongoose = require("mongoose");
const { assignedToken } = require("../util/email");

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
    const { token } = req.body;

    const hub = await hubModel.findById(req.params.id);
    if (hub.hubToken === token) {
      return res.status(200).json({
        message: `this is ${hub.name} profile`,
        data: hub,
      });
    } else {
      return res.status(404).json({
        message: "Token is not correct",
      });
    }
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const resetHubToken = async (req, res) => {
  try {
    const company = await companyModel.findById(req.params.id);
    if (company) {
      const newToken = crypto.randomBytes(2).toString("hex");
      const hub = await hubModel.findByIdAndUpdate(
        req.params.hubID,
        {
          hubToken: newToken,
        },
        { new: true }
      );

      return res.status(200).json({
        message: `token to asset Hub has been changed`,
        data: hub,
      });
    }
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
      company,
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

    company.hub.pull(mongoose.Types.ObjectId(hub._id));
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

const assignHub = async (req, res) => {
  try {
    const { userName } = req.body;
    const company = await companyModel.findById(req.params.id);
    const staff = await staffModel.findOne({ userName });
    if (company.name === staff.companyName) {
      const hub = await hubModel.findByIdAndUpdate(
        req.params.hubID,
        {
          staff: userName,
        },
        { new: true }
      );

      assignedToken(hub, staff, company);
      return res.status(200).json({
        message: `Hub has been assigned to ${staff.userName} to report revenue records`,
      });
    } else {
      return res.status(404).json({
        message:
          "No Staff Found in your company bearing such Name, please try again!",
      });
    }
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
  resetHubToken,
  assignHub,
};
