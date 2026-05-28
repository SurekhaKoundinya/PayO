 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
 
const User = require("../models/User");
const Otp = require("../models/Otp");
const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const { sendNotification } = require("../utils/notify");
// ================== POSTGRESQL MODELS ==================
const PostgresUser = require("../models/PostgresUser");
const PostgresWallet = require("../models/PostgresWallet");
const PostgresTransaction = require("../models/PostgresTransaction");
const PostgresOtp = require("../models/PostgresOtp");

const { generateWalletAddress, generateQR } = require("../utils/helpers");
// ======================register========================
exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmpassword, referralCode } = req.body;
 
    // ================= TOKEN =================
   const authHeader = req.headers.authorization;
 
if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({ message: "No token or invalid format" });
}
 
const token = authHeader.split(" ")[1];
 
 
 
    const decoded = jwt.verify(token, "mysecretkey");
    const mobile = decoded.mobile;
 
    if (!mobile) {
      return res.status(400).json({ message: "Mobile missing" });
    }
 
    // ================= VALIDATIONS =================
    if (!name || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: "All fields required" });
    }
    // name validation
if (typeof name !== "string") {
  return res.status(400).json({
    message: "Name must be a string"
  });
}

if (name.trim().length < 3) {
  return res.status(400).json({
    message: "Name must contain minimum 3 characters"
  });
}

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 if (!passwordRegex.test(password)) {
  return res.status(400).json({
    message: "Use 8+ chars with uppercase, lowercase, number & special character"
  });
}
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords mismatch" });
    }
 
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({
    message: "Invalid email format. Example: user@gmail.com"
  });
}
    const existMobile = await User.findOne({ mobile });
    if (existMobile) {
      return res.status(400).json({ message: "Mobile number already exists" });
    }
 
    const otpRecord = await Otp.findOne({ mobile, isVerified: true });
    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not verified" });
    }
 
    // ================= CREATE USER =================
    const hash = await bcrypt.hash(password, 10);
    const myReferral = "PAYO" + uuidv4().slice(0, 6);
 let referrer = null;

if (referralCode) {
  referrer = await User.findOne({
    myReferralCode: referralCode
  });

  if (!referrer) {
    return res.status(400).json({
      message: "Invalid referral code"
    });
  }
}
    const user = await User.create({
      name,
      email,
      password: hash,
      mobile,
      referredBy: referralCode || null,
      myReferralCode: myReferral,
      isVerified: true
    });
// Save into PostgreSQL also
await PostgresUser.create({
  name,
  email,
  password: hash,
  mobile,
  referralcode: referralCode || null,
  isVerified: true,
});
    
    await sendNotification({
  userId: user._id,
  title: "Welcome to PAYO",
  message: "Your wallet is ready",
  type: "SYSTEM"
});
 
    // ================= CREATE WALLET IN DB =================
    const walletAddress = generateWalletAddress();
    const qr = await generateQR(walletAddress);
const wallet = await Wallet.create({
  userId: user._id,
 
  walletAddress: generateWalletAddress(),
  addressExpiry: Date.now() + 60 * 60 * 1000, // 60 min
 
  qrToken: uuidv4(),
  qrExpiry: Date.now() + 15 * 60 * 1000 // 15 min
});
// ================== CREATE WALLET IN POSTGRESQL ==================
await PostgresWallet.create({
  userId: user.id,
  walletAddress: wallet.walletAddress,
  balance: wallet.balance || 0,
  qrToken: wallet.qrToken,
});
 
    // link wallet to user
    await User.findByIdAndUpdate(user._id, { walletId: wallet._id });
 
    // ================= REFERRAL BONUS =================
    const REFERRAL_BONUS = 50;
 
   if (referralCode) {
 
  // 1. Find referrer
  const referrer = await User.findOne({ myReferralCode: referralCode });
 
  // 2. Validate referral
  if (!referrer) {
    return res.status(400).json({ message: "Invalid referral code" });
  }
 
  // 3. Prevent self-referral
  if (referrer._id.toString() === user._id.toString()) {
    return res.status(400).json({ message: "You cannot refer yourself" });
  }
 
  // 4. Get referrer wallet
  const referrerWallet = await Wallet.findOne({ userId: referrer._id });
 
  if (!referrerWallet) {
    return res.status(404).json({ message: "Referrer wallet not found" });
  }
 
  // 5. Give bonus ONLY to referrer
  referrerWallet.balance += REFERRAL_BONUS;
  await referrerWallet.save();
 // ================== SAVE TRANSACTION IN MONGODB ==================
  await Transaction.create({
    userId: referrer._id,
    amount: REFERRAL_BONUS,
    type: "credit",
    message: "Referral bonus received"
  });
  // ================== SAVE TRANSACTION IN POSTGRESQL ==================
  await PostgresTransaction.create({
  userId: referrer.id,
  amount: REFERRAL_BONUS,
  type: "credit",
  message: "Referral bonus received"
});
 await sendNotification({
  userId: referrer._id,
  title: "Referral Reward",
  message: `You earned ${REFERRAL_BONUS} PAYO`,
  type: "REWARD"
});
}
 
    // ================= CLEANUP =================
    await Otp.deleteOne({ mobile });
 
    // ================= RESPONSE =================
    res.status(201).json({
      message: "Registered successfully",
      myReferralCode: user.myReferralCode,
      wallet: {
        walletAddress: wallet.walletAddress,
        balance: wallet.balance
      }
    });
 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
 
 
 
