const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ── Create uploads folder if not exists ──────────────────────────────────────
const uploadDir = "uploads/kyc";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ── Storage config ────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // example: document_1716000000000.jpg
    const prefix = file.fieldname;
    const ext = path.extname(file.originalname);
    cb(null, `${prefix}_${Date.now()}${ext}`);
  }
});

// ── File filter — only images and PDFs ───────────────────────────────────────
const fileFilter = (req, file, cb) => {
  const allowed = [".jpg", ".jpeg", ".png", ".pdf"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG or PDF files are allowed"));
  }
};

// ── Max size: 5MB ─────────────────────────────────────────────────────────────
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// ── Export middleware for 2 fields: documentImage + selfieImage ───────────────
module.exports = upload.fields([
  { name: "documentImage", maxCount: 1 },
  { name: "selfieImage",   maxCount: 1 }
]);
