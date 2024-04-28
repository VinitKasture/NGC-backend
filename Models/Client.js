const mongoose = require("mongoose");

const InstallmentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  feesPaid: {
    type: [InstallmentSchema],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Client", ClientSchema);
