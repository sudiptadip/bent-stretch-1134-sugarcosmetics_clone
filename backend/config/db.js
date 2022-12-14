const mongoose = require("mongoose");

const connection = async () => {
  await mongoose.connect(
    MONGO_URL
  );
  console.log("Connection done");
};

module.exports = connection;
