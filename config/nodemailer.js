const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: "alert@digishopper.shop",
    pass: "5Bbh4wG9G6LB",
  }
});

module.exports = transporter;
