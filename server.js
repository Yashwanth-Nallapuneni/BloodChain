const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from "public"
app.use(express.static(path.join(__dirname, "public")));

// Ensure uploads folder exists
const UPLOADS_FOLDER = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOADS_FOLDER)) fs.mkdirSync(UPLOADS_FOLDER);

// Configure multer storage
const storage = multer.diskStorage({
  destination: UPLOADS_FOLDER,
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Mock blockchain ledger
let blockchainLedger = [];

// Mock data stores
let donors = [];
let donations = [];
let bloodInventory = {
  "A+": 0, "A-": 0, "B+": 0, "B-": 0,
  "O+": 0, "O-": 0, "AB+": 0, "AB-": 0
};

// Blockchain setup (optional - works without actual blockchain)
let provider, wallet, bloodCoinContract, bloodBankContract;

try {
  // Load deployment info if exists
  const deploymentPath = path.join(__dirname, "deployment.json");
  if (fs.existsSync(deploymentPath)) {
    const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
    
    // Connect to blockchain
    provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL || "http://127.0.0.1:8545");
    
    // Load contract ABIs
    const BloodCoinABI = require("./artifacts/contracts/BloodCoin.sol/BloodCoin.json").abi;
    const BloodBankABI = require("./artifacts/contracts/BloodBank.sol/BloodBank.json").abi;
    
    // Create contract instances (read-only for now)
    bloodCoinContract = new ethers.Contract(deployment.bloodCoin, BloodCoinABI, provider);
    bloodBankContract = new ethers.Contract(deployment.bloodBank, BloodBankABI, provider);
    
    console.log("✅ Connected to blockchain contracts");
  } else {
    console.log("⚠️  No deployment found. Run: npx hardhat run scripts/deploy.js --network localhost");
  }
} catch (error) {
  console.log("⚠️  Blockchain not available. Running in mock mode.");
}

// BigchainDB setup (optional)
let bigchainDB;
try {
  const BigChainDBService = require("./bigchaindb.js");
  bigchainDB = new BigChainDBService(process.env.BIGCHAINDB_API_URL);
  console.log("✅ BigchainDB service initialized");
} catch (error) {
  console.log("⚠️  BigchainDB not available. Certificates will be stored locally.");
}

// Serve index.html explicitly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Upload document endpoint
app.post("/api/upload", upload.single("document"), (req, res) => {
  const { organization } = req.body;
  const file = req.file;

  if (!organization || !file)
    return res.status(400).json({ message: "Organization and file required" });

  const tx = {
    id: blockchainLedger.length + 1,
    organization,
    filename: file.filename,
    timestamp: new Date(),
    txHash: "0x" + Math.random().toString(16).substring(2, 10),
  };

  blockchainLedger.push(tx);
  res.json({ message: "Transaction confirmed on BloodChain", tx });
});

// Fetch blockchain ledger
app.get("/api/ledger", (req, res) => {
  res.json(blockchainLedger);
});

// Register a new donor
app.post("/api/donors/register", async (req, res) => {
  try {
    const { name, email, bloodType, phone, address, walletAddress } = req.body;
    
    if (!name || !bloodType || !walletAddress) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    const donor = {
      id: donors.length + 1,
      name,
      email,
      bloodType,
      phone,
      address,
      walletAddress,
      donationCount: 0,
      totalRewards: 0,
      registeredAt: new Date()
    };
    
    donors.push(donor);
    
    res.json({
      success: true,
      message: "Donor registered successfully",
      donor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

// Record a donation
app.post("/api/donations/record", async (req, res) => {
  try {
    const { donorWallet, bloodType, quantity, location, hospitalId } = req.body;
    
    if (!donorWallet || !bloodType || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    // Find donor
    const donor = donors.find(d => d.walletAddress.toLowerCase() === donorWallet.toLowerCase());
    
    if (!donor) {
      return res.status(404).json({ message: "Donor not found. Please register first." });
    }
    
    // Record donation
    const donation = {
      id: donations.length + 1,
      donorId: donor.id,
      donorWallet,
      bloodType,
      quantity: parseInt(quantity),
      location,
      hospitalId: hospitalId || "HOSP001",
      timestamp: new Date(),
      txHash: "0x" + Math.random().toString(16).substring(2, 18),
      certificateId: null
    };
    
    donations.push(donation);
    
    // Update inventory
    bloodInventory[bloodType] = (bloodInventory[bloodType] || 0) + parseInt(quantity);
    
    // Update donor stats
    donor.donationCount++;
    
    // Calculate rewards
    const reward = donor.donationCount === 1 ? 100 : 50;
    const bonus = donor.donationCount % 5 === 0 ? 20 : 0;
    const totalReward = reward + bonus;
    donor.totalRewards += totalReward;
    
    // Issue certificate on BigchainDB if available
    let certificate = null;
    if (bigchainDB) {
      try {
        certificate = await bigchainDB.issueDonorCertificate({
          donorId: donor.id,
          name: donor.name,
          bloodType,
          quantity,
          location,
          hospitalId: hospitalId || "HOSP001",
          donationType: "Whole Blood"
        });
        
        if (certificate.success) {
          donation.certificateId = certificate.transactionId;
        }
      } catch (error) {
        console.error("Certificate issuance failed:", error);
      }
    }
    
    res.json({
      success: true,
      message: "Donation recorded successfully! 🎉",
      donation,
      rewards: {
        baseReward: reward,
        bonus: bonus,
        total: totalReward,
        donationCount: donor.donationCount
      },
      certificate: certificate ? {
        id: certificate.transactionId,
        number: certificate.certificateNumber
      } : null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to record donation", error: error.message });
  }
});

// Get blood inventory
app.get("/api/inventory", (req, res) => {
  res.json({
    inventory: bloodInventory,
    lastUpdated: new Date()
  });
});

// Get donor information
app.get("/api/donors/:wallet", async (req, res) => {
  try {
    const { wallet } = req.params;
    const donor = donors.find(d => d.walletAddress.toLowerCase() === wallet.toLowerCase());
    
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    
    const donorDonations = donations.filter(d => d.donorWallet.toLowerCase() === wallet.toLowerCase());
    
    // Get blockchain balance if available
    let tokenBalance = 0;
    if (bloodCoinContract) {
      try {
        const balance = await bloodCoinContract.balanceOf(wallet);
        tokenBalance = parseFloat(ethers.formatEther(balance));
      } catch (error) {
        console.error("Failed to fetch token balance:", error);
      }
    }
    
    res.json({
      donor,
      donations: donorDonations,
      stats: {
        totalDonations: donor.donationCount,
        totalRewards: donor.totalRewards,
        tokenBalance: tokenBalance
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch donor info", error: error.message });
  }
});

// Get all donors
app.get("/api/donors", (req, res) => {
  res.json({
    donors: donors.map(d => ({
      id: d.id,
      name: d.name,
      bloodType: d.bloodType,
      donationCount: d.donationCount,
      totalRewards: d.totalRewards,
      walletAddress: d.walletAddress
    }))
  });
});

// Get all donations
app.get("/api/donations", (req, res) => {
  res.json({
    donations: donations.map(d => ({
      ...d,
      donorName: donors.find(donor => donor.id === d.donorId)?.name || "Unknown"
    }))
  });
});

// Verify certificate
app.get("/api/certificates/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!bigchainDB) {
      return res.status(503).json({ message: "Certificate service not available" });
    }
    
    const result = await bigchainDB.verifyCertificate(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to verify certificate", error: error.message });
  }
});

// Get statistics
app.get("/api/stats", (req, res) => {
  res.json({
    totalDonors: donors.length,
    totalDonations: donations.length,
    totalUnitsCollected: donations.reduce((sum, d) => sum + d.quantity, 0),
    bloodInventory: bloodInventory,
    recentDonations: donations.slice(-10).reverse()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🩸 ========================================`);
  console.log(`   BloodChain Server Running`);
  console.log(`   Port: ${PORT}`);
  console.log(`   URL: http://localhost:${PORT}`);
  console.log(`========================================\n`);
});