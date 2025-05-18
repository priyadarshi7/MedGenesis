import mongoose from "mongoose";

const blockchainRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recordType: {
      type: String,
      enum: ["xray", "prescription", "birthCertificate", "vaccination"],
      required: true,
    },
    ipfsHash: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    blockchainTxHash: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verifiedBy: {
      type: String,
      default: null,
    },
    verificationTxHash: {
      type: String,
      default: null,
    },
    walletAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const BlockchainRecord = mongoose.model("BlockchainRecord", blockchainRecordSchema);