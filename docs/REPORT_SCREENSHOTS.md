# 📸 Screenshots & Outputs for Project Report

## How to Generate Report Material

### 1. Run the Demo Script

```bash
node demo_bigchaindb.js
```

This will generate:
- ✅ Sample certificate data (JSON format)
- ✅ API request/response examples
- ✅ Data flow visualization
- ✅ Code statistics

**Copy the output** and include in your report!

---

## 2. Take These Screenshots

### Screenshot 1: Server Running with BigchainDB

**What to show**: Server console output

**How to get it**:
```bash
npm start
```

**Should show**:
```
🩸 ========================================
   BloodChain Server Running
   Port: 5001
   URL: http://localhost:5001
========================================

✅ BigchainDB service initialized
```

**For Report**: "Figure 1: Server initialization showing BigchainDB service ready"

---

### Screenshot 2: Donation with Certificate

**What to show**: API response showing certificate issuance

**How to get it**:
1. Open dashboard: http://localhost:5001
2. Connect wallet
3. Register as donor
4. Record a donation
5. Open browser DevTools (F12) → Network tab
6. Look for the `/api/donations/record` response

**Should show**:
```json
{
  "success": true,
  "message": "Donation recorded successfully! 🎉",
  "donation": {...},
  "rewards": {...},
  "certificate": {
    "id": "a1b2c3d4e5f6...",
    "number": "BLC-1730123456789"
  }
}
```

**For Report**: "Figure 2: API response showing certificate issued on BigchainDB"

---

### Screenshot 3: Dashboard Showing Certificates

**What to show**: Dashboard with certificates displayed

**How to get it**:
1. Open dashboard
2. Go to "Donation History" tab
3. See certificates column with "✓ Issued" badges

**For Report**: "Figure 3: Dashboard displaying BigchainDB certificates"

---

### Screenshot 4: Code - bigchaindb.js

**What to show**: The BigchainDB service code

**How to get it**:
1. Open `bigchaindb.js` in your editor
2. Take screenshot showing the `issueDonorCertificate` function

**For Report**: "Figure 4: BigchainDB service implementation"

---

### Screenshot 5: Code - Server Integration

**What to show**: Server code calling BigchainDB

**How to get it**:
1. Open `server.js` in your editor
2. Go to lines 189-209 (certificate issuance code)
3. Take screenshot

**For Report**: "Figure 5: Server integration with BigchainDB"

---

### Screenshot 6: My Wallet with Certificate

**What to show**: Personal wallet showing certificates

**How to get it**:
1. Dashboard → "My Wallet" tab
2. See donation history with certificate IDs

**For Report**: "Figure 6: Donor wallet showing verified certificates"

---

## 3. Tables for Report

### Table 1: BigchainDB Integration Points

| Component | Location | Purpose |
|-----------|----------|---------|
| Service Class | `bigchaindb.js` | Certificate management |
| Server Integration | `server.js` lines 70-78 | Service initialization |
| Donation API | `server.js` lines 189-209 | Certificate issuance |
| Verification API | `server.js` lines 302-317 | Certificate verification |
| Dashboard Display | `index.html` lines 580-595 | Certificate UI |

### Table 2: BigchainDB Functions

| Function | Purpose | Input | Output |
|----------|---------|-------|--------|
| `issueDonorCertificate()` | Create certificate | Donor data | Transaction ID |
| `verifyCertificate()` | Verify certificate | Transaction ID | Certificate data |
| `searchCertificates()` | Search certificates | Query string | Certificate list |
| `transferCertificate()` | Transfer ownership | TX ID, keys | New TX ID |

### Table 3: Certificate Data Structure

| Field | Type | Example |
|-------|------|---------|
| type | String | "DonorCertificate" |
| donorId | String | "D001" |
| donorName | String | "John Doe" |
| bloodType | String | "O+" |
| donationDate | ISO String | "2025-10-28T10:30:00Z" |
| quantity | Number | 350 |
| certificateNumber | String | "BLC-1730123456789" |
| verified | Boolean | true |

---

## 4. Sample Code Snippets for Report

### Code Snippet 1: Certificate Issuance

```javascript
// Automatic certificate issuance on donation
let certificate = null;
if (bigchainDB) {
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
}
```

### Code Snippet 2: Certificate Data Structure

```javascript
const certificateAsset = {
  data: {
    type: 'DonorCertificate',
    donorId: donorData.donorId,
    donorName: donorData.name,
    bloodType: donorData.bloodType,
    donationDate: new Date().toISOString(),
    location: donorData.location,
    quantity: donorData.quantity,
    certificateNumber: `BLC-${Date.now()}`,
    issuer: 'BloodChain Network',
    verified: true
  }
};
```

### Code Snippet 3: Transaction Creation

```javascript
const txCreateSimple = driver.Transaction.makeCreateTransaction(
  certificateAsset,
  metadata,
  [driver.Transaction.makeOutput(
    driver.Transaction.makeEd25519Condition(issuer.publicKey)
  )],
  issuer.publicKey
);

const txCreateSimpleSigned = driver.Transaction.signTransaction(
  txCreateSimple,
  issuer.privateKey
);

const result = await this.conn.postTransactionCommit(txCreateSimpleSigned);
```

