const driver = require('bigchaindb-driver');
const bip39 = require('bip39');

class BigChainDBService {
  constructor(apiUrl = 'http://localhost:9984/api/v1/') {
    this.apiUrl = apiUrl;
    this.conn = new driver.Connection(apiUrl);
  }

  /**
   * Generate a new keypair for a donor
   */
  generateKeypair() {
    return new driver.Ed25519Keypair();
  }

  /**
   * Issue a donor certificate on BigchainDB
   */
  async issueDonorCertificate(donorData) {
    try {
      // Create issuer keypair (hospital/blood bank)
      const issuer = this.generateKeypair();

      // Prepare certificate asset
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

      // Metadata for the transaction
      const metadata = {
        timestamp: new Date().toISOString(),
        hospitalId: donorData.hospitalId || 'HOSP001',
        donationType: donorData.donationType || 'Whole Blood',
        notes: donorData.notes || 'Regular donation'
      };

      // Create a transaction
      const txCreateSimple = driver.Transaction.makeCreateTransaction(
        certificateAsset,
        metadata,
        [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(issuer.publicKey))],
        issuer.publicKey
      );

      // Sign the transaction
      const txCreateSimpleSigned = driver.Transaction.signTransaction(
        txCreateSimple,
        issuer.privateKey
      );

      // Send the transaction to BigchainDB
      const result = await this.conn.postTransactionCommit(txCreateSimpleSigned);

      console.log('✅ Certificate issued on BigchainDB:', result.id);

      return {
        success: true,
        transactionId: result.id,
        certificateNumber: certificateAsset.data.certificateNumber,
        publicKey: issuer.publicKey,
        privateKey: issuer.privateKey // In production, store this securely!
      };
    } catch (error) {
      console.error('❌ Error issuing certificate:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Verify a donor certificate
   */
  async verifyCertificate(transactionId) {
    try {
      const tx = await this.conn.getTransaction(transactionId);
      
      if (!tx) {
        return {
          success: false,
          message: 'Certificate not found'
        };
      }

      return {
        success: true,
        certificate: tx.asset.data,
        metadata: tx.metadata,
        timestamp: tx.metadata.timestamp,
        verified: tx.asset.data.verified
      };
    } catch (error) {
      console.error('❌ Error verifying certificate:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get all certificates (search by asset data)
   */
  async searchCertificates(query) {
    try {
      const assets = await this.conn.searchAssets(query);
      return {
        success: true,
        certificates: assets
      };
    } catch (error) {
      console.error('❌ Error searching certificates:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Transfer certificate ownership (for donation tracking)
   */
  async transferCertificate(transactionId, currentOwnerKeypair, newOwnerPublicKey) {
    try {
      // Get the creation transaction
      const createTx = await this.conn.getTransaction(transactionId);

      // Create transfer transaction
      const transferTx = driver.Transaction.makeTransferTransaction(
        [{ tx: createTx, output_index: 0 }],
        [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(newOwnerPublicKey))],
        { transferredAt: new Date().toISOString() }
      );

      // Sign with current owner's private key
      const signedTransferTx = driver.Transaction.signTransaction(
        transferTx,
        currentOwnerKeypair.privateKey
      );

      // Send the transaction
      const result = await this.conn.postTransactionCommit(signedTransferTx);

      console.log('✅ Certificate transferred:', result.id);

      return {
        success: true,
        transactionId: result.id
      };
    } catch (error) {
      console.error('❌ Error transferring certificate:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = BigChainDBService;

