import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { 
  getProfile,
  updatePersonalInfo,
  updateGeneralInfo,
  deletePersonalInfo,
  deleteGeneralInfo,
  deleteAllergen,
  addAllergen,
  calculateBMI
} from "../controllers/profile.controller.js";

const router = express.Router();

// Get profile information
router.get("/", verifyToken, getProfile);

// Update personal information
router.put("/personal", verifyToken, updatePersonalInfo);

// Update general health information
router.put("/general", verifyToken, updateGeneralInfo);

// Delete personal information
router.delete("/personal", verifyToken, deletePersonalInfo);

// Delete general health information
router.delete("/general", verifyToken, deleteGeneralInfo);

// Delete specific allergen
router.delete("/allergen/:allergen", verifyToken, deleteAllergen);

// Add allergen
router.post("/allergen", verifyToken, addAllergen);

// Calculate BMI
router.post("/calculate-bmi", verifyToken, calculateBMI);

export default router;