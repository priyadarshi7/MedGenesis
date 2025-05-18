import express from "express";
import { addMedicalRecord, getUserRecords, verifyRecord, getContractABI } from "../controllers/blockchain.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/add-record", verifyToken, addMedicalRecord);
router.get("/user-records", verifyToken, getUserRecords);
router.post("/verify-record", verifyToken, verifyRecord);
router.get("/contract-abi", getContractABI); // ABI can stay public

export default router;
