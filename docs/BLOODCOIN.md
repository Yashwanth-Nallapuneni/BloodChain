# 🪙 BloodCoin (BLC) - ERC20 Token Guide

## Overview

BloodCoin (BLC) is an ERC20 token that rewards blood donors for their contributions. The token incentivizes regular donations and creates a sustainable ecosystem for blood banks.

## Token Details

| Property | Value |
|----------|-------|
| Name | BloodCoin |
| Symbol | BLC |
| Type | ERC20 |
| Decimals | 18 |
| Initial Supply | 1,000,000 BLC |
| Network | Ethereum (or any EVM-compatible chain) |

## Smart Contract Functions

### For Donors

#### `balanceOf(address donor)`
Check your BLC token balance
```javascript
const balance = await bloodCoinContract.balanceOf(donorAddress);
console.log(`Balance: ${ethers.formatEther(balance)} BLC`);
```

#### `transfer(address to, uint256 amount)`
Transfer BLC tokens to another address
```javascript
await bloodCoinContract.transfer(recipientAddress, ethers.parseEther("10"));
```

#### `getDonorInfo(address donor)`
Get complete donor information
```javascript
const [donations, totalRewards, balance] = await bloodCoinContract.getDonorInfo(donorAddress);
console.log(`Donations: ${donations}, Rewards: ${totalRewards}, Balance: ${balance}`);
```

### For Hospitals (Verified Only)

#### `recordDonation(address donor)`
Record a donation and automatically reward the donor
```javascript
// Only verified hospitals can call this
await bloodCoinContract.recordDonation(donorAddress);
```

### For Admin/Owner

#### `verifyHospital(address hospital)`
Add a hospital to verified list
```javascript
await bloodCoinContract.verifyHospital(hospitalAddress);
```

#### `revokeHospital(address hospital)`
Remove a hospital from verified list
```javascript
await bloodCoinContract.revokeHospital(hospitalAddress);
```

#### `mint(address to, uint256 amount)`
Mint new tokens (owner only)
```javascript
await bloodCoinContract.mint(recipientAddress, ethers.parseEther("1000"));
```

## Reward Structure

### 🎁 First Donation
```
Reward: 100 BLC
Trigger: First donation ever
Message: "Welcome to BloodChain!"
```

### 🩸 Regular Donation
```
Reward: 50 BLC
Trigger: Every donation after the first
Message: "Thank you for donating!"
```

### 🏆 Milestone Bonus
```
Bonus: +20 BLC
Trigger: Every 5th donation (5, 10, 15, 20...)
Message: "Milestone achieved!"
Total: 50 + 20 = 70 BLC
```

## Example Scenarios

### Scenario 1: New Donor - First Year
```
Donation 1:  100 BLC (first time bonus)
Donation 2:   50 BLC
Donation 3:   50 BLC
Donation 4:   50 BLC
Donation 5:   70 BLC (50 + 20 milestone)
-----------------
Total:       320 BLC
```

### Scenario 2: Frequent Donor - 10 Donations
```
Donation 1:   100 BLC
Donations 2-4: 150 BLC (50 × 3)
Donation 5:    70 BLC (milestone)
Donations 6-9: 200 BLC (50 × 4)
Donation 10:   70 BLC (milestone)
-----------------
Total:        590 BLC
```

### Scenario 3: Super Donor - 20 Donations
```
Donation 1:    100 BLC
Donations 2-4: 150 BLC
Donation 5:     70 BLC
Donations 6-9: 200 BLC
Donation 10:    70 BLC
Donations 11-14: 200 BLC
Donation 15:    70 BLC
Donations 16-19: 200 BLC
Donation 20:    70 BLC
-----------------
Total:       1,130 BLC
```

## Token Utilities

### Current Features
- ✅ Instant rewards for donations
- ✅ Transferable between donors
- ✅ Viewable balance in wallet
- ✅ Tracked on blockchain
- ✅ Milestone bonuses

### Future Utilities (Planned)
- 🔜 Redeem for health checkups
- 🔜 Priority blood requests
- 🔜 Exchange with partner hospitals
- 🔜 Discount on medical services
- 🔜 Governance voting rights
- 🔜 NFT badge redemption
- 🔜 Token staking for benefits
- 🔜 Marketplace trading

