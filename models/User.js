const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true
  },

  mobile: {
    type: String,
    unique: true,
    required: true
  },

  referredBy: {
    type: String,
    default: null
  },

  password: String,

  referralcode: String,

  isVerified: {
    type: Boolean,
    default: false
  },

  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet"
  },

  myReferralCode: {
    type: String
  },

  transactionPin: {
    type: String
  },

  // ── KYC Status ────────────────────────────────────────────────────
  kycStatus: {
    type: String,
    enum: ["not_submitted", "pending", "approved", "rejected"],
    default: "not_submitted"
  }

});

module.exports = mongoose.model("User", userSchema);