import { info } from "console";

const companySchema = require("../model/company");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcconst bcrypt");

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
    const { name, vision, email, password } = req.body;

    const saltData = await bcrypt.genSalt(10);
    const hashData = await bcrypt.hash(password, saltData);

    const genNumb = crypto.randomBytes(10).toString("hex");

    const token = await jwt.sign(genNumb, "This_istheBest");

    await companySchema.create({
      name,
      vision,
      email,
      password: hashData,
      verifiedToken: token,
    });
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

export const verifiedCompany = async (req, res) => {
  try {
    const company = await companySchema.findById(req.params.id);
    const genNumb = crypto.randomBytes(2).toString("hex");
    if (company) {
      if (company.verifiedToken !== "") {
        await companySchema.findByIdAndUpdate(
          req.params.id,
          {
            verifiedToken: "",
            verifiied: true,
            token: genNumb,
          },
          { new: true }
        );

        return res.status(200).json({
          message: "success: Account has been verified...!",
        });
      }
    }
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

export const signinCompany = async (req, res) => {
  try {
    const { vision, email, password, name } = req.body;

    const user = await companySchema.findOne({ name });

    if (user) {
      if (user.email) {
        const passCheck = await bcrypt.compare(password, user.password);

        if (passCheck) {
          const { password, ...info } = user._doc;
          const token = jwt.sign(
            {
              _id: user._id,
              ...info,
            },
            { secret: "We_are_the_one" }
          );

          return res.status(200).json({
            message: `welcome back ${user.name}`,
          });
        } else {
          return res.status(404).json({
            message: `password isn't correct`,
          });
        }
      } else {
        return res.status(404).json({
          message: `company exist isn't correct`,
        });
      }
    } else {
      return res.status(404).json({
        message: `company doesn't exist`,
      });
    }
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};
