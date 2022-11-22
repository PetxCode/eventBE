const companySchema = require("../model/company");
const staffModel = require("../model/staffModel");

const createStaff = async (req, res) => {
  try {
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};
