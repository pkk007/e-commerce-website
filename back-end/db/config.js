const mongoose = require("mongoose");
const dotenv = require("dotenv");

//dotenv conig
dotenv.config();

mongoose.connect(
  `mongodb+srv://kamtiprabhat:${process.env.password}@ecom.pbxargf.mongodb.net/ecom?retryWrites=true&w=majority`
);
