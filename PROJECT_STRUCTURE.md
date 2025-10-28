# 📁 BloodChain Project Structure

```
BloodChain/
│
├── 📄 README.md                    # Main project documentation
├── 📄 package.json                 # Project dependencies & scripts
├── 📄 package-lock.json            # Locked dependency versions
├── 📄 hardhat.config.js            # Hardhat configuration
├── 📄 env.template                 # Environment variables template
├── 📄 .gitignore                   # Git ignore rules
│
├── 📁 contracts/                   # Smart Contracts
│   ├── BloodCoin.sol              # ERC20 Token contract
│   └── BloodBank.sol              # Blood donation management contract
│
├── 📁 scripts/                     # Deployment Scripts
│   └── deploy.js                  # Smart contract deployment script
│
├── 📁 src/                         # Source Code
│   ├── server.js                  # Express.js backend server
│   └── bigchaindb.js              # BigchainDB service for certificates
│
├── 📁 public/                      # Frontend Files
│   └── index.html                 # Dashboard UI (Single-page app)
│
├── 📁 demo/                        # Demo & Testing
│   └── demo_bigchaindb.js         # BigchainDB demo script
│
├── 📁 docs/                        # Documentation
│   ├── SETUP.md                   # Quick setup guide
│   ├── PROJECT_SUMMARY.md         # Complete project overview
│   ├── QUICK_REFERENCE.md         # One-page quick reference
│   ├── BLOODCOIN.md               # BloodCoin token documentation
│   ├── BIGCHAINDB_SHOWCASE.md     # BigchainDB integration details
│   ├── BIGCHAINDB_QUICK_GUIDE.txt # Visual BigchainDB guide
│   ├── FOR_PROJECT_REPORT.md      # Project report material
│   └── REPORT_SCREENSHOTS.md      # Screenshot guide for reports
│
├── 📁 uploads/                     # File Upload Storage
│   └── .gitkeep                   # Keep directory in git
│
├── 📁 node_modules/                # Dependencies (not in git)
├── 📁 cache/                       # Hardhat cache (not in git)
└── 📁 artifacts/                   # Compiled contracts (not in git)
```

## 📂 Directory Details

### `/contracts`
Smart contracts written in Solidity:
- **BloodCoin.sol** - ERC20 token with automated rewards
- **BloodBank.sol** - Donation and request management

### `/scripts`
Deployment and automation scripts:
- **deploy.js** - Deploys contracts to blockchain network

### `/src`
Backend source code:
- **server.js** - Express.js REST API server
- **bigchaindb.js** - Certificate issuance service

### `/public`
Frontend application:
- **index.html** - Complete dashboard with 7 tabs

### `/demo`
Demonstration scripts:
- **demo_bigchaindb.js** - Generate sample certificate data

### `/docs`
Comprehensive documentation:
- Setup guides
- API documentation
- Token economics
- Project reports

### `/uploads`
Storage for uploaded documents (gitignored except .gitkeep)

## 🚀 Quick Commands

```bash
# Install dependencies
npm install

# Start server
npm start

# Run demo
npm demo

# Compile contracts
npm run compile

# Deploy contracts
npm run deploy
```

## 📊 File Count

- **Smart Contracts**: 2 files (~200 lines)
- **Source Code**: 2 files (~500 lines)
- **Frontend**: 1 file (~1000 lines)
- **Documentation**: 8 files (~3500 lines)
- **Scripts**: 2 files (~150 lines)
- **Total Custom Code**: ~5,500 lines

## 🔗 Key Entry Points

- **Server**: `src/server.js`
- **Frontend**: `public/index.html`
- **Contracts**: `contracts/BloodCoin.sol`
- **Demo**: `demo/demo_bigchaindb.js`
- **Docs**: `README.md` → `docs/SETUP.md`

---

**Clean, organized, and production-ready!** ✨

