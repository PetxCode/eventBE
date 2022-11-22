const companyModel = require("../model/company");
const staffModel = require("../model/staffModel");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const cloudinary = require("../util/cluodinary");
const { info } = require("console");
const { getCompany } = require("./companyController");
const mongoose = require("mongoose");

const getStaffs = async (req, res) => {
  try {
    const staffs = await companyModel.findById(req.params.id).populate({
      path: "staff",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({
      message: `These are your staffs' profile`,
      data: staffs,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const getStaffInfo = async (req, res) => {
  try {
    const staff = await staffModel.findById(req.params.id);

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

const createStaff = async (req, res) => {
  try {
    const { name, userName, email, password, token } = req.body;

    const saltData = await bcrypt.genSalt(10);
    const hashData = await bcrypt.hash(password, saltData);
    const image = await cloudinary.uploader.upload(req.file.path);
    const genNumb = crypto.randomBytes(10).toString("hex");
    const userToken = jwt.sign(genNumb, "This_istheBest");

    const company = await companySchema.findOne({ name });
    if (company) {
      if (company.companyToken === token) {
        const user = await staffModel.create({
          userName,
          companyName: company.name,
          email,
          password: hashData,
          verifiedToken: userToken,
          userImage: image.secure_url,
          status: "staff",
        });
        console.log(company);
        company.staff.push(mongoose.Types.ObjectId(user._id));
        company.save();

        return res.json({
          message: `Staff has been created but not yet verified`,
          data: user,
        });
      } else {
        return res.status(404).json({ message: "Token isn't correct" });
      }
    } else {
      return res.status(404).json({ message: "Company dosn't exist" });
    }
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const company = await companySchema.findById(req.params.id);

    const user = await staffModel.findByIdAndDelete(req.params.staffID);

    company.staff.pull(mongoose.Types.ObjectId(user._id));
    company.save();

    return res.json({
      message: `Staff has been deleted`,
      data: company,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const verifiedStaff = async (req, res) => {
  try {
    const user = await staffModel.findById(req.params.id);
    const codedNumb = crypto.randomBytes(2).toString("hex");
    if (user) {
      if (user.verifiedToken === "") {
        await staffModel.findByIdAndUpdate(
          user._id,
          {
            verifiedToken: "",
            verified: true,
            staffToken: codedNumb,
          },
          { new: true }
        );

        return res.status(200).json({
          message: "success: Account has been verified...!",
        });
      }
    }

    return res.json({
      message: `Staff is now verified`,
      data: user,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const staffSignin = async (req, res) => {
  try {
    const { password, name, email } = req.body;

    const user = await staffModel.findOne({ email });

    const companyName = user.companyName;
    const company = await companyModel.findOne({ companyName });

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
            "this is the Word"
          );

          return res.status(200).json({
            message: `welcome back ${user.userName}`,
            data: token,
          });
        } else {
          return res.status(404).json({
            message: `password isn't correct`,
          });
        }
      } else {
        return res.status(404).json({
          message: `user exist isn't correct`,
        });
      }
    } else {
      return res.status(404).json({
        message: `user doesn't exist`,
      });
    }
  } catch (err) {
    return res.status(404).json({
      message: err,
    });
  }
};

module.exports = {
  createStaff,
  getStaffs,
  getStaffInfo,
  deleteStaff,
  verifiedStaff,
  staffSignin,
};
