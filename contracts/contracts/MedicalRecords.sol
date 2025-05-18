// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MedicalRecords {
    struct Record {
        string recordType; // "xray", "prescription", "birthCertificate", "vaccination"
        string ipfsHash;   // IPFS hash of the stored file
        string description;
        uint256 timestamp;
        bool isVerified;
        address verifiedBy; // Address of healthcare provider that verified the record
    }
    
    // Mapping from patient address to their records
    mapping(address => Record[]) private patientRecords;
    
    // Mapping of authorized healthcare providers
    mapping(address => bool) private authorizedProviders;
    
    // Owner of the contract
    address private owner;
    
    // Events
    event RecordAdded(address indexed patient, string recordType, string ipfsHash);
    event RecordVerified(address indexed patient, uint256 recordIndex, address verifiedBy);
    event ProviderAuthorized(address provider);
    event ProviderRevoked(address provider);
    
    constructor() {
        owner = msg.sender;
        authorizedProviders[msg.sender] = true;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    
    modifier onlyAuthorized() {
        require(authorizedProviders[msg.sender], "Only authorized providers can perform this action");
        _;
    }
    
    // Authorize a healthcare provider
    function authorizeProvider(address provider) public onlyOwner {
        authorizedProviders[provider] = true;
        emit ProviderAuthorized(provider);
    }
    
    // Revoke a healthcare provider's authorization
    function revokeProvider(address provider) public onlyOwner {
        authorizedProviders[provider] = false;
        emit ProviderRevoked(provider);
    }
    
    // Add a medical record
    function addRecord(address patient, string memory recordType, string memory ipfsHash, string memory description) public onlyAuthorized {
        Record memory newRecord = Record({
            recordType: recordType,
            ipfsHash: ipfsHash,
            description: description,
            timestamp: block.timestamp,
            isVerified: false,
            verifiedBy: address(0)
        });
        
        patientRecords[patient].push(newRecord);
        emit RecordAdded(patient, recordType, ipfsHash);
    }
    
    // Allow patients to add their own records
    function addMyRecord(string memory recordType, string memory ipfsHash, string memory description) public {
        Record memory newRecord = Record({
            recordType: recordType,
            ipfsHash: ipfsHash,
            description: description,
            timestamp: block.timestamp,
            isVerified: false,
            verifiedBy: address(0)
        });
        
        patientRecords[msg.sender].push(newRecord);
        emit RecordAdded(msg.sender, recordType, ipfsHash);
    }
    
    // Verify a record (only authorized providers)
    function verifyRecord(address patient, uint256 recordIndex) public onlyAuthorized {
        require(recordIndex < patientRecords[patient].length, "Record does not exist");
        
        patientRecords[patient][recordIndex].isVerified = true;
        patientRecords[patient][recordIndex].verifiedBy = msg.sender;
        
        emit RecordVerified(patient, recordIndex, msg.sender);
    }
    
    // Get the number of records for a patient
    function getRecordCount(address patient) public view returns (uint256) {
        return patientRecords[patient].length;
    }
    
    // Get a specific record for a patient
    function getRecord(address patient, uint256 recordIndex) public view returns (
        string memory recordType,
        string memory ipfsHash,
        string memory description,
        uint256 timestamp,
        bool isVerified,
        address verifiedBy
    ) {
        require(recordIndex < patientRecords[patient].length, "Record does not exist");
        
        Record memory record = patientRecords[patient][recordIndex];
        return (
            record.recordType,
            record.ipfsHash,
            record.description,
            record.timestamp,
            record.isVerified,
            record.verifiedBy
        );
    }
    
    // Get all records for a patient (only the patient or authorized providers)
    function getMyRecords() public view returns (
        string[] memory recordTypes,
        string[] memory ipfsHashes,
        string[] memory descriptions,
        uint256[] memory timestamps,
        bool[] memory verificationStatuses,
        address[] memory verifiedByAddresses
    ) {
        uint256 count = patientRecords[msg.sender].length;
        
        recordTypes = new string[](count);
        ipfsHashes = new string[](count);
        descriptions = new string[](count);
        timestamps = new uint256[](count);
        verificationStatuses = new bool[](count);
        verifiedByAddresses = new address[](count);
        
        for (uint256 i = 0; i < count; i++) {
            Record memory record = patientRecords[msg.sender][i];
            recordTypes[i] = record.recordType;
            ipfsHashes[i] = record.ipfsHash;
            descriptions[i] = record.description;
            timestamps[i] = record.timestamp;
            verificationStatuses[i] = record.isVerified;
            verifiedByAddresses[i] = record.verifiedBy;
        }
        
        return (recordTypes, ipfsHashes, descriptions, timestamps, verificationStatuses, verifiedByAddresses);
    }
    
    // Check if an address is an authorized provider
    function isAuthorizedProvider(address provider) public view returns (bool) {
        return authorizedProviders[provider];
    }
}