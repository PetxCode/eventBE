const companyModel = require("../model/company");
const hubModel = require("../model/hubModel");
const staffModel = require("../model/staffModel");
const salesRecordModel = require("../model/saleRecordModel");
const reportHistoryModel = require("../model/reportHistoryModel");
const mongoose = require("mongoose");
const moment = require("moment");

// import datetime
// import pymongo
// client = pymongo.MongoClient()
// db = client.test_Db
// server_time = db.command("serverStatus")['localTime']

const getAllSalesRecords = async (req, res) => {
  try {
    // const hubData = await hubModel.findById(req.params.hubID);
    // const name = hubData.

    const sales = await companyModel.findById(req.params.id).populate({
      path: "salesRecord",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({
      message: `All sales record`,
      data: sales,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const getStaffSalesRecords = async (req, res) => {
  try {
    const staff = await staffModel.findById(req.params.id).populate({
      path: "salesRecord",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({
      message: `These are your salesRecord profile`,
      data: staff,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const getSalesRecords = async (req, res) => {
  try {
    const hub = await hubModel.findById(req.params.id).populate({
      path: "salesRecord",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({
      message: `These are your hubs' salesRecord profile`,
      data: hub,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const getSalesRecordInfo = async (req, res) => {
  try {
    const sales = await salesRecordModel.findById(req.params.id);
    // .populate({

    // })

    return res.status(200).json({
      message: `this is the sales Record`,
      data: sales,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const createSalesRecord = async (req, res) => {
  try {
    const { totalExpense, totalSales, note, detail } = req.body;

    const user = await staffModel.findById(req.params.staffID);

    const hub = await hubModel.findById(req.params.id);

    const companyIdentity = hub.company;
    const company = await companyModel.findById(companyIdentity);

    const dater = Date.now();

    const sales = await salesRecordModel.create({
      hubName: hub.name,
      totalExpense,
      totalSales,
      profit: totalSales - totalExpense,
      date: `${moment(dater).format("dddd")}, ${moment(dater).format(
        "MMMM Do YYYY, h:mm:ss"
      )}`,
      dated: `${moment(dater).format("dddd")}`,
      submittedBy: user.userName,
      image: user.userImage,
      note,
      detail,
    });

    hub.salesRecord.push(mongoose.Types.ObjectId(sales._id));
    hub.save();

    company.salesRecord.push(mongoose.Types.ObjectId(sales._id));
    company.save();

    user.salesRecord.push(mongoose.Types.ObjectId(sales._id));
    user.save();

    return res.json({
      message: `sales Record has been created`,
      data: sales,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const deleteSalesRecord = async (req, res) => {
  try {
    const hub = await hubModel.findById(req.params.id);

    const sales = await salesRecordModel.findByIdAndDelete(req.params.salesID);

    hub.salesRecord.pull(mongoose.Types.ObjectId(sales._id));
    hub.save();

    return res.json({
      message: `sales record has been deleted`,
      data: hub,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const createHubSales = async (req, res) => {
  try {
    const user = await staffModel.findById(req.params.staffID);
    const hubData = await hubModel.findById(req.params.id);

    const companyIdentity = hubData.company;
    const companyData = await companyModel.findById(companyIdentity);

    const dater = Date.now();

    await reportHistoryModel.create({
      totalExpense,
      totalSales,
      profit: totalSales - totalExpense,
      date: `${moment(dater).format("dddd")}, ${moment(dater).format(
        "MMMM Do YYYY, h:mm:ss"
      )}`,
      submittedBy: user.userName,
      // company: company.name,
    });

    const sales = await salesRecordModel.create({
      hubName: hub.name,
      totalExpense,
      totalSales,
      profit: totalSales - totalExpense,
      date: `${moment(dater).format("dddd")}, ${moment(dater).format(
        "MMMM Do YYYY, h:mm:ss"
      )}`,

      submittedBy: user.userName,
      company: company.name,
    });

    hubData.salesRecord.push(mongoose.Types.ObjectId(sales._id));
    hubData.save();

    companyData.history.push(mongoose.Types.ObjectId(sales._id));
    companyData.save();

    user.history.push(mongoose.Types.ObjectId(sales._id));
    user.save();

    return res.json({
      message: `sales Record has been created`,
      data: sales,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

module.exports = {
  createSalesRecord,
  deleteSalesRecord,
  getSalesRecordInfo,
  getSalesRecords,
  getAllSalesRecords,
  getStaffSalesRecords,
};
