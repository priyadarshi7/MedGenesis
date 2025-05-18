import { BlockchainRecord } from "../models/blockchainRecord.js";
import { ethers } from "ethers";
import MedicalRecordsABI from "../../contracts/artifacts/contracts/MedicalRecords.sol/MedicalRecords.json" assert { type: 'json' };
import dotenv from "dotenv";

dotenv.config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

export const addMedicalRecord = async (req, res) => {
  try {
    const { recordType, ipfsHash, description, blockchainTxHash, walletAddress } = req.body;
    
    if (!recordType || !ipfsHash || !description || !blockchainTxHash || !walletAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRecord = new BlockchainRecord({
      userId: req.userId,
      recordType,
      ipfsHash,
      description,
      blockchainTxHash,
      walletAddress,
    });

    await newRecord.save();
    res.status(201).json({ message: "Medical record added successfully", record: newRecord });
  } catch (error) {
    console.error("Error adding medical record:", error);
    res.status(500).json({ message: "Error adding medical record" });
  }
};

export const getUserRecords = async (req, res) => {
  try {
    const records = await BlockchainRecord.find({ userId: req.userId });
    res.status(200).json({ records });
  } catch (error) {
    console.error("Error fetching user records:", error);
    res.status(500).json({ message: "Error fetching user records" });
  }
};

export const verifyRecord = async (req, res) => {
  try {
    const { recordId, verificationTxHash } = req.body;
    
    if (!recordId || !verificationTxHash) {
      return res.status(400).json({ message: "Record ID and verification transaction hash are required" });
    }

    const record = await BlockchainRecord.findById(recordId);
    
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    if (record.userId.toString() !== req.userId.toString() && !req.user.isProvider) {
      return res.status(403).json({ message: "Not authorized to verify this record" });
    }

    record.verified = true;
    record.verifiedBy = req.userId;
    record.verificationTxHash = verificationTxHash;
    
    await record.save();
    
    res.status(200).json({ message: "Record verified successfully", record });
  } catch (error) {
    console.error("Error verifying record:", error);
    res.status(500).json({ message: "Error verifying record" });
  }
};

export const getContractABI = async (req, res) => {
  try {
    res.status(200).json({ 
      contractAddress: CONTRACT_ADDRESS,
      abi: MedicalRecordsABI.abi
    });
  } catch (error) {
    console.error("Error fetching contract ABI:", error);
    res.status(500).json({ message: "Error fetching contract ABI" });
  }
};