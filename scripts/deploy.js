const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🩸 Deploying BloodChain Smart Contracts...");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy BloodCoin Token
  const initialSupply = 1000000; // 1 million BLC
  const BloodCoin = await hre.ethers.getContractFactory("BloodCoin");
  const bloodCoin = await BloodCoin.deploy(initialSupply);
  await bloodCoin.waitForDeployment();
  const bloodCoinAddress = await bloodCoin.getAddress();
  console.log("✅ BloodCoin deployed to:", bloodCoinAddress);

  // Deploy BloodBank
  const BloodBank = await hre.ethers.getContractFactory("BloodBank");
  const bloodBank = await BloodBank.deploy();
  await bloodBank.waitForDeployment();
  const bloodBankAddress = await bloodBank.getAddress();
  console.log("✅ BloodBank deployed to:", bloodBankAddress);

  // Save deployment addresses
  const deploymentInfo = {
    network: hre.network.name,
    bloodCoin: bloodCoinAddress,
    bloodBank: bloodBankAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString()
  };

  const deploymentPath = path.join(__dirname, "../deployment.json");
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("📝 Deployment info saved to deployment.json");

  // Verify initial setup
  const totalSupply = await bloodCoin.totalSupply();
  console.log("\n📊 Initial Token Supply:", hre.ethers.formatEther(totalSupply), "BLC");
  
  console.log("\n🎉 Deployment complete!");
  console.log("\nNext steps:");
  console.log("1. Update your .env file with contract addresses");
  console.log("2. Verify hospitals using bloodCoin.verifyHospital(address)");
  console.log("3. Start recording donations!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

