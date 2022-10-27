const mongoose = require("mongoose");

const jobOfferSchema = new mongoose.Schema({});

module.exports = mongoose.model("JobOffer", jobOfferSchema);