// ======================login========================
exports.login = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;
 
    let user = email
      ? await User.findOne({ email })
      : await User.findOne({ mobile });
 
    if (!user) return res.status(400).json({ message: "User not found" });
 
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });
 
    const token = jwt.sign(
      { id: user._id, mobile: user.mobile },
      "mysecretkey",
      { expiresIn: "24h" }
    );
 await sendNotification({
  userId: user._id,
  title: "Login Alert",
  message: "You logged into your account",
  type: "SECURITY"
});
    res.json({ message: "Login success", token });
 
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
 
 
// ======================resend otp========================
exports.resendOtp=async (req, res) => {
  const { mobile } = req.body;
 
  const record = await Otp.findOne({ mobile });
 
  if (!record) {
    return res.status(400).json({ message: "Please request OTP first" });
  }
 
  const now = Date.now();
 
  if (record.expiresAt > now) {
    return res.status(400).json({
      message: "OTP still valid. Please wait before resending",
    });
  }
 
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);
 
  record.otp = hashedOtp;
  record.isVerified = false;
  record.expiresAt = now + 2 * 60 * 1000;
 
  await record.save();
 
  console.log("New OTP:", otp);
 
  res.json({ message: "OTP resent",otp });
};
 
// ====================verify otp========================
 
exports.verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
 
    const record = await Otp.findOne({ mobile });
 
    if (!record || !record.otp) {
      return res.status(400).json({ message: "OTP not found" });
    }
 
    if (record.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Expired OTP" });
    }
 
    const isMatch = await bcrypt.compare(String(otp).trim(), record.otp);
 
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
 
    record.isVerified = true;
    await record.save();
 
    const token = jwt.sign({ mobile }, "mysecretkey", {
      expiresIn: "24h",
    });
 
    return res.json({ message: "OTP verified", token });
 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
 

 
// ======================send otp========================
 
exports.sendOtp=async (req, res) => {
  const { mobile } = req.body;
 
  if (!/^[0-9]{10}$/.test(mobile)) {
    return res.status(400).json({ message: "Invalid mobile" });
  }  
   const existingUser = await User.findOne({ mobile });

    if (existingUser) {
      return res.status(400).json({
        message: "Mobile number already registered. Please login"
      });
    }
 
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
 
  // hash OTP
  const hashedOtp = await bcrypt.hash(otp, 10);
 // ================== SAVE OTP IN MONGODB ==================
  await Otp.findOneAndUpdate(
  { mobile },
  {
    $set: {
      otp: hashedOtp,
      isVerified: false,
      expiresAt: Date.now() + 2 * 60 * 1000
    }
  },
 { upsert: true, returnDocument: "after" }
);
// ================== SAVE OTP IN POSTGRESQL ==================
await PostgresOtp.create({
  mobile,
  otp: hashedOtp,
  isVerified: false,
});
 
  console.log("OTP:", otp);
 
  res.json({ message: "OTP sent" ,otp});
};
 
 
// ================= set pin =================
 
exports.setPin=async (req, res) => {
  try {
   
 
    const { pin } = req.body;
 
    if (!pin) {
      return res.status(400).json({ message: "PIN is required" });
    }
 
    if (!/^\d{4}$/.test(pin)) {
      return res.status(400).json({ message: "PIN must be 4 digits" });
    }
 
    if (!req.userId) {
      return res.status(401).json({ message: "Invalid token (no userId)" });
    }
 
    const user = await User.findById(req.userId);
 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
 
    const hashedPin = await bcrypt.hash(pin, 10);
 
    user.transactionPin = hashedPin;
    await user.save();
 
    res.json({ message: "Transaction PIN set successfully " });
 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error setting PIN" });
  }
};
 
// ================= change transaction pin =================
 
 
exports.changePin = async (req, res) => {
  try {
    const { old_pin, new_pin } = req.body;
 
    // Check inputs
    if (!old_pin || !new_pin) {
      return res.status(400).json({ message: "Old PIN and New PIN are required" });
    }
 
    // Validate format (choose 4 or 6 digits)
    if (!/^\d{4}$/.test(new_pin)) {
      return res.status(400).json({ message: "New PIN must be 4 digits" });
    }
 
    if (!req.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }
 
    const user = await User.findById(req.userId);
 
    if (!user || !user.transactionPin) {
      return res.status(404).json({ message: "User or PIN not found" });
    }
 
    // Compare old PIN
    const isMatch = await bcrypt.compare(old_pin, user.transactionPin);
 
    if (!isMatch) {
      return res.status(400).json({ message: "Old PIN is incorrect" });
    }
 
    // Prevent same PIN reuse
    const isSame = await bcrypt.compare(new_pin, user.transactionPin);
    if (isSame) {
      return res.status(400).json({ message: "New PIN cannot be same as old PIN" });
    }
 
    // Hash new PIN
    const hashedPin = await bcrypt.hash(new_pin, 10);
 
    user.transactionPin = hashedPin;
    await user.save();
 
    res.json({ message: "PIN changed successfully" });
 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error changing PIN" });
  }
};
 
