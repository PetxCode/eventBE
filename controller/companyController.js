const companySchema = require("../model/company");
const jwt = require("jsonwebtoken");
const streamifier = require("streamifier");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const cloudinary = require("../util/cluodinary");

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

    const token = await jwt.sign(genNumb, "This_istheBest");

    await companySchema.create({
      name,
      logo: image.secure_url,
      vision,
      status: admin,
      email,
      password: hashData,
      verifiedToken: token,
    });

    return res.status(201).json({
      message: "Account created",
    });
  } catch (err) {
    return res.status(404).json({
      message: err,
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
      message: err,
    });
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
};
