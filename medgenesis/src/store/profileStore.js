import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5000/api/profile" 
  : "/api/profile";

axios.defaults.withCredentials = true;

export const useProfileStore = create((set) => ({
  profile: {
    personal: {},
    general: {}
  },
  isLoading: false,
  error: null,
  message: null,

  // Get profile data
  getProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ 
        profile: response.data.profile, 
        isLoading: false 
      });
      return response.data.profile;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error fetching profile", 
        isLoading: false 
      });
      throw error;
    }
  },

  // Update personal info
  updatePersonalInfo: async (personalData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/personal`, personalData);
      set(state => ({ 
        profile: {
          ...state.profile,
          personal: response.data.personal
        },
        message: response.data.message,
        isLoading: false 
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error updating personal information", 
        isLoading: false 
      });
      throw error;
    }
  },

  // Update general health info
  updateGeneralInfo: async (generalData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/general`, generalData);
      set(state => ({ 
        profile: {
          ...state.profile,
          general: response.data.general
        },
        message: response.data.message,
        isLoading: false 
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error updating general information", 
        isLoading: false 
      });
      throw error;
    }
  },

  // Delete personal info
  deletePersonalInfo: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(`${API_URL}/personal`);
      set(state => ({ 
        profile: {
          ...state.profile,
          personal: {}
        },
        message: response.data.message,
        isLoading: false 
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error deleting personal information", 
        isLoading: false 
      });
      throw error;
    }
  },

  // Delete general health info
  deleteGeneralInfo: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(`${API_URL}/general`);
      set(state => ({ 
        profile: {
          ...state.profile,
          general: {}
        },
        message: response.data.message,
        isLoading: false 
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error deleting general information", 
        isLoading: false 
      });
      throw error;
    }
  },

  // Add allergen
  addAllergen: async (allergen) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/allergen`, { allergen });
      set(state => ({ 
        profile: {
          ...state.profile,
          general: {
            ...state.profile.general,
            allergies: response.data.allergies
          }
        },
        message: response.data.message,
        isLoading: false 
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error adding allergen", 
        isLoading: false 
      });
      throw error;
    }
  },

  // Delete allergen
  deleteAllergen: async (allergen) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(`${API_URL}/allergen/${allergen}`);
      set(state => ({ 
        profile: {
          ...state.profile,
          general: {
            ...state.profile.general,
            allergies: response.data.allergies
          }
        },
        message: response.data.message,
        isLoading: false 
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error deleting allergen", 
        isLoading: false 
      });
      throw error;
    }
  },

  // Calculate BMI
  calculateBMI: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/calculate-bmi`);
      set(state => ({ 
        profile: {
          ...state.profile,
          general: {
            ...state.profile.general,
            bmi: response.data.bmi
          }
        },
        message: response.data.message,
        isLoading: false 
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error calculating BMI", 
        isLoading: false 
      });
      throw error;
    }
  },

  // Clear any error or message
  clearNotifications: () => {
    set({ error: null, message: null });
  }
}));