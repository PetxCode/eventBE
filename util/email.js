const ejs = require("ejs");
const path = require("path");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
const GOOGLE_ID = process.env.GOOGLE_ID;

const GOOGLE_REFRESHTOKEN = process.env.GOOGLE_REFRESHTOKEN;

const GOOGLE_REDIRECT = process.env.GOOGLE_REDIRECT;

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

const verifiedCompanyMail = async (company) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER1,
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const buildFile = path.join(__dirname, "../views/AccountCreated.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: company.name,
      id: company?._id,
      realToken: company.verifiedToken,
      code: company.companyToken,
      logo: company.logo,
      url: "http://localhost:2233/api/company",
    });

    const mailOptions = {
      from: "smallReport ❤❤❤ <smallreportapp@gmail.com>",
      to: company.email,
      subject: "Account Verification",
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

const verifiedTokenMail = async (company) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER1,
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const buildFile = path.join(__dirname, "../views/companyAccToken.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: company.name,
      id: company?._id,
      code: company.companyToken,
      logo: company.logo,
      url: "http://localhost:2233/api/company",
    });

    const mailOptions = {
      from: "smallReport ❤❤❤ <smallreportapp@gmail.com>",
      to: company.email,
      subject: "Account Secret Token",
      html: data,
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};

const verifiedStaffMail = async (user, company) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER1,
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const buildFile = path.join(__dirname, "../views/staffMail.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: user.userName,
      companyName: user.companyName,
      id: user?._id,
      realToken: company.verifiedToken,
      code: company.companyToken,
      logo: company.logo,
      url: "http://localhost:2233/api/staff",
    });

    const mailOptions = {
      from: "smallReport ❤❤❤ <smallreportapp@gmail.com>",
      to: user.email,
      subject: "Account Verification",
      html: data,
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};

const verifiedStaffMailTOAdmin = async (user, company) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER1,
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const buildFile = path.join(__dirname, "../views/accountActivation.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: user.userName,
      companyName: user.companyName,
      id: user?._id,
      realToken: user.verifiedToken,
      code: user.staffToken,
      logo: company.logo,
      url: "http://localhost:2233/api/staff",
    });

    const mailOptions = {
      from: "smallReport ❤❤❤ <smallreportapp@gmail.com>",
      to: company.email,
      subject: "Account Verification",
      html: data,
    };
    console.log("Company: ", company, "User: : ", user);
    transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};

const verifiedStaffFromAdmin = async (user, company) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER1,
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const buildFile = path.join(__dirname, "../views/staffApproval.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: user.userName,
      companyName: user.companyName,
      id: user?._id,
      realToken: user.verifiedToken,
      code: user.staffToken,
      logo: company.logo,
      url: "http://localhost:2233/api/staff",
    });

    const mailOptions = {
      from: "smallReport ❤❤❤ <smallreportapp@gmail.com>",
      to: company.email,
      subject: "Account Verification",
      html: data,
    };
    console.log("Company: ", company, "User: : ", user);
    transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};

const resetMyPassword = async (newUser, company) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER1,
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });
    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const buildFile = path.join(__dirname, "../views/resetPassword.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: newUser.userName,
      id: newUser?._id,
      myToken: newUser.verifiedToken,
      url: "http://localhost:2233/api/staff",
      logo: company.logo,
    });

    const mailOptions = {
      from: "smallReport ❤❤❤  <smallreportapp@gmail.com>",
      to: newUser?.email,
      subject: "Requesting for Password Reset",
      html: data,
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};

const resetCompanyMyPassword = async (newUser) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER1,
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });
    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const buildFile = path.join(__dirname, "../views/resetPassword.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: newUser.nameame,
      id: newUser?._id,
      myToken: newUser.verifiedToken,
      url: "http://localhost:2233/api/company",
      logo: newUser.logo,
    });

    const mailOptions = {
      from: "smallReport ❤❤❤  <smallreportapp@gmail.com>",
      to: newUser?.email,
      subject: "Requesting for Password Reset",
      html: data,
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};

module.exports = {
  verifiedCompanyMail,
  verifiedTokenMail,
  verifiedStaffMail,
  verifiedStaffMailTOAdmin,
  verifiedStaffFromAdmin,
  resetMyPassword,
  resetCompanyMyPassword,
};
