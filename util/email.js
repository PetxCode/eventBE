const ejs = require("ejs");
const path = require("path");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
// Changing Items

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "1001238833498-cqm9f9c1mh3m1khppm3392npjalj8b4s.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
  "1//04h7d93kXEa_mCgYIARAAGAQSNwF-L9IrRBMf9gTPHHPp4rsWwU2m6arOFmIUgpZPaL-Cov37TXIF6SM2XIoFhScTFOD1ZDaezBY";

// Again // External Items

// const GOOGLE_SECRET = "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";
// const GOOGLE_ID =
//   "922981826695-rviuikdrd4rk1kbsake7iusml8qb2ibc.apps.googleusercontent.com";
// const GOOGLE_REFRESHTOKEN =
//   "1//04C7dWmo7YblKCgYIARAAGAQSNwF-L9IrEt7Td5GJtrIEB-g_xad5nm-lvt6tP-RxNPBAoaHu0q1jNXf8c20Bsv89GRyec94Gri4";

// Constant
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

const verifiedCompanyMail = async (company) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Gideonekeke64@gmail.com",
        pass: "sgczftichnkcqksx",
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
      from: "Event ❤❤❤ <newstudentsportal2@gmail.com>",
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
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Gideonekeke64@gmail.com",
        pass: "sgczftichnkcqksx",
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
      from: "Event ❤❤❤ <newstudentsportal2@gmail.com>",
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
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Gideonekeke64@gmail.com",
        pass: "sgczftichnkcqksx",
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
      from: "Event ❤❤❤ <newstudentsportal2@gmail.com>",
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
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Gideonekeke64@gmail.com",
        pass: "sgczftichnkcqksx",
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
      from: "Event ❤❤❤ <newstudentsportal2@gmail.com>",
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
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Gideonekeke64@gmail.com",
        pass: "sgczftichnkcqksx",
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
      from: "Event ❤❤❤ <newstudentsportal2@gmail.com>",
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
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });
    const myTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Gideonekeke64@gmail.com",
        pass: "sgczftichnkcqksx",
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
      from: "AJ Vote ❤❤❤  <newstudentsportal2@gmail.com>",
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
};
