const companySchema = require("../model/company");
const jwt = require("jsonwebtoken");
const streamifier = require("streamifier");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const cloudinary = require("../util/cluodinary");

const {
  verifiedCompanyMail,
  verifiedTokenMail,
  resetCompanyMyPassword,
} = require("../util/email");

const getCompany = async (req, res) => {
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

const getSingleCompany = async (req, res) => {
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

const removeCompany = async (req, res) => {
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

const updateCompany = async (req, res) => {
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

const createCompany = async (req, res) => {
  try {
    const { name, vision, email, password } = req.body;

    const saltData = await bcrypt.genSalt(10);
    const hashData = await bcrypt.hash(password, saltData);

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

    const genNumb = crypto.randomBytes(10).toString("hex");
    const token = jwt.sign(genNumb, "This_istheBest");

    const company = await companySchema.create({
      name,
      logo: image.secure_url,
      vision,
      status: "admin",
      email,
      password: hashData,
      verifiedToken: token,
    });

    verifiedCompanyMail(company).then((result) => {
      console.log("sent: ", result);
    });

    return res.status(201).json({
      message: "Account created",
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

const verifiedCompany = async (req, res) => {
  try {
    const company = await companySchema.findById(req.params.id);
    const genNumb = crypto.randomBytes(2).toString("hex");
    if (company) {
      if (company.verifiedToken !== "") {
        await companySchema.findByIdAndUpdate(
          req.params.id,
          {
            verifiedToken: "",
            verified: true,
            companyToken: genNumb,
          },
          { new: true }
        );

        verifiedTokenMail(company);

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

const signinCompany = async (req, res) => {
  try {
    const { password, name } = req.body;

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
            "this is the Word"
          );

          return res.status(200).json({
            message: `welcome back ${user.name}`,
            data: token,
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
      message: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await companySchema.findOne({ name });

    if (user) {
      if (user?.verified && user?.verifiedToken === "") {
        const token = crypto.randomBytes(5).toString("hex");
        const myToken = jwt.sign({ token }, "ThisIsAEventApp");

        const newUser = await companySchema.findByIdAndUpdate(
          user._id,
          {
            verifiedToken: myToken,
          },
          { new: true }
        );

        resetCompanyMyPassword(newUser);

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
    return res
      .status(404)
      .json({ message: `An Error Occur: ${error.message}` });
  }
};

const changePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await companySchema.findById(req.params.id);
    if (user) {
      if (user.verified && user.verifiedToken === req.params.token) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        await companySchema.findByIdAndUpdate(
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
    return res
      .status(404)
      .json({ message: `An Error Occur: ${error.message}` });
  }
};

module.exports = {
  getCompany,
  getSingleCompany,
  removeCompany,
  updateCompany,
  createCompany,
  verifiedCompany,
  signinCompany,
  resetPassword,
  changePassword,
};
