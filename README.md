# 🩸 BloodChain: Decentralized Blood Bank Registry

A comprehensive blockchain-based blood bank management system with ERC20 token rewards, BigchainDB certificates, and Ethereum smart contracts.

## 🎯 Project Overview

BloodChain is a decentralized platform that maintains real-time blood availability with verified donors. The system integrates multiple blockchain technologies to create a secure, transparent, and rewarding ecosystem for blood donation.

### Key Features

- **Ethereum Smart Contracts**: Log donations and requests on-chain
- **ERC20 Token (BloodCoin - BLC)**: Reward frequent donors with cryptocurrency
- **BigchainDB Integration**: Issue immutable donor certificates
- **Real-time Dashboard**: Modern web interface for donor registration and tracking
- **Wallet Integration**: MetaMask support for token management
- **Blood Inventory Management**: Track blood types and availability
- **Reward System**: 
  - 100 BLC for first donation
  - 50 BLC for regular donations
  - 20 BLC bonus every 5th donation

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Dashboard                    │
│           (HTML5, CSS3, JavaScript, Ethers.js)          │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  Express.js Server                       │
│              (REST API, Business Logic)                  │
└─────────────────────────────────────────────────────────┘
           │                                    │
           ▼                                    ▼
┌─────────────────────┐              ┌───────────────────┐
│  Ethereum Network   │              │   BigchainDB      │
│  - BloodCoin (ERC20)│              │  (Certificates)   │
│  - BloodBank        │              │                   │
└─────────────────────┘              └───────────────────┘
```

## 📁 Project Structure

```
BloodChain/
├── contracts/      # Smart contracts (Solidity)
├── scripts/        # Deployment scripts
├── src/            # Backend source (server.js, bigchaindb.js)
├── public/         # Frontend dashboard
├── demo/           # Demo scripts
├── docs/           # Documentation
└── uploads/        # File storage
```

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed structure.

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MetaMask browser extension
- (Optional) BigchainDB instance
- (Optional) Hardhat local blockchain

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Create Environment File

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5001

# Blockchain Configuration (optional)
BLOCKCHAIN_RPC_URL=http://127.0.0.1:8545
PRIVATE_KEY=your_private_key_here

# Contract Addresses (update after deployment)
BLOODCOIN_CONTRACT_ADDRESS=
BLOODBANK_CONTRACT_ADDRESS=

# BigchainDB Configuration (optional)
BIGCHAINDB_API_URL=http://localhost:9984/api/v1/
BIGCHAINDB_APP_ID=your_app_id
BIGCHAINDB_APP_KEY=your_app_key
```

### Step 3: Compile Smart Contracts

```bash
npm run compile
```

### Step 4: Deploy Smart Contracts (Optional)

**Option A: Deploy to Local Hardhat Network**

In one terminal:
```bash
npm run node
```

In another terminal:
```bash
npm run deploy
```

**Option B: Run Without Blockchain**

The system works in mock mode without deploying contracts. Token rewards are tracked in-memory.

### Step 5: Start the Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

### Step 6: Run Demo (Optional)

Generate sample BigchainDB certificate data:
```bash
npm run demo
```

### Step 7: Access the Dashboard

Open your browser and navigate to:
```
http://localhost:5001
```

## 🎮 Usage Guide

### 1. Connect Your Wallet

- Click "Connect Wallet" in the header
- Approve the MetaMask connection
- Your wallet address will be displayed

### 2. Register as a Donor

- Go to "Register Donor" tab
- Fill in your details:
  - Full Name
  - Email (optional)
  - Blood Type
  - Phone (optional)
  - Address (optional)
- Wallet address is auto-filled
- Click "Register Donor"

### 3. Record a Donation

- Go to "Record Donation" tab
- Enter donor wallet address (or use connected wallet)
- Select blood type
- Enter quantity (ml)
- Enter location
- Click "Record Donation & Issue Certificate"
- Receive BLC tokens as reward!

### 4. View Your Rewards

- Go to "My Wallet" tab
- See your donation history
- View total BLC tokens earned
- Track your donation milestones

### 5. Monitor Blood Inventory

- Go to "Blood Inventory" tab
- View available units by blood type
- Real-time inventory updates

## 🪙 BloodCoin (BLC) Token Economics

### Token Details
- **Name**: BloodCoin
- **Symbol**: BLC
- **Type**: ERC20
- **Decimals**: 18
- **Initial Supply**: 1,000,000 BLC

### Reward Structure

| Action | Reward | Notes |
|--------|--------|-------|
| First Donation | 100 BLC | Welcome bonus |
| Regular Donation | 50 BLC | Standard reward |
| 5th Donation Milestone | +20 BLC | Loyalty bonus |
| 10th Donation Milestone | +20 BLC | Loyalty bonus |
| Every 5th Donation | +20 BLC | Continuing bonus |

