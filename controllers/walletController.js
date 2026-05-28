/*const Wallet = require("../models/Wallet");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { generateWalletAddress, generateQR } = require("../utils/helpers");
const bcrypt = require("bcrypt");
const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const Recent = require("../models/Recents");
const Bank = require("../models/Bank");
const Notification = require("../models/Notification");
const { sendNotification } = require("../utils/notify");
// ================= POSTGRESQL MODELS =================
const PostgresWallet = require("../models/PostgresWallet");
const PostgresTransaction = require("../models/PostgresTransaction");
const PostgresRecent = require("../models/PostgresRecent");
// ================= get wallet =================
 
exports.getWallet = async (req, res) => {  
 
    const wallet = await Wallet.findOne({ userId: req.userId });
 
    res.json(wallet);
 
};
// ================= Send tokens =================
 
 
 
exports.transfer = async (req, res) => {
  let txn;

  try {
    const { amount, toAddress, pin } = req.body;
    const amt = Number(amount);

    // 1. Basic validation
    if (!amt || amt <= 0 || !toAddress || !pin) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // 2. Get user + wallet
    const user = await User.findById(req.userId);
    const senderWallet = await Wallet.findOne({ userId: req.userId });

    if (!user || !senderWallet) {
      return res.status(404).json({ message: "User/Wallet not found" });
    }

    // 3. Create PENDING transaction first
    txn = await Transaction.create({
      userId: req.userId,
      senderWallet: senderWallet.walletAddress,
      receiverWallet: toAddress,
      amount: amt,
      status: "pending"
    });
// ================= SAVE TRANSACTION IN POSTGRESQL =================
await PostgresTransaction.create({
  transactionId: txn.transactionId,  // ← Add this line
  userId: req.userId,
  senderWallet: senderWallet.walletAddress,
  receiverWallet: toAddress,
  amount: amt,
  status: "pending"
});

    // 4. PIN check
    const isMatch = await bcrypt.compare(pin, user.transactionPin);
    if (!isMatch) {
      txn.status = "failed";
      txn.failureReason = "Invalid PIN";
      await txn.save();
      await sendNotification({
  userId: req.userId,
  title: "Transaction Failed",
  message: "Invalid PIN",
  type: "SECURITY"
});
      return res.status(401).json({
        message: "Invalid PIN",
        txnId: txn.transactionId
      });
    }

    // 5. Receiver check
    const receiverWallet = await Wallet.findOne({ walletAddress: toAddress });
    if (!receiverWallet) {
      txn.status = "failed";
      txn.failureReason = "Receiver not found";
      await txn.save();
      await sendNotification({
  userId: req.userId,
  title: "Transaction Failed",
  message: "Receiver not found",
  type: "PAYMENT"
});
      return res.status(404).json({
        message: "Receiver not found",
        txnId: txn.transactionId
      });
    }

    // 6. Self transfer check
    if (senderWallet.walletAddress === receiverWallet.walletAddress) {
      txn.status = "failed";
      txn.failureReason = "Cannot transfer to self";
      await txn.save();

      return res.status(400).json({
        message: "Cannot transfer to self",
        txnId: txn.transactionId
      });
    }
// DAILY LIMIT CHECK
const today = new Date();
today.setHours(0, 0, 0, 0);

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const todayTransactions = await Transaction.find({
  userId: req.userId,
  status: "success",
  createdAt: {
    $gte: today,
    $lt: tomorrow
  }
});

const totalSentToday = todayTransactions.reduce(
  (sum, txn) => sum + txn.amount,
  0
);

const dailyLimit = 10000;

if (totalSentToday + amt > dailyLimit) {
  txn.status = "failed";
  txn.failureReason = "Daily limit exceeded";
  await txn.save();

  await sendNotification({
    userId: req.userId,
    title: "Transaction Failed",
    message: "Daily transaction limit reached",
    type: "PAYMENT"
  });

  return res.status(400).json({
    message: "Daily transaction limit exceeded",
    remainingLimit: dailyLimit - totalSentToday,
    txnId: txn.transactionId
  });
}
    // 7. Balance check
    if (senderWallet.balance < amt) {
      txn.status = "failed";
      txn.failureReason = "Insufficient balance";
      await txn.save();
      await sendNotification({
  userId: req.userId,
  title: "Transaction Failed",
  message: "Insufficient balance",
  type: "PAYMENT"
});
      return res.status(400).json({
        message: "Insufficient balance",
        txnId: txn.transactionId
      });
    }

    // 8. Perform transfer
    senderWallet.balance -= amt;
    receiverWallet.balance += amt;

    await senderWallet.save();
    await receiverWallet.save();
    // ================= UPDATE POSTGRES WALLET BALANCES =================
await PostgresWallet.update(
  { balance: senderWallet.balance },
  {
    where: {
      walletAddress: senderWallet.walletAddress
    }
  }
);

await PostgresWallet.update(
  { balance: receiverWallet.balance },
  {
    where: {
      walletAddress: receiverWallet.walletAddress
    }
  }
);

    // 9. Mark success
    txn.receiverWallet = receiverWallet.walletAddress;
    txn.status = "success";
    await txn.save();
// ================= UPDATE POSTGRES TRANSACTION =================
await PostgresTransaction.update(
  { status: "success" },
  {
    where: {
      senderWallet: senderWallet.walletAddress,
      receiverWallet: toAddress,
      // amount: amt
    }
  }
);
// notification

//  Sender notification
await sendNotification({
  userId: req.userId,
  title: "Payment Sent",
  message: `You sent ${amt} PAYO`,
  type: "PAYMENT"
});

// Receiver notification
await sendNotification({
  userId: receiverWallet.userId,
  title: "Payment Received",
  message: `You received ${amt} PAYO`,
  type: "PAYMENT"
});
    // 10. Response
    return res.json({
      message: "Transfer successful",
      txnId: txn.transactionId,
      balance: senderWallet.balance
    });

  } catch (err) {
    console.error("TRANSFER ERROR:", err);

    // 11. Handle unexpected error
    if (txn) {
      txn.status = "failed";
      txn.failureReason = "Server error";
      await txn.save();
    }

    return res.status(500).json({
      message: "Something went wrong",
      txnId: txn?.transactionId
    });
  }
};
 
 
// ================= to check balance =================
 
exports.getBalance=async (req, res) => {
 
  const wallet = await Wallet.findOne({ userId: req.userId });
 
  res.json({ balance: wallet.balance });
 
};
 
 
// ================= TRANSACTION HISTORY =================

exports.getTransactions = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.userId });
 
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
 
    const txs = await Transaction.find({
      $or: [
        { senderWallet: wallet.walletAddress },
        { receiverWallet: wallet.walletAddress }
      ]
    }).sort({ createdAt: -1 });
 
    const addresses = [
      ...new Set(
        txs.flatMap(t => [t.senderWallet, t.receiverWallet])
      )
    ];
 
    const wallets = await Wallet.find({
      walletAddress: { $in: addresses }
    });
 
    const users = await User.find({
      _id: { $in: wallets.map(w => w.userId) }
    });
 
   
    const walletMap = {};
    wallets.forEach(w => {
      const user = users.find(
        u => u._id.toString() === w.userId.toString()
      );
      walletMap[w.walletAddress] = user?.name;
    });
 
    const formatted = txs.map(t => {
      const isSender = t.senderWallet === wallet.walletAddress;
 
      const otherAddress = isSender
        ? t.receiverWallet
        : t.senderWallet;
 
      return {
        id: t.transactionId,
        name: walletMap[otherAddress] || "Unknown",
        amount: isSender ? -t.amount : t.amount,
        type: isSender ? "sent" : "received",
        status:
          t.status === "pending" ? "processing" : t.status,
        createdAt: t.createdAt
      };
    });
 
    res.json({ transactions: formatted });
 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
 

 //===============transactions history of particular user==================
 
     
exports.transactionsById = async (req, res) => {
  try {
    const txn = await Transaction.findOne({
      transactionId: req.params.transaction_id
    });

    if (!txn) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    // get current user wallet
    const myWallet = await Wallet.findOne({ userId: req.userId });

    if (!myWallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // find both users
    const senderWallet = await Wallet.findOne({
      walletAddress: txn.senderWallet
    });

    const receiverWallet = await Wallet.findOne({
      walletAddress: txn.receiverWallet
    });

    const senderUser = senderWallet
      ? await User.findById(senderWallet.userId)
      : null;

    const receiverUser = receiverWallet
      ? await User.findById(receiverWallet.userId)
      : null;

   
    const isSender = txn.senderWallet === myWallet.walletAddress;


    let otherUser, otherWallet;

    if (isSender) {
      // I sent → show receiver
      otherUser = receiverUser;
      otherWallet = txn.receiverWallet;
    } else {
      // I received → show sender
      otherUser = senderUser;
      otherWallet = txn.senderWallet;
    }

    res.json({
      name: otherUser?.name || "Unknown",
      wallet: otherWallet,
      type: isSender ? "sent" : "received",
      amount: txn.amount,
      status: txn.status,
      id: txn.transactionId,
      timestamp: txn.createdAt

    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

//=======================transaction of user history (in person)=================
exports.getTransactionsWithUser = async (req, res) => {
  try {
    const { walletAddress } = req.params;

    // 1. My wallet
    const myWallet = await Wallet.findOne({ userId: req.userId });

    if (!myWallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // 2. Get all transactions between both wallets
    const txs = await Transaction.find({
      $or: [
        {
          senderWallet: myWallet.walletAddress,
          receiverWallet: walletAddress
        },
        {
          senderWallet: walletAddress,
          receiverWallet: myWallet.walletAddress
        }
      ]
    }).sort({ createdAt: -1 });

    // 3. Get other user details
    const otherWallet = await Wallet.findOne({ walletAddress });

    const otherUser = otherWallet
      ? await User.findById(otherWallet.userId)
      : null;

    // 4. Format response (frontend friendly)
    const formatted = txs.map(t => {
      const isSender = t.senderWallet === myWallet.walletAddress;

      return {
        id: t.transactionId,
        type: isSender ? "sent" : "received",
        amount: isSender ? -t.amount : t.amount,
        status: t.status === "pending" ? "processing" : t.status,
        date: t.createdAt
      };
    });

    res.json({
      name: otherUser?.name || "Unknown",
      walletAddress,
      transactions: formatted
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//======================transaction count ========================
exports.transactionCount = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.userId });

    const count = await Transaction.countDocuments({
      $or: [
        { userId: req.userId },
        { senderWallet: wallet.walletAddress },
        { receiverWallet: wallet.walletAddress }
      ]
    });

    res.json({ count });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


 // ================= generate qr address =================
 
 
 
 exports.generateAddress = async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ userId: req.userId });
 
    // create wallet if not exists
    if (!wallet) {
     const walletAddress = generateWalletAddress();
 
      wallet = new Wallet({
        userId: req.userId,
        walletAddress,
      });
 
      await wallet.save();
    }
 
    // ensure address exists
    if (!wallet.walletAddress) {
      wallet.walletAddress = generateWalletAddress();
      await wallet.save();
    }
 
    let qrToken = wallet.qrToken;
 
    //  generate new QR if expired
    if (!wallet.qrToken || wallet.qrExpiry <= Date.now()) {
      qrToken = uuidv4();
 
      wallet.qrToken = qrToken;
      wallet.qrExpiry = Date.now() + 15 * 60 * 1000;
 
      await wallet.save();
    }
 
    const qrImage = await QRCode.toDataURL(qrToken);
 
    return res.json({
      qr: qrImage,
      address: wallet.walletAddress,
      expiresIn: Math.floor((wallet.qrExpiry - Date.now()) / 1000),
    });
  } catch (err) {
    console.log("QR ERROR:", err);
    res.status(500).json({ message: "Error generating QR" });
  }
};
 
 
// ================= validating qr image(scanning qrtoken) =========================
 
 exports.scan=async (req, res) => {
  try {
    const { qrData } = req.body;
 
    console.log("Scanned QR:", qrData);
 
    if (!qrData) {
      return res.status(400).json({ message: "QR data required" });
    }
 
    const wallet = await Wallet.findOne({ qrToken: qrData });
 
    if (!wallet) {
      return res.status(404).json({ message: "Invalid QR" });
    }
 
    // Expiry check
   if (!wallet.qrExpiry || wallet.qrExpiry <= Date.now()) {
  return res.status(400).json({ message: "QR expired" });
}
 
    //  Prevent self scan
    if (wallet.userId.toString() === req.userId) {
      return res.status(400).json({
        message: "You cannot scan your own QR",
      });
    }
 
    const user = await User.findById(wallet.userId);
 
    res.json({
      name: user.name,
      walletAddress: wallet.walletAddress,
    });
 
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error scanning QR" });
  }
};
 
 
// ================= get user by address =================
 
 exports.getUserByAddress = async (req, res) => {
  try {
    const { address } = req.params;
 
    const wallet = await Wallet.findOne({ walletAddress: address });
 
    if (!wallet) {
      return res.status(404).json({ message: "User not found" });
    }
 
    const user = await User.findById(wallet.userId);
 
    res.json({
      name: user.name,
      walletAddress: wallet.walletAddress
    });
 
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
 
 //==========================preview transfer(screen 1)==========================
exports.previewTransfer = async (req, res) => {
  try {
    const { toAddress, amount } = req.body;
    
    const amt = Number(amount);
 
    if (!toAddress || !amt || amt <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }
 
    const senderWallet = await Wallet.findOne({ userId: req.userId });
    const receiverWallet = await Wallet.findOne({ walletAddress: toAddress });
    const existing = await Recent.findOne({
  userId: req.userId,
  walletAddress: toAddress
});
 
    if (!receiverWallet) {
      return res.status(404).json({ message: "Receiver not found" });
    }
 
    if (senderWallet.walletAddress === receiverWallet.walletAddress) {
      return res.status(400).json({ message: "Cannot send to yourself" });
    }
 
    if (senderWallet.balance < amt) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
 
    const receiverUser = await User.findById(receiverWallet.userId);
    const senderUser = await User.findById(senderWallet.userId);
 
    // RESPONSE MATCHES FRONTEND
    res.json({
      sender: {
        name: senderUser.name,
        wallet: senderWallet.walletAddress   // match frontend
      },
      receiver: {
        name: receiverUser.name
      },
      address: receiverWallet.walletAddress, // required
      amount: amt,
      isRecent: !!existing
    });
 
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
 
//=========================confirm and transfer (Screen 2)======================
 
exports.confirmTransfer = async (req, res) => {
  try {
    const { toAddress, amount, pin } = req.body;
 
    const amt = Number(amount);
 
    if (!toAddress || !amt || !pin) {
      return res.status(400).json({ message: "All fields required" });
    }
 
    const user = await User.findById(req.userId);
 
    // PIN CHECK
    const isMatch = await bcrypt.compare(pin, user.transactionPin);
 
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid PIN" });
    }
 
    const senderWallet = await Wallet.findOne({ userId: req.userId });
    const receiverWallet = await Wallet.findOne({ walletAddress: toAddress });
 
    if (!receiverWallet) {
      return res.status(404).json({ message: "Receiver not found" });
    }
 
    if (senderWallet.walletAddress === receiverWallet.walletAddress) {
      return res.status(400).json({ message: "Self transfer not allowed" });
    }
 // DAILY LIMIT CHECK
const today = new Date();
today.setHours(0, 0, 0, 0);

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const todayTransactions = await Transaction.find({
  senderWallet: senderWallet.walletAddress,
  status: "success",
  createdAt: {
    $gte: today,
    $lt: tomorrow
  }
});

const totalSentToday = todayTransactions.reduce(
  (sum, txn) => sum + txn.amount,
  0
);

const dailyLimit = 10000;

if (totalSentToday + amt > dailyLimit) {
  return res.status(400).json({
    message: "Daily transaction limit exceeded",
    remainingLimit: dailyLimit - totalSentToday
  });
}
    if (senderWallet.balance < amt) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
 
    //  TRANSFER
    senderWallet.balance -= amt;
    receiverWallet.balance += amt;
 
    await senderWallet.save();
    await receiverWallet.save();
    // ================= UPDATE POSTGRES WALLET BALANCES =================
await PostgresWallet.update(
  { balance: senderWallet.balance },
  {
    where: {
      walletAddress: senderWallet.walletAddress
    }
  }
);

await PostgresWallet.update(
  { balance: receiverWallet.balance },
  {
    where: {
      walletAddress: receiverWallet.walletAddress
    }
  }
);
 
    //  TRANSACTION
await Transaction.create({
  senderWallet: senderWallet.walletAddress,   // ✅ CORRECT
  receiverWallet: receiverWallet.walletAddress, // ✅ CORRECT
  amount: amt,
  status: "success",
  userId: req.userId
});
 
    res.json({
      message: "Transfer successful",
      balance: senderWallet.balance
    });
 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
 
// ================= REFER & EARN =================
 
exports.getReferData = async (req, res) => {
  try {
    const rewardPerUser = 50;
 
    // 1. Get current user
    const user = await User.findById(req.userId);
 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
 
    // 2. Get all referred users
    const referredUsers = await User.find({
      referredBy: user.myReferralCode
    });
 
    let successfulReferrals = 0;
 
    // 3. Check each user first transaction
    for (let refUser of referredUsers) {
      const wallet = await Wallet.findOne({ userId: refUser._id });
 
      if (!wallet) continue;
 
      const txn = await Transaction.findOne({
        senderWallet: wallet.walletAddress,
        status: "success"
      });
 
      if (txn) {
        successfulReferrals++;
      }
    }
 
    // 4. Response
    res.json({
      referralCode: user.myReferralCode,
      totalUsers: referredUsers.length,
      successfulReferrals,
      totalRewards: successfulReferrals * rewardPerUser,
      rewardPerUser
    });
 
  } catch (err) {
    console.error("REFERRAL ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
 
 
//==============================save to recents(toggle button code)=========================
 
 
exports.saveRecent = async (req, res) => {
  try {
    const { receiverName, walletAddress } = req.body;
 
    //  check duplicate
    const existing = await Recent.findOne({
      userId: req.userId,
      walletAddress,
    });
 
  if (existing) {
  return res.status(200).json({
    message: "Already saved",
    isRecent: true   // already exists
  });
}
 
    const recent = new Recent({
      userId: req.userId,
      receiverName,
      walletAddress,
    });
 
    await recent.save();
 
    res.status(201).json({
  message: "Saved to recents",
  isRecent: true   
});
 
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
 //==============================check recent (for toggle)=========================
exports.checkRecent = async (req, res) => {
  try {
    const { walletAddress } = req.params;

    const existing = await Recent.findOne({
      userId: req.userId,
      walletAddress
    });

    res.json({
      isRecent: !!existing   // true or false
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
//=================== recents page================
 
exports.getRecents = async (req, res) => {
  try {
    const recents = await Recent.find({ userId: req.userId })
      .sort({ createdAt: -1 }) // latest first
      .limit(20); // optional limit
 
    res.json(recents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recents" });
  }
};
//==============================get wallet dashboard=========================
 
exports.walletDashboard=async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.userId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
 
    const user = await User.findById(req.userId);
 
    // REFERRALS (optimized)
    const referredUsers = await User.find({
      referredBy: user.myReferralCode
    });
 
    const referredUserIds = referredUsers.map(u => u._id);
 
    const wallets = await Wallet.find({ userId: { $in: referredUserIds } });
 
    const walletAddresses = wallets.map(w => w.walletAddress);
 
    const successfulTxns = await Transaction.find({
      senderWallet: { $in: walletAddresses },
      status: "success"
    });
 
    const uniqueSenders = new Set(
      successfulTxns.map(t => t.senderWallet)
    );
 
    const successfulReferrals = uniqueSenders.size;
 
    const rewardPerUser = 50;
    const totalReferralRewards = successfulReferrals * rewardPerUser;
 
    // LOCK LOGIC
    const accountAge =
      Date.now() - new Date(user.createdAt).getTime();
 
    const daysSinceSignup =
      accountAge / (1000 * 60 * 60 * 24);
 
    const isLocked = daysSinceSignup < 3;
    const daysUntilUnlock = isLocked
      ? Math.ceil(3 - daysSinceSignup)
      : 0;
 
    // DAILY LIMIT
    const today = new Date();
    today.setHours(0, 0, 0, 0);
 
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
 
    const todayTransactions = await Transaction.find({
      userId: req.userId,
      createdAt: { $gte: today, $lt: tomorrow },
      status: "success"
    });
 
    const totalSentToday = todayTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );
 
    const dailyLimit = 10000;
    if (totalSentToday >= dailyLimit) {
  await sendNotification({
    userId: req.userId,
    title: "Limit Reached",
    message: "You reached your daily limit",
    type: "SYSTEM"
  });
}
 
    // FINAL RESPONSE 
    res.json({
      id: wallet.walletAddress,
      balance: wallet.balance,  
 
      referralRewards: totalReferralRewards,
      referralStatus: isLocked ? "Locked" : "Unlocked",
      unlockInDays: daysUntilUnlock,
 
      dailyUsed: totalSentToday,
      dailyLimit: dailyLimit
    });
 
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
   



// ================= INCOME & OUTCOME =================
exports.getIncomeOutcome = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.userId });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // Get all SUCCESS transactions of this user
    const transactions = await Transaction.find({
      status: "success",
      $or: [
        { senderWallet: wallet.walletAddress },
        { receiverWallet: wallet.walletAddress }
      ]
    });

    let income = 0;
    let outcome = 0;

    transactions.forEach(txn => {
      if (txn.receiverWallet === wallet.walletAddress) {
        income += txn.amount;   // money received
      } else if (txn.senderWallet === wallet.walletAddress) {
        outcome += txn.amount;  // money sent
      }
    });

    res.json({
      income,
      outcome
    });

  } catch (err) {
    console.error("Income/Outcome error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
//======================profile api=====================

exports.profile = async (req, res) => {
  try {
    // 1. Get user
    const user = await User.findById(req.userId).select(
      "name email mobile myReferralCode walletId"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // 2. Get wallet
    const wallet = await Wallet.findById(user.walletId).select(
      "walletAddress balance"
    );

    // 3. Transaction count
    const txnCount = await Transaction.countDocuments({
      $or: [
        { senderWallet: wallet?.walletAddress },
        { receiverWallet: wallet?.walletAddress }
      ]
    });

    // 4. Final response (ONLY required fields)
    res.status(200).json({
      message: "Profile fetched",
      data: {
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        referralCode: user.myReferralCode,

        walletId: user.walletId,
        walletAddress: wallet?.walletAddress,
        balance: wallet?.balance,

        transactionCount: txnCount
      }
    });

  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({
      message: "Server error"
    });
  }
};*/


