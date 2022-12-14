const router = require("express").Router();
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require("otp-generator");

const User = require("../models/user.model");
const { Otp } = require("../models/otpModel");

router.post("/signup", async (req, res) => {
  const user = await User.findOne({
    number: req.body.number,
  });
  if (user) {
    return res.status(400).send("User already Registred!");
  }

  const OTP = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const number = req.body.number;

  const greenwebsms = new URLSearchParams();
  greenwebsms.append("token", "05fa33c4cb50c35f4a258e85ccf50509");
  greenwebsms.append("to", `+${number}`);
  greenwebsms.append("message", `Verification Code ${OTP}`);
  axios
    .post("http://api.greenweb.com.bd/api.php", greenwebsms)
    .then((response) => {
      console.log(response.data);
    });

  const otp = new Otp({ number: number, otp: OTP });

  const salt = await bcrypt.genSalt(10);
  otp.otp = await bcrypt.hash(otp.otp, salt);

  const result = await otp.save();
  return res.status(200).send({ status: "success", otp: OTP });
});

router.post("/signup/verify", async (req, res) => {
  const otpHolder = await Otp.find({
    number: req.body.number,
  });
  if (otpHolder.length === 0) {
    return res.status(404).send("You have used Expired OTP!");
  }

  const rightOtpFind = otpHolder[otpHolder.length - 1];
  const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

  if (rightOtpFind.number === req.body.number && validUser) {
    const user = new User(_.pick(req.body, ["number"]));
    const token = user.generateJWT();
    const result = await user.save();
    const OTPDelete = await Otp.deleteMany({
      number: rightOtpFind.number,
    });

    return res.status(200).send({
      message: "User Registration Successfull!",
      token: token,
      data: result,
    });
  } else {
    return res.status(400).send("Your OTP was wrong");
  }
});

module.exports = router;
