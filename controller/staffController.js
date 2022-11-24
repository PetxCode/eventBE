const companyModel = require("../model/company");
const staffModel = require("../model/staffModel");

const streamifier = require("streamifier");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const cloudinary = require("../util/cluodinary");
const mongoose = require("mongoose");
const {
  verifiedStaffMail,
  verifiedStaffMailTOAdmin,
  verifiedStaffFromAdmin,
  resetMyPassword,
} = require("../util/email");

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

const getStaffHistory = async (req, res) => {
  try {
    const staffs = await staffModel.findById(req.params.id).populate({
      path: "history",
      options: { sort: { createdAt: -1 } },
    });

    return res.status(200).json({
      message: `These are your staffs' sales history`,
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
    const genNumb = crypto.randomBytes(10).toString("hex");
    const userToken = jwt.sign(genNumb, "This_istheBest");

    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req?.file.buffer).pipe(stream);
      });
    };
    const image = await streamUpload(req);

    const company = await companyModel.findOne({ name });

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

        company.staff.push(mongoose.Types.ObjectId(user._id));
        company.save();
        verifiedStaffMail(user, company);

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
    const company = await companyModel.findOne({ name: user.companyName });
    const codedNumb = crypto.randomBytes(2).toString("hex");
    if (user) {
      if (user.verifiedToken !== "") {
        const userData = await staffModel.findByIdAndUpdate(
          user._id,
          {
            staffToken: codedNumb,
          },
          { new: true }
        );

        verifiedStaffMailTOAdmin(user, company);

        return res.status(200).json({
          message: `Admin has recieved your request`,
          // data: userData,
        });
      } else {
        return res.status(404).json({
          message: `Error`,
        });
      }
    } else {
      return res.json({
        message: `Error getting User`,
      });
    }
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const VerifiedStaffFinally = async (req, res) => {
  try {
    const { response } = req.body;

    const getUser = await staffModel.findById(req.params.id);
    const company = await companyModel.findOne({ name: getUser.companyName });

    if (response === "Yes") {
      if (getUser) {
        await staffModel.findByIdAndUpdate(
          req.params.id,
          {
            verifiedToken: "",
            verified: true,
          },
          { new: true }
        );

        verifiedStaffFromAdmin(getUser, company);

        res.status(201).json({ message: "Sent..." });
        res.end();
      } else {
        return res.status(404).json({
          message: "user doesn't exist",
        });
      }
    } else if (response === "No") {
      if (getUser) {
        const staff = await staffModel.findById(req.params.id);

        const name = staff.companyName;
        const company = await companyModel.findOne({ name });

        company.staff.pull(new mongoose.Types.ObjectId(staff._id));
        company.save();

        await staffModel.findByIdAndDelete(req.params.id);
        return res.status(201).json({ message: "staff has been deleted" });
      }
    } else {
      return res.json({ message: "You can't be accepted" });
    }

    res.end();
  } catch (err) {
    return;
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

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await staffModel.findOne({ email });
    const company = await companyModel.findOne({ name: user.companyName });

    if (user) {
      if (user?.verified && user?.verifiedToken === "") {
        const token = crypto.randomBytes(5).toString("hex");
        const myToken = jwt.sign({ token }, "ThisIsAVoteApp");

        await userModel.findByIdAndUpdate(
          user._id,
          {
            verifiedToken: myToken,
          },
          { new: true }
        );

        resetMyPassword(user, company);

        return res.status(200).json({
          message: "Please check your email to continue",
        });
      } else {
        return res
          .status(404)
          .json({ message: "You do not have enough right to do this!" });
      }
    } else {
      return res.status(404).json({ message: "user can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: "An Error Occur " });
  }
};

const changePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await staffModel.findById(req.params.id);
    if (user) {
      if (user.verified && user.token === req.params.token) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        await staffModel.findByIdAndUpdate(
          user._id,
          {
            verifiedToken: "",
            password: hashed,
          },
          { new: true }
        );
      }
    } else {
      return res.status(404).json({ message: "operation can't be done" });
    }

    return res.status(200).json({
      message: "password has been changed",
    });
  } catch (error) {
    return res.status(404).json({ message: "An Error Occur" });
  }
};

module.exports = {
  createStaff,
  getStaffs,
  getStaffInfo,
  deleteStaff,
  verifiedStaff,
  staffSignin,
  getStaffHistory,
  VerifiedStaffFinally,
  resetPassword,
  changePassword,
};
