import { User } from "../models/user.model.js";

// Get the user's profile information
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password -resetPasswordToken -resetPasswordExpiresAt -verificationToken -verificationTokenExpiresAt");
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      profile: {
        personal: user.personal || {},
        general: user.general || {}
      }
    });
  } catch (error) {
    console.log("Error in getProfile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update personal information
export const updatePersonalInfo = async (req, res) => {
  try {
    const { gender, dob, contact, city, state } = req.body;
    
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Initialize personal object if it doesn't exist
    if (!user.personal) {
      user.personal = {};
    }
    
    // Update only the fields that are provided
    if (gender !== undefined) user.personal.gender = gender;
    if (dob !== undefined) user.personal.dob = dob;
    if (contact !== undefined) user.personal.contact = contact;
    if (city !== undefined) user.personal.city = city;
    if (state !== undefined) user.personal.state = state;
    
    await user.save();
    
    res.status(200).json({
      success: true,
      message: "Personal information updated successfully",
      personal: user.personal
    });
  } catch (error) {
    console.log("Error in updatePersonalInfo:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update general health information
export const updateGeneralInfo = async (req, res) => {
  try {
    const { bloodgroup, height, weight, bmi, bloodpressure, heartrate, allergies } = req.body;
    
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Initialize general object if it doesn't exist
    if (!user.general) {
      user.general = {};
    }
    
    // Update only the fields that are provided
    if (bloodgroup !== undefined) user.general.bloodgroup = bloodgroup;
    if (height !== undefined) user.general.height = height;
    if (weight !== undefined) user.general.weight = weight;
    if (bmi !== undefined) user.general.bmi = bmi;
    if (bloodpressure !== undefined) user.general.bloodpressure = bloodpressure;
    if (heartrate !== undefined) user.general.heartrate = heartrate;
    if (allergies !== undefined) user.general.allergies = allergies;
    
    await user.save();
    
    res.status(200).json({
      success: true,
      message: "General health information updated successfully",
      general: user.general
    });
  } catch (error) {
    console.log("Error in updateGeneralInfo:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete personal information
export const deletePersonalInfo = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    user.personal = {};
    await user.save();
    
    res.status(200).json({
      success: true,
      message: "Personal information deleted successfully"
    });
  } catch (error) {
    console.log("Error in deletePersonalInfo:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete general health information
export const deleteGeneralInfo = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    user.general = {};
    await user.save();
    
    res.status(200).json({
      success: true,
      message: "General health information deleted successfully"
    });
  } catch (error) {
    console.log("Error in deleteGeneralInfo:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete specific allergen from allergies array
export const deleteAllergen = async (req, res) => {
  try {
    const { allergen } = req.params;
    
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    if (!user.general || !user.general.allergies) {
      return res.status(400).json({ success: false, message: "No allergies found" });
    }
    
    user.general.allergies = user.general.allergies.filter(item => item !== allergen);
    await user.save();
    
    res.status(200).json({
      success: true,
      message: "Allergen removed successfully",
      allergies: user.general.allergies
    });
  } catch (error) {
    console.log("Error in deleteAllergen:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add allergen to allergies array
export const addAllergen = async (req, res) => {
  try {
    const { allergen } = req.body;
    
    if (!allergen) {
      return res.status(400).json({ success: false, message: "Allergen is required" });
    }
    
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    // Initialize general and allergies if they don't exist
    if (!user.general) {
      user.general = {};
    }
    
    if (!user.general.allergies) {
      user.general.allergies = [];
    }
    
    // Check if allergen already exists
    if (user.general.allergies.includes(allergen)) {
      return res.status(400).json({ success: false, message: "Allergen already exists" });
    }
    
    user.general.allergies.push(allergen);
    await user.save();
    
    res.status(200).json({
      success: true,
      message: "Allergen added successfully",
      allergies: user.general.allergies
    });
  } catch (error) {
    console.log("Error in addAllergen:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Calculate BMI based on height and weight
export const calculateBMI = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    if (!user.general || !user.general.height || !user.general.weight) {
      return res.status(400).json({ 
        success: false, 
        message: "Height and weight are required to calculate BMI" 
      });
    }
    
    // Calculate BMI: weight (kg) / (height (m))^2
    // Assuming height is in cm, convert to meters
    const heightInMeters = user.general.height / 100;
    const bmi = (user.general.weight / (heightInMeters * heightInMeters)).toFixed(2);
    
    user.general.bmi = bmi;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: "BMI calculated successfully",
      bmi: bmi
    });
  } catch (error) {
    console.log("Error in calculateBMI:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};