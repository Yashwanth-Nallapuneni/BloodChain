// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BloodCoin
 * @dev ERC20 Token for rewarding blood donors in the BloodChain ecosystem
 */
contract BloodCoin is ERC20, Ownable {
    // Mapping to track verified hospitals
    mapping(address => bool) public verifiedHospitals;
    
    // Mapping to track donor rewards
    mapping(address => uint256) public donorRewards;
    
    // Mapping to track donation count per donor
    mapping(address => uint256) public donationCount;
    
    // Events
    event HospitalVerified(address indexed hospital);
    event HospitalRevoked(address indexed hospital);
    event DonationRecorded(address indexed donor, uint256 reward, uint256 timestamp);
    event TokensRedeemed(address indexed donor, uint256 amount);
    
    // Reward amounts
    uint256 public constant FIRST_DONATION_REWARD = 100 * 10**18;  // 100 BLC
    uint256 public constant REGULAR_DONATION_REWARD = 50 * 10**18; // 50 BLC
    uint256 public constant FREQUENT_DONOR_BONUS = 20 * 10**18;    // 20 BLC bonus for 5+ donations
    
    constructor(uint256 initialSupply) ERC20("BloodCoin", "BLC") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10**decimals());
    }
    
    /**
     * @dev Add a verified hospital that can record donations
     */
    function verifyHospital(address hospital) external onlyOwner {
        require(hospital != address(0), "Invalid hospital address");
        require(!verifiedHospitals[hospital], "Hospital already verified");
        verifiedHospitals[hospital] = true;
        emit HospitalVerified(hospital);
    }
    
    /**
     * @dev Remove a verified hospital
     */
    function revokeHospital(address hospital) external onlyOwner {
        require(verifiedHospitals[hospital], "Hospital not verified");
        verifiedHospitals[hospital] = false;
        emit HospitalRevoked(hospital);
    }
    
    /**
     * @dev Record a blood donation and reward the donor
     */
    function recordDonation(address donor) external {
        require(verifiedHospitals[msg.sender], "Only verified hospitals can record donations");
        require(donor != address(0), "Invalid donor address");
        
        donationCount[donor]++;
        
        uint256 reward = donationCount[donor] == 1 ? FIRST_DONATION_REWARD : REGULAR_DONATION_REWARD;
        
        // Bonus for frequent donors (5+ donations)
        if (donationCount[donor] % 5 == 0) {
            reward += FREQUENT_DONOR_BONUS;
        }
        
        donorRewards[donor] += reward;
        _mint(donor, reward);
        
        emit DonationRecorded(donor, reward, block.timestamp);
    }
    
    /**
     * @dev Mint new tokens (only owner)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Get donor information
     */
    function getDonorInfo(address donor) external view returns (
        uint256 donations,
        uint256 totalRewards,
        uint256 balance
    ) {
        return (
            donationCount[donor],
            donorRewards[donor],
            balanceOf(donor)
        );
    }
}

