import api from "./Axios";

// ─── Auth ────────────────────────────────────────────────────────────────────
export const loginAdmin = (email, password) =>
  api.post("/api/admin/auth/login", { email, password });

export const changePassword = (currentPassword, newPassword) =>
  api.patch("/api/admin/auth/change-password", { currentPassword, newPassword });

export const getAllAdmins = () =>
  api.get("/api/admin/auth/all-admins");

export const createSubAdmin = (data) =>
  api.post("/api/admin/auth/create-admin", data);

export const revokeAdminAccess = (adminId) =>
  api.patch(`/api/admin/auth/revoke-admin/${adminId}`);

export const updateAdminRole = (adminId, adminRole) =>
  api.patch(`/api/admin/auth/update-admin-role/${adminId}`, { adminRole });

// ─── Users ───────────────────────────────────────────────────────────────────
// GET /api/admin/auth/users
// Response: { success, total, verified, pending,
//             users: [{ _id, name, email, mobile, kycVerified, createdAt, role }] }
export const getAllUsers = () =>
  api.get("/api/admin/auth/users");

// ─── KYC ─────────────────────────────────────────────────────────────────────
export const getDashboardStats = () =>
  api.get("/api/admin/kyc/dashboard-stats");

export const getAllSubmissions = () =>
  api.get("/api/admin/kyc/all-submissions");

export const getPendingReviews = () =>
  api.get("/api/admin/kyc/pending-reviews");

export const searchUserKYC = (query) =>
  api.get("/api/admin/kyc/search-user", { params: { query } });

export const getSubmissionDetails = (kycId) =>
  api.get(`/api/admin/kyc/submission-details/${kycId}`);

export const approveKYC = (kycId) =>
  api.patch(`/api/admin/kyc/approve-verification/${kycId}`);

export const rejectKYC = (kycId, reason) =>
  api.patch(`/api/admin/kyc/reject-verification/${kycId}`, { reason });

export const bulkApproveKYC = (kycIds) =>
  api.patch("/api/admin/kyc/bulk-approve", { kycIds });

export const bulkRejectKYC = (kycIds, reason) =>
  api.patch("/api/admin/kyc/bulk-reject", { kycIds, reason });

export const deleteKYCRecord = (kycId) =>
  api.delete(`/api/admin/kyc/delete-record/${kycId}`);

export const getAuditLog = () =>
  api.get("/api/admin/kyc/audit-log");

// ─── Dashboard Widget Stats ───────────────────────────────────────────────────
// GET /api/admin/stats/widgets
// Expected response:
//   { success, totalTransactions, payoInCirculation, referralRewardsDistributed }
//
// TODO (backend team): Create this endpoint with adminAuth middleware.
//   It should aggregate:
//     - totalTransactions:           Transaction.countDocuments({})
//     - payoInCirculation:           Wallet.aggregate sum of all walletBalance fields
//     - referralRewardsDistributed:  Referral.aggregate sum of all reward amounts
export const getDashboardWidgetStats = () =>
  api.get("/api/admin/stats/widgets");

// ─── Bank (user-scoped — admin bank endpoint not yet available) ───────────────
// /api/bank/all-banks uses user-level auth and returns only the calling user's
// banks — it cannot return all users' banks from the admin portal.
// TODO (backend team): Add GET /api/admin/bank/all-banks with adminAuth middleware
//   that does: Bank.find({}).populate("userId","name mobile email")
//   This will unlock the bank details section in the Users page modal.