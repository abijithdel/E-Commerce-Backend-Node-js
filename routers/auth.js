const express = require("express");
const route = express.Router();
const {
  Signup,
  Signin,
  ForgotPassword,
  VerifyToken,
} = require("../helpers/auth");

route.post("/signup", (req, res) => {
  const { email, password, cpassword } = req.body;
  Signup(email, password, cpassword)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

route.post("/signin", (req, res) => {
  const { email, password } = req.body;
  Signin(email, password)
    .then((response) => res.json(response))
    .catch((err) => res.json(err.message));
});

route.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  ForgotPassword(email)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

route.post("/verify-token", (req, res) => {
  const { token } = req.body;
  VerifyToken(token)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = route;
