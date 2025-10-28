# 🚀 BloodChain Quick Setup Guide

## Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

### 3. Open Your Browser
```
http://localhost:5001
```

### 4. Connect MetaMask
- Click "Connect Wallet" button
- Approve the connection

### 5. Start Using!
- Register as a donor
- Record donations
- Earn BLC tokens!

---

## 🎯 Three Ways to Run BloodChain

### Option 1: Simple Mode (No Blockchain) ⚡️

**Best for**: Quick demo, testing, development

```bash
npm start
```

**Features Available**:
- ✅ All UI features
- ✅ Donor registration
- ✅ Donation recording
- ✅ Reward tracking (in-memory)
- ✅ Blood inventory
- ✅ Statistics dashboard
- ❌ Real token transfers
- ❌ On-chain verification

### Option 2: With Local Blockchain 🔗

**Best for**: Full testing with real tokens

**Terminal 1 - Start Hardhat Node:**
```bash
npm run node
```

**Terminal 2 - Deploy Contracts:**
```bash
npm run compile
npm run deploy
```

**Terminal 3 - Start Server:**
```bash
npm start
```

**Features Available**:
- ✅ All features from Simple Mode
- ✅ Real ERC20 tokens
- ✅ On-chain transactions
- ✅ Smart contract interactions
- ❌ BigchainDB certificates

### Option 3: Full Stack (With BigchainDB) 🌟

**Best for**: Production-like environment

**Prerequisites**:
```bash
# Install BigchainDB (Docker)
docker pull bigchaindb/bigchaindb:latest
docker run -d -p 9984:9984 bigchaindb/bigchaindb:latest
```

**Then follow Option 2 + configure `.env`:**
```env
BIGCHAINDB_API_URL=http://localhost:9984/api/v1/
```

**Features Available**:
- ✅ All features
- ✅ Immutable certificates
- ✅ Certificate verification

---

## 📝 Step-by-Step: First Donation

### 1. **Connect Your Wallet**
- Open http://localhost:5001
- Click "Connect Wallet"
- Approve MetaMask connection
- See your address displayed

### 2. **Register as Donor**
- Click "Register Donor" tab
- Fill in:
  ```
  Name: John Doe
  Blood Type: O+
  Email: john@example.com (optional)
  Phone: +1234567890 (optional)
  ```
- Wallet address is auto-filled
- Click "Register Donor"

### 3. **Record First Donation**
- Click "Record Donation" tab
- Wallet address is already filled
- Select: Blood Type: O+
- Quantity: 350 ml
- Location: City Hospital
- Click "Record Donation"

### 4. **Check Your Rewards**
- Click "My Wallet" tab
- See: **100 BLC** (first donation bonus!)
- View your donation history
- Track your milestones

---

## 🎮 Testing the Reward System

### Test Scenario 1: First Donation
```
Donor: Alice
Donation 1 → Reward: 100 BLC ✨
```

### Test Scenario 2: Regular Donations
```
Donation 2 → Reward: 50 BLC
Donation 3 → Reward: 50 BLC
Donation 4 → Reward: 50 BLC
```

### Test Scenario 3: Milestone Bonus
```
Donation 5 → Reward: 50 + 20 = 70 BLC! 🎉
Donation 10 → Reward: 50 + 20 = 70 BLC! 🎉
```

---

## 🔧 Troubleshooting

### Problem: "Please install MetaMask"

**Solution**:
1. Install [MetaMask extension](https://metamask.io/)
2. Create or import a wallet
3. Refresh the page
4. Click "Connect Wallet"

### Problem: "Donor not found"

**Solution**:
1. Make sure you registered first
2. Use the same wallet address
3. Check "Donors" tab to see all registered donors

### Problem: Contract deployment failed

**Solution**:
```bash
# Kill any existing Hardhat node
pkill -f hardhat

# Restart Hardhat node
npm run node

# In new terminal, deploy again
npm run deploy
```

### Problem: Port 5001 already in use

**Solution**:
```bash
# Change port in .env
echo "PORT=5002" > .env

# Or kill the process
lsof -ti:5001 | xargs kill
```

---

## 💡 Pro Tips

### Tip 1: Import Test Account to MetaMask
When using Hardhat node, import one of the test accounts:

```bash
# Hardhat provides 20 test accounts with 10000 ETH each
# Copy a private key from terminal and import to MetaMask
```

### Tip 2: Quick Reset
To reset all data:
```bash
# Stop server
# Restart server (in-memory data clears)
npm start
```

### Tip 3: View Real-time Updates
The dashboard auto-refreshes every 30 seconds. For manual refresh:
- Switch between tabs
- Dashboard will reload data

### Tip 4: Multiple Donors
Open browser in incognito mode with different MetaMask accounts to simulate multiple donors.

---

## 📊 System Check

Verify your setup is working:

```bash
# Check if server is running
curl http://localhost:5001/api/stats

# Expected response:
{
  "totalDonors": 0,
  "totalDonations": 0,
  "totalUnitsCollected": 0,
  "bloodInventory": {...},
  "recentDonations": []
}
```

---

## 🎯 What to Demo

### 1. **Dashboard Overview**
- Show real-time statistics
- Display blood inventory
- Recent donations feed

### 2. **Donor Registration**
- Register new donor
- Automatic wallet integration
- Profile creation

### 3. **Record Donation**
- Log a donation
- Show reward calculation
- Certificate issuance (if BigchainDB enabled)

### 4. **Token Rewards**
- First donation: 100 BLC
- Regular donation: 50 BLC
- Milestone bonus: +20 BLC
- View in "My Wallet"

### 5. **Blood Inventory**
- Real-time blood type tracking
- Quantity management
- Visual inventory display

---

## 🚀 Next Steps

After basic setup:

1. **Customize**: Edit colors in `public/index.html`
2. **Add Features**: Check `README.md` for API docs
3. **Deploy**: See deployment section in `README.md`
4. **Scale**: Add database, more features

---

## 📞 Need Help?

Check these files:
- `README.md` - Full documentation
- `contracts/` - Smart contract code
- `server.js` - Backend logic
- `public/index.html` - Frontend code

---

## ✅ Checklist

Before demo:
- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] MetaMask installed
- [ ] Server running (`npm start`)
- [ ] Wallet connected
- [ ] Test donor registered
- [ ] Test donation recorded
- [ ] Rewards visible

---

**You're all set! Start saving lives with BloodChain! 🩸**

