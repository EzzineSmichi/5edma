const express = require("express");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

mongoose
  .connect(`${process.env.DATA_BASE_URL}`)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
  });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server run on port ${port}`));