---

## 5. Diagrams for Report

### Diagram 1: Architecture
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
           │                │                    │
           ▼                ▼                    ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
│  Ethereum    │  │  BigchainDB  │  │  In-Memory DB    │
│  (Tokens)    │  │ (Certificates)│  │  (Mock Data)     │
└──────────────┘  └──────────────┘  └──────────────────┘
```

### Diagram 2: Data Flow
```
Donor Registration
        │
        ▼
Blood Donation
        │
        ▼
Server receives donation data
        │
        ├─→ Update blood inventory
        ├─→ Calculate BLC rewards
        └─→ Issue BigchainDB certificate
                    │
                    ▼
        BigchainDB creates transaction
                    │
                    ▼
        Return certificate ID
                    │
                    ▼
        Display to donor
```

---

## 6. Sample API Outputs

### Output 1: Donation Response
```json
{
  "success": true,
  "message": "Donation recorded successfully! 🎉",
  "donation": {
    "id": 1,
    "donorId": 1,
    "donorWallet": "0x1234567890abcdef1234567890abcdef12345678",
    "bloodType": "O+",
    "quantity": 350,
    "location": "City Hospital",
    "hospitalId": "HOSP001",
    "timestamp": "2025-10-28T10:30:00.000Z",
    "txHash": "0xabcdef123456",
    "certificateId": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0"
  },
  "rewards": {
    "baseReward": 100,
    "bonus": 0,
    "total": 100,
    "donationCount": 1
  },
  "certificate": {
    "id": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
    "number": "BLC-1730123456789"
  }
}
```

### Output 2: Certificate Verification
```json
{
  "success": true,
  "certificate": {
    "type": "DonorCertificate",
    "donorId": "1",
    "donorName": "John Doe",
    "bloodType": "O+",
    "donationDate": "2025-10-28T10:30:00.000Z",
    "location": "City Hospital",
    "quantity": 350,
    "certificateNumber": "BLC-1730123456789",
    "issuer": "BloodChain Network",
    "verified": true
  },
  "metadata": {
    "timestamp": "2025-10-28T10:30:00.000Z",
    "hospitalId": "HOSP001",
    "donationType": "Whole Blood",
    "notes": "First time donor"
  },
  "timestamp": "2025-10-28T10:30:00.000Z",
  "verified": true
}
```

---

## 7. Text for Report Sections

### Section: Introduction to BigchainDB
```
BigchainDB is a blockchain database that offers immutability, 
decentralization, and asset ownership. In BloodChain, BigchainDB 
is utilized to issue verifiable donor certificates that serve as 
permanent proof of blood donations. Each certificate is stored as 
a digital asset on BigchainDB's distributed ledger, ensuring it 
cannot be altered or deleted.
```

### Section: Implementation
```
The BigchainDB integration is implemented through a dedicated 
service class (bigchaindb.js) that provides four core functions: 
certificate issuance, verification, search, and transfer. When a 
donor makes a blood donation through the BloodChain platform, the 
server automatically calls the certificate issuance function, 
which creates a cryptographically signed transaction on BigchainDB. 
The resulting transaction ID serves as a permanent reference to 
the certificate.
```

### Section: Benefits
```
The integration of BigchainDB provides several key benefits:

1. Immutability: Once issued, certificates cannot be altered
2. Verifiability: Anyone can verify a certificate using its ID
3. Decentralization: No single point of failure
4. Transparency: All certificates are auditable
5. Trust: Cryptographic security ensures authenticity
6. Compliance: Permanent audit trail for regulations
```

---

## 8. Quick Commands

### Generate demo output:
```bash
node demo_bigchaindb.js > bigchaindb_demo_output.txt
```

### Start server and show BigchainDB init:
```bash
npm start | grep BigchainDB
```

### Test API (if server running):
```bash
# Record donation
curl -X POST http://localhost:5001/api/donations/record \
  -H "Content-Type: application/json" \
  -d '{"donorWallet":"0x123...","bloodType":"O+","quantity":350,"location":"City Hospital"}'
```

---

## 9. Checklist for Report

**Before submitting your report, make sure you have:**

- [ ] Screenshot of server running with BigchainDB
- [ ] Screenshot of API response with certificate
- [ ] Screenshot of dashboard showing certificates
- [ ] Code snippet of certificate issuance
- [ ] Code snippet of certificate verification
- [ ] Architecture diagram
- [ ] Data flow diagram
- [ ] Sample JSON outputs
- [ ] Table showing integration points
- [ ] Explanation of benefits
- [ ] Demo output (from demo_bigchaindb.js)

---

## 10. Pro Tips

**Tip 1**: Use syntax highlighting when including code in your report

**Tip 2**: Number all figures and tables (Figure 1, Table 1, etc.)

**Tip 3**: Reference the line numbers from actual code files

**Tip 4**: Include both the request AND response for API examples

**Tip 5**: Explain what each field means in certificate data

**Tip 6**: Show the graceful degradation (works without BigchainDB)

**Tip 7**: Mention security features (cryptographic signing, etc.)

---

**You now have everything you need to showcase BigchainDB in your project report!** 📊✨

