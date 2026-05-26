const express = require("express");
const router = express.Router();
const kycController = require("../controllers/kycController");
const auth = require("../middleware/auth");
const kycUpload = require("../middleware/kycUpload");

// ── User Routes ───────────────────────────────────────────────────────────────
router.post("/submit", auth, kycUpload, kycController.submitKyc);  // Upload docs + selfie
router.get("/status", auth, kycController.getMyKyc);               // Check KYC status

// ── Admin Routes ──────────────────────────────────────────────────────────────
router.get("/admin/all", kycController.getAllKyc);                  // All KYC list
router.get("/admin/:kycId", kycController.getKycById);             // Single KYC
router.put("/admin/approve/:kycId", kycController.approveKyc);     // Approve
router.put("/admin/reject/:kycId", kycController.rejectKyc);       // Reject

module.exports = router;
