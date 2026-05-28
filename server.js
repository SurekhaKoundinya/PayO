// server.js (updated)
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const http = require("http");
const WebSocket = require("ws");

dotenv.config();

const connectDB = require("./config/db");
const websocketManager = require("./utils/websocketManager");
const binanceWebSocket = require("./services/binanceWebSocketService");
const realtimePriceCache = require("./cache/realtimePriceCache");
const sequelize = require("./config/postgres");
// PostgreSQL Models
require("./models/PostgresUser");
require("./models/PostgresWallet");
require("./models/PostgresTransaction");
require("./models/PostgresNotification");
require("./models/PostgresBank");
require("./models/PostgresRecent");
require("./models/PostgresOtp");
// cron
require("./cron/walletCron");

// routes
const authRoutes = require("./routes/authRoutes");
const walletRoutes = require("./routes/walletRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const marketRoutes = require("./routes/marketRoutes");
const updateMarketCache = require("./services/marketUpdater");
const bankRoutes = require("./routes/bankRoutes");
const tradingRoutes = require('./routes/tradingRoutes');

// connect MongoDB
connectDB();

// connect PostgreSQL
sequelize.sync({ alter: true })
  .then(() => {
    console.log("PostgreSQL connected");
  })
  .catch((err) => {
    console.log("PostgreSQL error:", err);
  });

// Initial fetch of static data
updateMarketCache();

// Refresh static data every 5 minutes
setInterval(() => {
  updateMarketCache();
}, 5 * 60 * 1000);

// Initialize Binance WebSocket for real-time prices
binanceWebSocket.connect();

// Connect WebSocket price updates to your cache and broadcast to clients
binanceWebSocket.on('marketUpdate', (marketData) => {
  // Update real-time price cache
  realtimePriceCache.updatePrices(marketData);
  
  // Broadcast to all connected WebSocket clients
  websocketManager.broadcastMarketData(marketData);
});

const app = express();
const server = http.createServer(app);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/bank", bankRoutes);
app.use("/api/trading", tradingRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date(),
    websocketConnected: binanceWebSocket.isConnected,
    realtimePricesCount: realtimePriceCache.getAllPrices().length
  });
});

// Initialize WebSocket Server for client connections
const wss = new WebSocket.Server({ server });
websocketManager.initialize(wss);

// Start Server
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("WebSocket server ready for live updates");
  console.log("Binance WebSocket connecting for real-time prices...");
});