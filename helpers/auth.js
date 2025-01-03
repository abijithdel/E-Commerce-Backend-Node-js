const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const Mail = require("../config/nodemailer");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


function Signup(email, password, cpassword) {
  return new Promise(async (resolve, reject) => {
    try {
      if(!isValidEmail(email)){
        resolve({status:false,message:'Enter Email'})
      }
      const user = await UserModel.findOne({ email: email });
      if (user) {
        return resolve({
          status: false,
          message: `User Already Exists With This Email: ${email}`,
        });
      }

      if (password !== cpassword) {
        return resolve({
          status: false,
          message: `Check Confirm Password: ${cpassword}`,
        });
      }

      const hashpass = await bcrypt.hash(password, 10);

      const NewUser = new UserModel({
        email: email,
        password: hashpass,
      });
      await NewUser.save();
      resolve({
        status: true,
        message: "Successfully Created Account",
        NewUser,
      });
      Mail.sendMail({
        from: "alert@digishopper.shop",
        to: email,
        subject: "Welcome to Digishopper",
        text: `Hello ${email}, 

          Thank you for joining Digishopper! We're excited to have you as part of our community. 

          At Digishopper, we strive to bring you the best shopping experience with a wide variety of products and unbeatable deals. Here's what you can do next:
          - Explore our latest collections
          - Add your favorite items to your cart
          - Enjoy exclusive discounts as a valued member

          If you have any questions or need assistance, don't hesitate to contact us at support@digishopper.shop.

          Happy shopping!

          Best regards,
          The Digishopper Team`,
      });
    } catch (error) {
      console.log(error);
      reject({ message: "Server Error", error: error.message });
    }
  });
}

function Signin(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await UserModel.findOne({ email: email });

      if (!user) {
        return resolve({ status: false, message: `User Not Found: ${email}` });
      }

      const result = await bcrypt.compare(password, user.password);

      if (!result) {
        return resolve({ status: false, message: "Incorrect Password" });
      }

      resolve({ status: true, message: "Successfully Login", user });
    } catch (error) {
      console.log(error);
      reject({ message: "Server Error", error: error.message });
    }
  });
}

module.exports = { Signup, Signin };
