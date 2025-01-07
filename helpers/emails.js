const Mail = require("../config/nodemailer");
const { AlertEmail, Domain } = require("../settings");

function ResetPass(token, email) {
  const resetLink = `http://${Domain}/reset-password/${token}`;
  Mail.sendMail({
    from: AlertEmail,
    to: email,
    subject: "Password Reset Request",
    text: `You requested a password reset. Click on the following link to reset your password: ${resetLink}`,
  });
}


module.exports = { ResetPass }