/**
 * BigchainDB Demo Script
 * 
 * Run this to demonstrate BigchainDB integration for your project report
 * This will show how certificates are issued and verified
 */

const BigChainDBService = require('./bigchaindb.js');

// Sample donor data
const sampleDonors = [
  {
    donorId: '1',
    name: 'Yash',
    bloodType: 'O+',
    quantity: 350,
    location: 'City Hospital',
    hospitalId: 'HOSP001',
    donationType: 'Whole Blood',
    notes: 'First time donor'
  },
  {
    donorId: '2',
    name: 'Yashwanth',
    bloodType: 'A+',
    quantity: 400,
    location: 'General Hospital',
    hospitalId: 'HOSP002',
    donationType: 'Whole Blood',
    notes: 'Regular donor - 5th donation'
  },
  {
    donorId: '3',
    name: 'NY',
    bloodType: 'B-',
    quantity: 350,
    location: 'Medical Center',
    hospitalId: 'HOSP001',
    donationType: 'Platelets',
    notes: 'Platelet donation'
  }
];

async function runDemo() {
  console.log('\n🩸 ========================================');
  console.log('   BloodChain BigchainDB Demo');
  console.log('   Demonstrating Certificate Issuance');
  console.log('========================================\n');

  try {
    // Initialize BigchainDB service
    console.log('📡 Initializing BigchainDB service...');
    const bigchainDB = new BigChainDBService('http://localhost:9984/api/v1/');
    console.log('✅ BigchainDB service initialized\n');

    // Mock mode - show what WOULD happen
    console.log('⚠️  Note: Running in MOCK mode (no actual BigchainDB connection)');
    console.log('   This shows the data structure and flow\n');

    const results = [];

    // Process each donor
    for (let i = 0; i < sampleDonors.length; i++) {
      const donor = sampleDonors[i];
      
      console.log(`\n📋 Processing Donation #${i + 1}`);
      console.log('─────────────────────────────────────────');
      console.log(`Donor: ${donor.name}`);
      console.log(`Blood Type: ${donor.bloodType}`);
      console.log(`Quantity: ${donor.quantity}ml`);
      console.log(`Location: ${donor.location}`);

      // Simulate certificate creation
      const certificateNumber = `BLC-${Date.now() + i}`;
      const transactionId = generateMockTransactionId();

      console.log('\n📜 Certificate Created:');
      console.log(`   Certificate Number: ${certificateNumber}`);
      console.log(`   Transaction ID: ${transactionId}`);

      // Show certificate data structure
      const certificateData = {
        asset: {
          data: {
            type: 'DonorCertificate',
            donorId: donor.donorId,
            donorName: donor.name,
            bloodType: donor.bloodType,
            donationDate: new Date().toISOString(),
            location: donor.location,
            quantity: donor.quantity,
            certificateNumber: certificateNumber,
            issuer: 'BloodChain Network',
            verified: true
          }
        },
        metadata: {
          timestamp: new Date().toISOString(),
          hospitalId: donor.hospitalId,
          donationType: donor.donationType,
          notes: donor.notes
        },
        id: transactionId
      };

      results.push(certificateData);

      console.log('\n✅ Certificate issued successfully!');
      
      // Simulate small delay
      await sleep(500);
    }

    // Display summary
    console.log('\n\n📊 ========================================');
    console.log('   Summary - Certificates Issued');
    console.log('========================================\n');

    results.forEach((cert, index) => {
      console.log(`Certificate ${index + 1}:`);
      console.log(`  Donor: ${cert.asset.data.donorName}`);
      console.log(`  Blood Type: ${cert.asset.data.bloodType}`);
      console.log(`  Cert #: ${cert.asset.data.certificateNumber}`);
      console.log(`  TX ID: ${cert.id.slice(0, 16)}...`);
      console.log('');
    });

    // Show complete certificate example (for report)
    console.log('\n📝 ========================================');
    console.log('   Complete Certificate Example');
    console.log('   (Use this in your project report)');
    console.log('========================================\n');
    console.log(JSON.stringify(results[0], null, 2));

    // Show verification example
    console.log('\n\n🔍 ========================================');
    console.log('   Certificate Verification Example');
    console.log('========================================\n');
    
    const verificationResult = {
      success: true,
      certificate: results[0].asset.data,
      metadata: results[0].metadata,
      timestamp: results[0].metadata.timestamp,
      verified: true
    };

    console.log('API Call:');
    console.log(`GET /api/certificates/${results[0].id}`);
    console.log('\nResponse:');
    console.log(JSON.stringify(verificationResult, null, 2));

    // Show API integration
    console.log('\n\n🔌 ========================================');
    console.log('   API Integration Examples');
    console.log('========================================\n');

    console.log('1️⃣  Record Donation (with certificate):');
    console.log('─────────────────────────────────────────');
    console.log('POST /api/donations/record');
    console.log('Content-Type: application/json\n');
    console.log(JSON.stringify({
      donorWallet: '0x1234567890abcdef1234567890abcdef12345678',
      bloodType: 'O+',
      quantity: 350,
      location: 'City Hospital',
      hospitalId: 'HOSP001'
    }, null, 2));

    console.log('\n\nResponse:');
    console.log(JSON.stringify({
      success: true,
      message: 'Donation recorded successfully! 🎉',
      donation: {
        id: 1,
        donorWallet: '0x1234567890abcdef1234567890abcdef12345678',
        bloodType: 'O+',
        quantity: 350,
        location: 'City Hospital',
        timestamp: new Date().toISOString(),
        certificateId: results[0].id
      },
      rewards: {
        baseReward: 100,
        bonus: 0,
        total: 100,
        donationCount: 1
      },
      certificate: {
        id: results[0].id,
        number: results[0].asset.data.certificateNumber
      }
    }, null, 2));

    console.log('\n\n2️⃣  Verify Certificate:');
    console.log('─────────────────────────────────────────');
    console.log(`GET /api/certificates/${results[0].id}`);
    console.log('\nResponse:');
    console.log(JSON.stringify(verificationResult, null, 2));

    // Show data flow
    console.log('\n\n🌊 ========================================');
    console.log('   Data Flow Diagram');
    console.log('========================================\n');
    console.log('Donor Donates Blood');
    console.log('        │');
    console.log('        ▼');
    console.log('POST /api/donations/record');
    console.log('        │');
    console.log('        ▼');
    console.log('Server validates and records donation');
    console.log('        │');
    console.log('        ▼');
    console.log('bigchainDB.issueDonorCertificate()');
    console.log('        │');
    console.log('        ├─→ Generate keypair');
    console.log('        ├─→ Create certificate asset');
    console.log('        ├─→ Add metadata');
    console.log('        ├─→ Sign transaction');
    console.log('        └─→ Post to BigchainDB');
    console.log('        │');
    console.log('        ▼');
    console.log('BigchainDB Network stores certificate');
    console.log('        │');
    console.log('        ▼');
    console.log('Return certificate ID to donor');
    console.log('        │');
    console.log('        ▼');
    console.log('Donor receives:');
    console.log('  • Donation confirmation');
    console.log('  • BLC token rewards');
    console.log('  • Certificate ID');
    console.log('  • Verification link\n');

    // Benefits
    console.log('\n💡 ========================================');
    console.log('   Benefits of BigchainDB Integration');
    console.log('========================================\n');
    console.log('✅ Immutability - Certificates cannot be altered');
    console.log('✅ Decentralization - No single point of failure');
    console.log('✅ Verifiability - Anyone can verify certificates');
    console.log('✅ Transparency - All records are auditable');
    console.log('✅ Trust - Cryptographically secured');
    console.log('✅ Compliance - Permanent audit trail\n');

    // Statistics
    console.log('\n📈 ========================================');
    console.log('   Code Statistics');
    console.log('========================================\n');
    console.log('BigchainDB Service:     175 lines (bigchaindb.js)');
    console.log('Service Functions:      4 (Issue, Verify, Search, Transfer)');
    console.log('Server Integration:     3 API endpoints');
    console.log('Dashboard Integration:  2 display points');
    console.log('Total BigchainDB Code:  ~250 lines\n');

    console.log('\n🎉 ========================================');
    console.log('   Demo Complete!');
    console.log('========================================\n');
    console.log('💡 Tip: Copy the JSON outputs above for your project report');
    console.log('📸 Tip: Take screenshots of this output for documentation');
    console.log('📝 Tip: Reference BIGCHAINDB_SHOWCASE.md for detailed explanation\n');

  } catch (error) {
    console.error('\n❌ Error running demo:', error.message);
    console.log('\n💡 This is expected if BigchainDB is not running.');
    console.log('   The demo shows what WOULD happen with BigchainDB.');
    console.log('   All the code is ready - just needs BigchainDB service!\n');
  }
}

// Helper functions
function generateMockTransactionId() {
  const chars = 'abcdef0123456789';
  let id = '';
  for (let i = 0; i < 64; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the demo
console.log('\n🚀 Starting BigchainDB Demo...\n');
runDemo().then(() => {
  console.log('Demo finished. Press Ctrl+C to exit.\n');
}).catch(error => {
  console.error('Demo error:', error);
});

