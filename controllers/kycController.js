const Kyc = require("../models/Kyc");
const User = require("../models/User");

// ==============================================
// 1. SUBMIT KYC  (User)
//    POST /api/kyc/submit
//    Body: multipart/form-data
//    Fields: documentType, documentNumber, documentImage, selfieImage
// ==============================================
exports.submitKyc = async (req, res) => {
  try {
    const { documentType, documentNumber } = req.body;

    // ── Check files uploaded ──────────────────────────────────────────
    if (!req.files || !req.files.documentImage || !req.files.selfieImage) {
      return res.status(400).json({ message: "Document image and selfie are required" });
    }

    // ── Validation ────────────────────────────────────────────────────
    if (!documentType || !documentNumber) {
      return res.status(400).json({ message: "Document type and number are required" });
    }

    const documentImage = req.files.documentImage[0].path;
    const selfieImage   = req.files.selfieImage[0].path;

    // ── Check if KYC already submitted ───────────────────────────────
    const existing = await Kyc.findOne({ userId: req.userId });

    if (existing) {
      if (existing.status === "pending") {
        return res.status(400).json({ message: "KYC already submitted and is under review" });
      }
      if (existing.status === "approved") {
        return res.status(400).json({ message: "KYC already approved" });
      }

      // if rejected → allow resubmission
      existing.documentType   = documentType;
      existing.documentNumber = documentNumber;
      existing.documentImage  = documentImage;
      existing.selfieImage    = selfieImage;
      existing.status         = "pending";
      existing.rejectionReason = null;
      existing.reviewedBy     = null;
      existing.reviewedAt     = null;
      await existing.save();

      await User.findByIdAndUpdate(req.userId, { kycStatus: "pending" });

      return res.status(200).json({ message: "KYC resubmitted successfully", kyc: existing });
    }

    // ── Create new KYC ────────────────────────────────────────────────
    const kyc = await Kyc.create({
      userId: req.userId,
      documentType,
      documentNumber,
      documentImage,
      selfieImage
    });

    // ── Update user kycStatus ─────────────────────────────────────────
    await User.findByIdAndUpdate(req.userId, { kycStatus: "pending" });

    res.status(201).json({
      message: "KYC submitted successfully",
      kyc: {
        id:             kyc._id,
        documentType:   kyc.documentType,
        documentNumber: kyc.documentNumber,
        status:         kyc.status,
        submittedAt:    kyc.createdAt
      }
    });

  } catch (err) {
    console.error("KYC SUBMIT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ==============================================
// 2. GET MY KYC STATUS  (User)
//    GET /api/kyc/status
// ==============================================
exports.getMyKyc = async (req, res) => {
  try {
    const kyc = await Kyc.findOne({ userId: req.userId });

    if (!kyc) {
      return res.status(404).json({
        status: "not_submitted",
        message: "KYC not submitted yet"
      });
    }

    // ── Response matches UI screens ───────────────────────────────────
    res.json({
      status:          kyc.status,           // pending / approved / rejected
      documentType:    kyc.documentType,
      documentNumber:  kyc.documentNumber,
      rejectionReason: kyc.rejectionReason,  // shown on KYC Failed screen
      submittedAt:     kyc.createdAt,
      reviewedAt:      kyc.reviewedAt,

      // checklist for "Under Review" screen
      checklist: {
        accountCreated:    "Completed",
        documentsUploaded: "Completed",
        kycVerification:   kyc.status === "approved" ? "Completed" : kyc.status === "rejected" ? "Failed" : "Pending",
        walletActivated:   kyc.status === "approved" ? "Completed" : "Pending"
      }
    });

  } catch (err) {
    console.error("GET KYC ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ==============================================
// 3. GET ALL KYC  (Admin)
//    GET /api/kyc/admin/all
//    Optional: ?status=pending
// ==============================================
exports.getAllKyc = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const kycList = await Kyc.find(filter)
      .populate("userId", "name email mobile")
      .sort({ createdAt: -1 });

    res.json({
      total: kycList.length,
      kyc: kycList
    });

  } catch (err) {
    console.error("GET ALL KYC ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ==============================================
// 4. GET SINGLE KYC  (Admin)
//    GET /api/kyc/admin/:kycId
// ==============================================
exports.getKycById = async (req, res) => {
  try {
    const kyc = await Kyc.findById(req.params.kycId)
      .populate("userId", "name email mobile");

    if (!kyc) {
      return res.status(404).json({ message: "KYC not found" });
    }

    res.json(kyc);

  } catch (err) {
    console.error("GET KYC BY ID ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ==============================================
// 5. APPROVE KYC  (Admin)
//    PUT /api/kyc/admin/approve/:kycId
// ==============================================
exports.approveKyc = async (req, res) => {
  try {
    const kyc = await Kyc.findById(req.params.kycId);

    if (!kyc) {
      return res.status(404).json({ message: "KYC not found" });
    }

    if (kyc.status === "approved") {
      return res.status(400).json({ message: "KYC already approved" });
    }

    kyc.status      = "approved";
    kyc.reviewedBy  = "admin";
    kyc.reviewedAt  = new Date();
    kyc.rejectionReason = null;
    await kyc.save();

    await User.findByIdAndUpdate(kyc.userId, { kycStatus: "approved" });

    res.json({ message: "KYC approved successfully", kyc });

  } catch (err) {
    console.error("APPROVE KYC ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ==============================================
// 6. REJECT KYC  (Admin)
//    PUT /api/kyc/admin/reject/:kycId
// ==============================================
exports.rejectKyc = async (req, res) => {
  try {
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ message: "Rejection reason is required" });
    }

    const kyc = await Kyc.findById(req.params.kycId);

    if (!kyc) {
      return res.status(404).json({ message: "KYC not found" });
    }

    if (kyc.status === "approved") {
      return res.status(400).json({ message: "Cannot reject an already approved KYC" });
    }

    kyc.status          = "rejected";
    kyc.rejectionReason = reason;  // shown on "KYC Failed" screen
    kyc.reviewedBy      = "admin";
    kyc.reviewedAt      = new Date();
    await kyc.save();

    await User.findByIdAndUpdate(kyc.userId, { kycStatus: "rejected" });

    res.json({ message: "KYC rejected", kyc });

  } catch (err) {
    console.error("REJECT KYC ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
