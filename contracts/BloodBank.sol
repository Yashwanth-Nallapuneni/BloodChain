// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BloodBank
 * allows user to manage transfers 
 * @dev Smart Contract for managing blood donations and requests
 */
contract BloodBank {
    struct Donation {
        address donor;
        string bloodType;
        uint256 quantity; // in ml
        uint256 timestamp;
        string location;
        bool available;
    }
    
    struct Request {
        address requester;
        string bloodType;
        uint256 quantity;
        uint256 timestamp;
        string location;
        bool fulfilled;
    }
    
    // Mappings
    mapping(uint256 => Donation) public donations;
    mapping(uint256 => Request) public requests;
    mapping(address => uint256[]) public donorHistory;
    mapping(address => uint256[]) public requesterHistory;
    
    // Counters
    uint256 public donationCounter;
    uint256 public requestCounter;
    
    // Events
    event DonationRecorded(uint256 indexed donationId, address indexed donor, string bloodType, uint256 quantity);
    event RequestCreated(uint256 indexed requestId, address indexed requester, string bloodType, uint256 quantity);
    event RequestFulfilled(uint256 indexed requestId, uint256 indexed donationId);
    event DonationUsed(uint256 indexed donationId);
    
    /**
     * @dev Record a new blood donation
     */
    function recordDonation(
        string memory bloodType,
        uint256 quantity,
        string memory location
    ) external returns (uint256) {
        require(quantity > 0, "Quantity must be greater than 0");
        
        uint256 donationId = donationCounter++;
        
        donations[donationId] = Donation({
            donor: msg.sender,
            bloodType: bloodType,
            quantity: quantity,
            timestamp: block.timestamp,
            location: location,
            available: true
        });
        
        donorHistory[msg.sender].push(donationId);
        
        emit DonationRecorded(donationId, msg.sender, bloodType, quantity);
        
        return donationId;
    }
    
    /**
     * @dev Create a blood request
     */
    function createRequest(
        string memory bloodType,
        uint256 quantity,
        string memory location
    ) external returns (uint256) {
        require(quantity > 0, "Quantity must be greater than 0");
        
        uint256 requestId = requestCounter++;
        
        requests[requestId] = Request({
            requester: msg.sender,
            bloodType: bloodType,
            quantity: quantity,
            timestamp: block.timestamp,
            location: location,
            fulfilled: false
        });
        
        requesterHistory[msg.sender].push(requestId);
        
        emit RequestCreated(requestId, msg.sender, bloodType, quantity);
        
        return requestId;
    }
    
    /**
     * @dev Fulfill a blood request with available donation
     */
    function fulfillRequest(uint256 requestId, uint256 donationId) external {
        require(!requests[requestId].fulfilled, "Request already fulfilled");
        require(donations[donationId].available, "Donation not available");
        
        Request storage request = requests[requestId];
        Donation storage donation = donations[donationId];
        
        require(
            keccak256(bytes(request.bloodType)) == keccak256(bytes(donation.bloodType)),
            "Blood type mismatch"
        );
        require(donation.quantity >= request.quantity, "Insufficient quantity");
        
        request.fulfilled = true;
        donation.available = false;
        
        emit RequestFulfilled(requestId, donationId);
        emit DonationUsed(donationId);
    }
    
    /**
     * @dev Get available donations by blood type
     */
    function getAvailableDonations(string memory bloodType) external view returns (uint256[] memory) {
        uint256 count = 0;
        
        // Count available donations
        for (uint256 i = 0; i < donationCounter; i++) {
            if (donations[i].available && 
                keccak256(bytes(donations[i].bloodType)) == keccak256(bytes(bloodType))) {
                count++;
            }
        }
        
        // Create result array
        uint256[] memory result = new uint256[](count);
        uint256 index = 0;
        
        for (uint256 i = 0; i < donationCounter; i++) {
            if (donations[i].available && 
                keccak256(bytes(donations[i].bloodType)) == keccak256(bytes(bloodType))) {
                result[index] = i;
                index++;
            }
        }
        
        return result;
    }
    
    /**
     * @dev Get donor's donation history
     */
    function getDonorHistory(address donor) external view returns (uint256[] memory) {
        return donorHistory[donor];
    }
    
    /**
     * @dev Get requester's request history
     */
    function getRequesterHistory(address requester) external view returns (uint256[] memory) {
        return requesterHistory[requester];
    }
}

