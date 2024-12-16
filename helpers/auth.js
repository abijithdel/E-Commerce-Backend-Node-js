const bcrypt = require("bcrypt");
const UserModel = require("../models/user");

function Signup(email, password, cpassword) {
  return new Promise(async (resolve, reject) => {
    try {
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

      const hashpass = await bcrypt.hash(password, 10,);
      
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

      const result  = await bcrypt.compare(password, user.password, )

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
