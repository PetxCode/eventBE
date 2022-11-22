const companySchema = require("../model/company");

export const getCompany = async (req, res) => {
  try {
    const company = await companySchema.find();
    return res.status(200).json({
      message: "view all Companies",
      data: company,
    });
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

export const getSingleCompany = async (req, res) => {
  try {
    const company = await companySchema.findById(req.params.id);
    return res.status(200).json({
      message: "view single Companies",
      data: company,
    });
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

export const removeCompany = async (req, res) => {
  try {
    const company = await companySchema.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: " Company deleted",
      data: company,
    });
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { vision } = req.body;
    const company = await companySchema.findByIdAndUpdate(
      req.params.id,
      {
        vision,
      },
      { new: true }
    );
    return res.status(200).json({
      message: " Company updated",
      data: company,
    });
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

export const createCompany = async (req, res) => {
  try {
    const { vision, email, password } = req.body;

    const user = await companySchema.findOne({ email });
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};
