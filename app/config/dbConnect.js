const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  await mongoose
    .connect(process.env.DB)
    .then(() => console.log("Database connected!"))
    .catch((err) => console.error(`Failed to connect database: ${err}`));
};

dbConnect();