### Future Token Utilities (Planned)
- Redeem for health checkups
- Priority blood requests
- Exchange with partner hospitals
- Governance voting rights

## 📜 Smart Contracts

### BloodCoin.sol

ERC20 token contract with:
- Hospital verification system
- Automated reward distribution
- Donor tracking
- Milestone bonuses

Key Functions:
```solidity
verifyHospital(address hospital)
recordDonation(address donor)
getDonorInfo(address donor)
```

### BloodBank.sol

Blood donation management contract:
- Record donations
- Create blood requests
- Match donors to recipients
- Track donation history

Key Functions:
```solidity
recordDonation(bloodType, quantity, location)
createRequest(bloodType, quantity, location)
fulfillRequest(requestId, donationId)
```

## 🔐 BigchainDB Integration

### Certificate Issuance

When a donation is recorded, the system automatically:
1. Creates a digital certificate on BigchainDB
2. Includes donor information, blood type, quantity, location
3. Generates unique certificate number (BLC-TIMESTAMP)
4. Returns immutable transaction ID

### Certificate Verification

Certificates can be verified using:
```
GET /api/certificates/:id
```

## 🌐 API Endpoints

### Donor Management
- `POST /api/donors/register` - Register a new donor
- `GET /api/donors` - Get all donors
- `GET /api/donors/:wallet` - Get donor by wallet address

### Donation Management
- `POST /api/donations/record` - Record a donation
- `GET /api/donations` - Get all donations

### Inventory & Stats
- `GET /api/inventory` - Get blood inventory
- `GET /api/stats` - Get system statistics

### Certificates
- `GET /api/certificates/:id` - Verify a certificate

### Legacy
- `POST /api/upload` - Upload documents
- `GET /api/ledger` - Get blockchain ledger

## 🎨 Dashboard Features

### Modern UI/UX
- **Dark Theme**: Eye-friendly design
- **Responsive**: Works on all devices
- **Real-time Updates**: Auto-refresh every 30 seconds
- **Wallet Integration**: MetaMask support
- **Notifications**: Success/error feedback

### Tabs
1. **📊 Dashboard** - Overview and recent donations
2. **✍️ Register Donor** - New donor registration
3. **❤️ Record Donation** - Log new donations
4. **🏥 Blood Inventory** - View available blood units
5. **👥 Donors** - All registered donors
6. **📜 Donation History** - Complete transaction log
7. **💰 My Wallet** - Personal rewards and history

## 🔧 Configuration Options

### Running Without Blockchain

The system works perfectly without deploying contracts:
- Rewards are tracked in-memory
- All features work except actual token transfers
- Perfect for demos and testing

### Running With Blockchain

Deploy contracts for full functionality:
- Real ERC20 tokens
- On-chain transaction records
- Token transfers and balances

### BigchainDB Setup

**Optional** - For certificate issuance:

1. Install BigchainDB
2. Configure API URL in `.env`
3. Certificates will be issued automatically

Without BigchainDB:
- Certificates are tracked locally
- All other features work normally

## 🧪 Testing

### Manual Testing
1. Start the server: `npm start`
2. Connect wallet via MetaMask
3. Register as donor
4. Record a donation
5. Check rewards in "My Wallet"

### Smart Contract Testing
```bash
npm test
```

## 🚀 Deployment

### Deploy to Production

1. Set up production blockchain network
2. Update `.env` with production RPC URL
3. Deploy contracts: `npm run deploy`
4. Update frontend with contract addresses
5. Deploy server to hosting platform (Heroku, AWS, etc.)

### Environment Variables for Production
```env
NODE_ENV=production
PORT=80
BLOCKCHAIN_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
BLOODCOIN_CONTRACT_ADDRESS=0x...
BLOODBANK_CONTRACT_ADDRESS=0x...
```

## 📊 System Statistics

The dashboard displays:
- Total registered donors
- Total donations recorded
- Blood units collected (ml)
- BLC tokens distributed
- Real-time blood inventory by type

## 🤝 Contributing

This is an educational project. Contributions welcome!

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Troubleshooting

### Wallet Not Connecting
- Ensure MetaMask is installed
- Check browser console for errors
- Try refreshing the page

### Blockchain Not Available
- System works in mock mode
- Start Hardhat node: `npm run node`
- Deploy contracts: `npm run deploy`

### BigchainDB Errors
- System works without BigchainDB
- Check BigchainDB service is running
- Verify API URL in `.env`

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API endpoints documentation
3. Check browser console for errors

## 🎯 Future Enhancements

- [ ] Hyperledger Fabric integration for hospital collaboration
- [ ] Mobile app (React Native)
- [ ] QR code for quick donation
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Token marketplace
- [ ] NFT badges for milestones

---

Built with ❤️ for the BloodChain project