//=============== send login otp====================
 
exports.sendLoginOtp = async (req, res) => {
  const { mobile } = req.body;
 
  const user = await User.findOne({ mobile });
  if (!user) {
    return res.status(400).json({ message: "User not registered" });
  }
  
 
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);
 
  await Otp.findOneAndUpdate(
    { mobile },
    {
      otp: hashedOtp,
      isVerified: false,
      expiresAt: Date.now() + 2 * 60 * 1000
    },
    { upsert: true, returnDocument: "after" }
  );
 
  console.log("Login OTP:", otp);
 
  res.json({ message: "OTP sent", otp });
};
 
//========================== verify login otp =======================
 
exports.verifyLoginOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
 
    const record = await Otp.findOne({ mobile });
    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }
 
    if (record.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
 
    const isMatch = await bcrypt.compare(otp, record.otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
 
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
 
    const token = jwt.sign(
      { id: user._id, mobile: user.mobile },
      "mysecretkey",
      { expiresIn: "24h" }
    );
 
    // optional cleanup
    await Otp.deleteOne({ mobile });
 
    res.json({
      message: "Login success via OTP",
      token
    });
 
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
 
// ================= RESEND LOGIN OTP =================
exports.resendLoginOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
 
    // 1. Validate mobile
    if (!mobile || !/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({ message: "Valid mobile required" });
    }
 
    // 2. Check user exists
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ message: "User not registered" });
    }
 
    // 3. Check existing OTP record
    const record = await Otp.findOne({ mobile });
 
    const now = Date.now();
 
    // 4. Prevent spam (important)
    if (record && record.expiresAt > now) {
      const secondsLeft = Math.floor((record.expiresAt - now) / 1000);
      return res.status(400).json({
        message: `Please wait ${secondsLeft}s before requesting new OTP`
      });
    }
 
    // 5. Generate new OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
 
    // 6. Save OTP
    await Otp.findOneAndUpdate(
      { mobile },
      {
        otp: hashedOtp,
        isVerified: false,
        expiresAt: now + 2 * 60 * 1000 // 2 minutes
      },
     { upsert: true, returnDocument: "after" }
    );
 
    console.log("Resent Login OTP:", otp);
 
    // 7. Response
    res.json({
      message: "OTP resent successfully",
      otp // remove in production
    });
 
  } catch (err) {
    console.error("RESEND LOGIN OTP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
 

//====================reset password==================

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    
    if (!password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords mismatch" });
    }
    
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Use 8+ chars with uppercase, lowercase, number & special character",
      });
    }

    //  get user from middleware (BEST)
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  prevent same password reuse
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      return res.status(400).json({
        message: "New password cannot be same as old password",
      });
    }

    //  update password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    // optional: delete OTP (if you stored mobile in middleware)
    if (req.mobile) {
      await Otp.deleteOne({ mobile: req.mobile });
    }

    res.json({ message: "Password changed successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ====================reset verify otp========================
 
exports.resetVerifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
 
    const record = await Otp.findOne({ mobile });
 
    if (!record || !record.otp) {
      return res.status(400).json({ message: "OTP not found" });
    }
 
    if (record.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Expired OTP" });
    }
 
    const isMatch = await bcrypt.compare(String(otp).trim(), record.otp);
 
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
 
    record.isVerified = true;
    await record.save();
 
    const token = jwt.sign({ mobile }, "mysecretkey", {
      expiresIn: "24h",
    });
 
    return res.json({ message: "OTP verified", token });
 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
 

 
// ======================send otp========================
 
exports.resetSendOtp=async (req, res) => {
  const { mobile } = req.body;
 
  if (!/^[0-9]{10}$/.test(mobile)) {
    return res.status(400).json({ message: "Invalid mobile" });
  }  

  const existingUser = await User.findOne({ mobile });

  if (!existingUser) {
    return res.status(400).json({
      message: "Mobile number not registered"
    });
  }
 
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
 
  // hash OTP
  const hashedOtp = await bcrypt.hash(otp, 10);
 
  await Otp.findOneAndUpdate(
  { mobile },
  {
    $set: {
      otp: hashedOtp,
      isVerified: false,
      expiresAt: Date.now() + 2 * 60 * 1000
    }
  },
 { upsert: true, returnDocument: "after" }
);
 
  console.log("OTP:", otp);
 
  res.json({ message: "OTP sent" ,otp});
};