## How to Use BLC Tokens

### 1. Earn Tokens
- Register as a donor
- Donate blood at verified hospitals
- Receive instant BLC rewards
- Track in "My Wallet" tab

### 2. View Balance
**In Dashboard:**
- Connect MetaMask
- Go to "My Wallet" tab
- See your BLC balance

**In MetaMask:**
- Add custom token
- Contract Address: (from deployment.json)
- Symbol: BLC
- Decimals: 18

### 3. Transfer Tokens
```javascript
// Using the dashboard (coming soon)
// Or use MetaMask directly
```

### 4. Redeem Tokens
*Coming soon - partner integrations*

## Adding BLC to MetaMask

1. Open MetaMask
2. Click "Import tokens"
3. Select "Custom token"
4. Enter:
   - Token Contract Address: `[from deployment.json]`
   - Token Symbol: `BLC`
   - Token Decimals: `18`
5. Click "Add Custom Token"
6. Confirm

## Security Features

### Hospital Verification
- Only verified hospitals can record donations
- Prevents unauthorized token minting
- Owner can add/remove hospitals

### Ownership Controls
- Owner can mint tokens (emergency supply)
- Owner manages hospital verification
- Transparent on-chain governance

### Audit Points
- Based on OpenZeppelin contracts
- Standard ERC20 implementation
- No hidden fees or taxes
- Fully transparent

## Contract Events

The contract emits these events for tracking:

```solidity
event HospitalVerified(address indexed hospital);
event HospitalRevoked(address indexed hospital);
event DonationRecorded(address indexed donor, uint256 reward, uint256 timestamp);
event TokensRedeemed(address indexed donor, uint256 amount);
```

## Tokenomics

### Supply Distribution
```
Initial Supply: 1,000,000 BLC

Allocation:
- 50% (500,000) - Donor Rewards Reserve
- 20% (200,000) - Hospital Incentives
- 15% (150,000) - Partnership Fund
- 10% (100,000) - Team & Development
- 5%  (50,000)  - Emergency Reserve
```

### Emission Rate
Based on average 1,000 donations/month:
```
Average donation reward: 50 BLC
Monthly emission: ~50,000 BLC
Yearly emission: ~600,000 BLC
Reserve lasts: ~10 months (can mint more)
```

## Integration Guide

### For Web Applications

```javascript
// Import ethers
import { ethers } from 'ethers';

// Connect to contract
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const bloodCoinContract = new ethers.Contract(
  BLOODCOIN_ADDRESS,
  BLOODCOIN_ABI,
  signer
);

// Check balance
const balance = await bloodCoinContract.balanceOf(address);
console.log(`Balance: ${ethers.formatEther(balance)} BLC`);

// Get donor info
const [donations, rewards, bal] = await bloodCoinContract.getDonorInfo(address);
```

### For Backend Services

```javascript
// server.js already includes this
const { ethers } = require('ethers');
const provider = new ethers.JsonRpcProvider(RPC_URL);
const bloodCoinContract = new ethers.Contract(
  BLOODCOIN_ADDRESS,
  BLOODCOIN_ABI,
  provider
);
```

## FAQ

**Q: How do I get BLC tokens?**
A: Register as a donor and donate blood at verified hospitals.

**Q: Can I buy BLC tokens?**
A: Currently no - tokens are earned through donations only.

**Q: What can I do with BLC tokens?**
A: Transfer to others, future redemption for health services (planned).

**Q: Do tokens expire?**
A: No, BLC tokens don't expire and are yours forever.

**Q: Can I sell BLC tokens?**
A: Currently designed for the BloodChain ecosystem only.

**Q: How do I track my rewards?**
A: Use the "My Wallet" tab in the dashboard.

**Q: What if I lose my wallet?**
A: Always backup your wallet seed phrase. Lost wallets cannot be recovered.

**Q: Are there transaction fees?**
A: Standard Ethereum gas fees apply for transfers.

## Support

For token-related issues:
1. Check your wallet connection
2. Verify contract deployment
3. Check blockchain explorer
4. Review server logs

---

**Start earning BLC tokens by saving lives! 🩸**