const Wallet = require("../models/Wallet");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { generateWalletAddress, generateQR } = require("../utils/helpers");
const bcrypt = require("bcrypt");
const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const Recent = require("../models/Recents");
const Bank = require("../models/Bank");
const Notification = require("../models/Notification");
const { sendNotification } = require("../utils/notify");
// ================= POSTGRESQL MODELS =================
const PostgresWallet = require("../models/PostgresWallet");
const PostgresTransaction = require("../models/PostgresTransaction");
const PostgresRecent = require("../models/PostgresRecent");

// ================= get wallet =================
exports.getWallet = async (req, res) => {
  const wallet = await Wallet.findOne({ userId: req.userId });
  res.json(wallet);
};

// ================= Send tokens =================
exports.transfer = async (req, res) => {
  let txn;

  try {
    const { amount, toAddress, pin } = req.body;
    const amt = Number(amount);

    // 1. Basic validation
    if (!amt || amt <= 0 || !toAddress || !pin) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // 2. Get user + wallet
    const user = await User.findById(req.userId);
    const senderWallet = await Wallet.findOne({ userId: req.userId });

    if (!user || !senderWallet) {
      return res.status(404).json({ message: "User/Wallet not found" });
    }

    // 3. Create PENDING transaction first (MongoDB)
    txn = await Transaction.create({
      userId: req.userId,
      senderWallet: senderWallet.walletAddress,
      receiverWallet: toAddress,
      amount: amt,
      status: "pending"
    });

    // ================= SAVE TRANSACTION IN POSTGRESQL =================
    await PostgresTransaction.create({
      transactionId: txn.transactionId,
      userId: req.userId.toString(),  // ✅ Convert ObjectId to string
      senderWallet: senderWallet.walletAddress,
      receiverWallet: toAddress,
      amount: amt,
      status: "pending"
    });

    // 4. PIN check
    if (!user.transactionPin) {
      txn.status = "failed";
      txn.failureReason = "PIN not set";
      await txn.save();
      return res.status(401).json({
        message: "Transaction PIN not set. Please set PIN first",
        txnId: txn.transactionId
      });
    }

    const isMatch = await bcrypt.compare(pin, user.transactionPin);
    if (!isMatch) {
      txn.status = "failed";
      txn.failureReason = "Invalid PIN";
      await txn.save();
      await sendNotification({
        userId: req.userId,
        title: "Transaction Failed",
        message: "Invalid PIN",
        type: "SECURITY"
      });
      return res.status(401).json({
        message: "Invalid PIN",
        txnId: txn.transactionId
      });
    }

    // 5. Receiver check
    const receiverWallet = await Wallet.findOne({ walletAddress: toAddress });
    if (!receiverWallet) {
      txn.status = "failed";
      txn.failureReason = "Receiver not found";
      await txn.save();
      await sendNotification({
        userId: req.userId,
        title: "Transaction Failed",
        message: "Receiver not found",
        type: "PAYMENT"
      });
      return res.status(404).json({
        message: "Receiver not found",
        txnId: txn.transactionId
      });
    }

    // 6. Self transfer check
    if (senderWallet.walletAddress === receiverWallet.walletAddress) {
      txn.status = "failed";
      txn.failureReason = "Cannot transfer to self";
      await txn.save();
      return res.status(400).json({
        message: "Cannot transfer to self",
        txnId: txn.transactionId
      });
    }

    // DAILY LIMIT CHECK
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayTransactions = await Transaction.find({
      userId: req.userId,
      status: "success",
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    });

    const totalSentToday = todayTransactions.reduce((sum, txn) => sum + txn.amount, 0);
    const dailyLimit = 10000;

    if (totalSentToday + amt > dailyLimit) {
      txn.status = "failed";
      txn.failureReason = "Daily limit exceeded";
      await txn.save();
      await sendNotification({
        userId: req.userId,
        title: "Transaction Failed",
        message: "Daily transaction limit reached",
        type: "PAYMENT"
      });
      return res.status(400).json({
        message: "Daily transaction limit exceeded",
        remainingLimit: dailyLimit - totalSentToday,
        txnId: txn.transactionId
      });
    }

    // 7. Balance check
    if (senderWallet.balance < amt) {
      txn.status = "failed";
      txn.failureReason = "Insufficient balance";
      await txn.save();
      await sendNotification({
        userId: req.userId,
        title: "Transaction Failed",
        message: "Insufficient balance",
        type: "PAYMENT"
      });
      return res.status(400).json({
        message: "Insufficient balance",
        txnId: txn.transactionId
      });
    }

    // 8. Perform transfer
    senderWallet.balance -= amt;
    receiverWallet.balance += amt;

    await senderWallet.save();
    await receiverWallet.save();

    // ================= UPDATE POSTGRES WALLET BALANCES =================
    await PostgresWallet.update(
      { balance: senderWallet.balance },
      { where: { walletAddress: senderWallet.walletAddress } }
    );
    await PostgresWallet.update(
      { balance: receiverWallet.balance },
      { where: { walletAddress: receiverWallet.walletAddress } }
    );

    // 9. Mark success in MongoDB
    txn.receiverWallet = receiverWallet.walletAddress;
    txn.status = "success";
    await txn.save();

    // ================= UPDATE POSTGRES TRANSACTION =================
    const pgTxn = await PostgresTransaction.findOne({
      where: { transactionId: txn.transactionId }
    });
    
    if (pgTxn) {
      pgTxn.status = "success";
      pgTxn.receiverWallet = receiverWallet.walletAddress;
      await pgTxn.save();
    } else {
      await PostgresTransaction.create({
        transactionId: txn.transactionId,
        userId: req.userId.toString(),  // ✅ Convert ObjectId to string
        senderWallet: senderWallet.walletAddress,
        receiverWallet: receiverWallet.walletAddress,
        amount: amt,
        status: "success"
      });
    }

    // Notifications
    await sendNotification({
      userId: req.userId,
      title: "Payment Sent",
      message: `You sent ${amt} PAYO`,
      type: "PAYMENT"
    });
    await sendNotification({
      userId: receiverWallet.userId,
      title: "Payment Received",
      message: `You received ${amt} PAYO`,
      type: "PAYMENT"
    });

    // 10. Response
    return res.json({
      message: "Transfer successful",
      txnId: txn.transactionId,
      balance: senderWallet.balance
    });

  } catch (err) {
    console.error("TRANSFER ERROR:", err);
    console.error("Error stack:", err.stack);

    if (txn) {
      txn.status = "failed";
      txn.failureReason = err.message || "Server error";
      await txn.save();
    }

    return res.status(500).json({
      message: "Something went wrong",
      txnId: txn?.transactionId,
      error: err.message
    });
  }
};

