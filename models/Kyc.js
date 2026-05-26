const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    // ── Document Details ──────────────────────────────────────────────
    documentType: {
      type: String,
      enum: ["Aadhaar", "PAN Card", "Passport"],
      required: true
    },

    documentNumber: {
      type: String,
      required: true
    },

    // ── Uploaded Files ────────────────────────────────────────────────
    documentImage: {
      type: String,   // file path
      required: true
    },

    selfieImage: {
      type: String,   // file path
      required: true
    },

    // ── KYC Status ────────────────────────────────────────────────────
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    rejectionReason: {
      type: String,
      default: null
    },

    reviewedBy: {
      type: String,
      default: null
    },

    reviewedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Kyc", kycSchema);
