const mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "774bgtumnhnhydscffsr";
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
    },
    password: {
      type: String,
      minLength: 8,
    },
    number: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      number: this.number,
    },
    JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
  return token;
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
