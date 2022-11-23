const companyModel = require("../model/company");
const hubModel = require("../model/hubModel");
const staffModel = require("../model/staffModel");
const salesRecordModel = require("../model/saleRecordModel");
const reportHistoryModel = require("../model/reportHistoryModel");

const crypto = require("crypto");
const mongoose = require("mongoose");
const moment = require("moment");

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
    const sales = await salesRecordModel.findById(req.params.salesID);

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
    const { totalExpense, totalSales } = req.body;

    const user = await staffModel.findById(req.params.staffID);

    const hub = await hubModel.findById(req.params.id);

    const companyIdentity = hub.company;
    const company = await companyModel.findById(companyIdentity);

    const dater = Date.now();
    console.log(user.userName, company.name);

    await reportHistoryModel.create({
      totalExpense,
      totalSales,
      profit: totalSales - totalExpense,
      date: `${moment(dater).format("dddd")}, ${moment(dater).format(
        "MMMM Do YYYY, h:mm:ss"
      )}`,

      submittedBy: user.userName,
      company: company.name,
    });

    const sales = await salesRecordModel.create({
      totalExpense,
      totalSales,
      profit: totalSales - totalExpense,
      date: `${moment(dater).format("dddd")}, ${moment(dater).format(
        "MMMM Do YYYY, h:mm:ss"
      )}`,

      submittedBy: user.userName,
      company: company.name,
    });

    hub.salesRecord.push(mongoose.Types.ObjectId(sales._id));
    hub.save();

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

module.exports = {
  createSalesRecord,
  deleteSalesRecord,
  getSalesRecordInfo,
  getSalesRecords,
};