// ================= to check balance =================
exports.getBalance = async (req, res) => {
  const wallet = await Wallet.findOne({ userId: req.userId });
  res.json({ balance: wallet.balance });
};

// ================= TRANSACTION HISTORY =================
exports.getTransactions = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.userId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    const txs = await Transaction.find({
      $or: [
        { senderWallet: wallet.walletAddress },
        { receiverWallet: wallet.walletAddress }
      ]
    }).sort({ createdAt: -1 });

    const addresses = [...new Set(txs.flatMap(t => [t.senderWallet, t.receiverWallet]))];
    const wallets = await Wallet.find({ walletAddress: { $in: addresses } });
    const users = await User.find({ _id: { $in: wallets.map(w => w.userId) } });

    const walletMap = {};
    wallets.forEach(w => {
      const user = users.find(u => u._id.toString() === w.userId.toString());
      walletMap[w.walletAddress] = user?.name;
    });

    const formatted = txs.map(t => {
      const isSender = t.senderWallet === wallet.walletAddress;
      const otherAddress = isSender ? t.receiverWallet : t.senderWallet;
      return {
        id: t.transactionId,
        name: walletMap[otherAddress] || "Unknown",
        amount: isSender ? -t.amount : t.amount,
        type: isSender ? "sent" : "received",
        status: t.status === "pending" ? "processing" : t.status,
        createdAt: t.createdAt
      };
    });

    res.json({ transactions: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// =============== transactions history by ID =================
exports.transactionsById = async (req, res) => {
  try {
    const txn = await Transaction.findOne({ transactionId: req.params.transaction_id });
    if (!txn) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const myWallet = await Wallet.findOne({ userId: req.userId });
    if (!myWallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    const senderWallet = await Wallet.findOne({ walletAddress: txn.senderWallet });
    const receiverWallet = await Wallet.findOne({ walletAddress: txn.receiverWallet });
    const senderUser = senderWallet ? await User.findById(senderWallet.userId) : null;
    const receiverUser = receiverWallet ? await User.findById(receiverWallet.userId) : null;

    const isSender = txn.senderWallet === myWallet.walletAddress;
    let otherUser, otherWallet;

    if (isSender) {
      otherUser = receiverUser;
      otherWallet = txn.receiverWallet;
    } else {
      otherUser = senderUser;
      otherWallet = txn.senderWallet;
    }

    res.json({
      name: otherUser?.name || "Unknown",
      wallet: otherWallet,
      type: isSender ? "sent" : "received",
      amount: txn.amount,
      status: txn.status,
      id: txn.transactionId,
      timestamp: txn.createdAt
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= transaction of user history =================
exports.getTransactionsWithUser = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const myWallet = await Wallet.findOne({ userId: req.userId });
    if (!myWallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    const txs = await Transaction.find({
      $or: [
        { senderWallet: myWallet.walletAddress, receiverWallet: walletAddress },
        { senderWallet: walletAddress, receiverWallet: myWallet.walletAddress }
      ]
    }).sort({ createdAt: -1 });

    const otherWallet = await Wallet.findOne({ walletAddress });
    const otherUser = otherWallet ? await User.findById(otherWallet.userId) : null;

    const formatted = txs.map(t => {
      const isSender = t.senderWallet === myWallet.walletAddress;
      return {
        id: t.transactionId,
        type: isSender ? "sent" : "received",
        amount: isSender ? -t.amount : t.amount,
        status: t.status === "pending" ? "processing" : t.status,
        date: t.createdAt
      };
    });

    res.json({
      name: otherUser?.name || "Unknown",
      walletAddress,
      transactions: formatted
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= transaction count =================
exports.transactionCount = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.userId });
    const count = await Transaction.countDocuments({
      $or: [
        { userId: req.userId },
        { senderWallet: wallet.walletAddress },
        { receiverWallet: wallet.walletAddress }
      ]
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= generate qr address =================
exports.generateAddress = async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ userId: req.userId });
    if (!wallet) {
      const walletAddress = generateWalletAddress();
      wallet = new Wallet({ userId: req.userId, walletAddress });
      await wallet.save();
    }

    if (!wallet.walletAddress) {
      wallet.walletAddress = generateWalletAddress();
      await wallet.save();
    }

    let qrToken = wallet.qrToken;
    if (!wallet.qrToken || wallet.qrExpiry <= Date.now()) {
      qrToken = uuidv4();
      wallet.qrToken = qrToken;
      wallet.qrExpiry = Date.now() + 15 * 60 * 1000;
      await wallet.save();
    }

    const qrImage = await QRCode.toDataURL(qrToken);
    return res.json({
      qr: qrImage,
      address: wallet.walletAddress,
      expiresIn: Math.floor((wallet.qrExpiry - Date.now()) / 1000)
    });
  } catch (err) {
    console.log("QR ERROR:", err);
    res.status(500).json({ message: "Error generating QR" });
  }
};

// ================= validating qr image =================
exports.scan = async (req, res) => {
  try {
    const { qrData } = req.body;
    if (!qrData) {
      return res.status(400).json({ message: "QR data required" });
    }

    const wallet = await Wallet.findOne({ qrToken: qrData });
    if (!wallet) {
      return res.status(404).json({ message: "Invalid QR" });
    }

    if (!wallet.qrExpiry || wallet.qrExpiry <= Date.now()) {
      return res.status(400).json({ message: "QR expired" });
    }

    if (wallet.userId.toString() === req.userId) {
      return res.status(400).json({ message: "You cannot scan your own QR" });
    }

    const user = await User.findById(wallet.userId);
    res.json({ name: user.name, walletAddress: wallet.walletAddress });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error scanning QR" });
  }
};

// ================= get user by address =================
exports.getUserByAddress = async (req, res) => {
  try {
    const { address } = req.params;
    const wallet = await Wallet.findOne({ walletAddress: address });
    if (!wallet) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.findById(wallet.userId);
    res.json({ name: user.name, walletAddress: wallet.walletAddress });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= preview transfer =================
exports.previewTransfer = async (req, res) => {
  try {
    const { toAddress, amount } = req.body;
    const amt = Number(amount);

    if (!toAddress || !amt || amt <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const senderWallet = await Wallet.findOne({ userId: req.userId });
    const receiverWallet = await Wallet.findOne({ walletAddress: toAddress });
    const existing = await Recent.findOne({ userId: req.userId, walletAddress: toAddress });

    if (!receiverWallet) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    if (senderWallet.walletAddress === receiverWallet.walletAddress) {
      return res.status(400).json({ message: "Cannot send to yourself" });
    }

    if (senderWallet.balance < amt) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const receiverUser = await User.findById(receiverWallet.userId);
    const senderUser = await User.findById(senderWallet.userId);

    res.json({
      sender: { name: senderUser.name, wallet: senderWallet.walletAddress },
      receiver: { name: receiverUser.name },
      address: receiverWallet.walletAddress,
      amount: amt,
      isRecent: !!existing
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= confirm and transfer =================
exports.confirmTransfer = async (req, res) => {
  try {
    const { toAddress, amount, pin } = req.body;
    const amt = Number(amount);

    if (!toAddress || !amt || !pin) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findById(req.userId);
    const isMatch = await bcrypt.compare(pin, user.transactionPin);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid PIN" });
    }

    const senderWallet = await Wallet.findOne({ userId: req.userId });
    const receiverWallet = await Wallet.findOne({ walletAddress: toAddress });

    if (!receiverWallet) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    if (senderWallet.walletAddress === receiverWallet.walletAddress) {
      return res.status(400).json({ message: "Self transfer not allowed" });
    }

    // DAILY LIMIT CHECK
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayTransactions = await Transaction.find({
      senderWallet: senderWallet.walletAddress,
      status: "success",
      createdAt: { $gte: today, $lt: tomorrow }
    });

    const totalSentToday = todayTransactions.reduce((sum, txn) => sum + txn.amount, 0);
    const dailyLimit = 10000;

    if (totalSentToday + amt > dailyLimit) {
      return res.status(400).json({
        message: "Daily transaction limit exceeded",
        remainingLimit: dailyLimit - totalSentToday
      });
    }

    if (senderWallet.balance < amt) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // TRANSFER
    senderWallet.balance -= amt;
    receiverWallet.balance += amt;
    await senderWallet.save();
    await receiverWallet.save();

    // UPDATE POSTGRES WALLET BALANCES
    await PostgresWallet.update(
      { balance: senderWallet.balance },
      { where: { walletAddress: senderWallet.walletAddress } }
    );
    await PostgresWallet.update(
      { balance: receiverWallet.balance },
      { where: { walletAddress: receiverWallet.walletAddress } }
    );

    // TRANSACTION (MongoDB)
    const transaction = await Transaction.create({
      senderWallet: senderWallet.walletAddress,
      receiverWallet: receiverWallet.walletAddress,
      amount: amt,
      status: "success",
      userId: req.userId
    });

    // TRANSACTION (PostgreSQL) - ✅ Convert userId to string
    await PostgresTransaction.create({
      transactionId: transaction.transactionId,
      userId: req.userId.toString(),  // ✅ Convert ObjectId to string
      senderWallet: senderWallet.walletAddress,
      receiverWallet: receiverWallet.walletAddress,
      amount: amt,
      status: "success"
    });

    res.json({
      message: "Transfer successful",
      balance: senderWallet.balance,
      transactionId: transaction.transactionId
    });
  } catch (err) {
    console.error("CONFIRM TRANSFER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= REFER & EARN =================
exports.getReferData = async (req, res) => {
  try {
    const rewardPerUser = 50;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const referredUsers = await User.find({ referredBy: user.myReferralCode });
    let successfulReferrals = 0;

    for (let refUser of referredUsers) {
      const wallet = await Wallet.findOne({ userId: refUser._id });
      if (!wallet) continue;
      const txn = await Transaction.findOne({ senderWallet: wallet.walletAddress, status: "success" });
      if (txn) successfulReferrals++;
    }

    res.json({
      referralCode: user.myReferralCode,
      totalUsers: referredUsers.length,
      successfulReferrals,
      totalRewards: successfulReferrals * rewardPerUser,
      rewardPerUser
    });
  } catch (err) {
    console.error("REFERRAL ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= save to recents =================
exports.saveRecent = async (req, res) => {
  try {
    const { receiverName, walletAddress } = req.body;
    const existing = await Recent.findOne({ userId: req.userId, walletAddress });

    if (existing) {
      return res.status(200).json({ message: "Already saved", isRecent: true });
    }

    const recent = new Recent({ userId: req.userId, receiverName, walletAddress });
    await recent.save();

    // Save to PostgreSQL - ✅ Convert userId to string
    await PostgresRecent.create({ 
      userId: req.userId.toString(),  // ✅ Convert ObjectId to string
      receiverName, 
      walletAddress 
    });

    res.status(201).json({ message: "Saved to recents", isRecent: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ================= check recent =================
exports.checkRecent = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const existing = await Recent.findOne({ userId: req.userId, walletAddress });
    res.json({ isRecent: !!existing });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= recents page =================
exports.getRecents = async (req, res) => {
  try {
    const recents = await Recent.find({ userId: req.userId }).sort({ createdAt: -1 }).limit(20);
    res.json(recents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recents" });
  }
};

// ================= wallet dashboard =================
exports.walletDashboard = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.userId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    const user = await User.findById(req.userId);
    const referredUsers = await User.find({ referredBy: user.myReferralCode });
    const referredUserIds = referredUsers.map(u => u._id);
    const wallets = await Wallet.find({ userId: { $in: referredUserIds } });
    const walletAddresses = wallets.map(w => w.walletAddress);
    const successfulTxns = await Transaction.find({ senderWallet: { $in: walletAddresses }, status: "success" });
    const uniqueSenders = new Set(successfulTxns.map(t => t.senderWallet));
    const successfulReferrals = uniqueSenders.size;
    const rewardPerUser = 50;
    const totalReferralRewards = successfulReferrals * rewardPerUser;

    const accountAge = Date.now() - new Date(user.createdAt).getTime();
    const daysSinceSignup = accountAge / (1000 * 60 * 60 * 24);
    const isLocked = daysSinceSignup < 3;
    const daysUntilUnlock = isLocked ? Math.ceil(3 - daysSinceSignup) : 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayTransactions = await Transaction.find({
      userId: req.userId,
      createdAt: { $gte: today, $lt: tomorrow },
      status: "success"
    });

    const totalSentToday = todayTransactions.reduce((sum, txn) => sum + txn.amount, 0);
    const dailyLimit = 10000;

    res.json({
      id: wallet.walletAddress,
      balance: wallet.balance,
      referralRewards: totalReferralRewards,
      referralStatus: isLocked ? "Locked" : "Unlocked",
      unlockInDays: daysUntilUnlock,
      dailyUsed: totalSentToday,
      dailyLimit: dailyLimit
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= INCOME & OUTCOME =================
exports.getIncomeOutcome = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.userId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    const transactions = await Transaction.find({
      status: "success",
      $or: [
        { senderWallet: wallet.walletAddress },
        { receiverWallet: wallet.walletAddress }
      ]
    });

    let income = 0;
    let outcome = 0;

    transactions.forEach(txn => {
      if (txn.receiverWallet === wallet.walletAddress) {
        income += txn.amount;
      } else if (txn.senderWallet === wallet.walletAddress) {
        outcome += txn.amount;
      }
    });

    res.json({ income, outcome });
  } catch (err) {
    console.error("Income/Outcome error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= profile api =================
exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("name email mobile myReferralCode walletId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const wallet = await Wallet.findById(user.walletId).select("walletAddress balance");
    const txnCount = await Transaction.countDocuments({
      $or: [
        { senderWallet: wallet?.walletAddress },
        { receiverWallet: wallet?.walletAddress }
      ]
    });

    res.status(200).json({
      message: "Profile fetched",
      data: {
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        referralCode: user.myReferralCode,
        walletId: user.walletId,
        walletAddress: wallet?.walletAddress,
        balance: wallet?.balance,
        transactionCount: txnCount
      }
    });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};