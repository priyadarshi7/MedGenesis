import { create } from "zustand";
import axios from "axios";
import { ethers } from "ethers";

const API_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5000/api/blockchain" 
  : "/api/blockchain";

axios.defaults.withCredentials = true;

export const useBlockchainStore = create((set, get) => ({
  records: [],
  contract: null,
  contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  walletAddress: null,
  provider: null,
  signer: null,
  isLoading: false,
  error: null,
  
  // Initialize blockchain connection
  initBlockchain: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Request Metamask connection
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }
      
      // Get contract ABI from backend
      const { data } = await axios.get(`${API_URL}/contract-abi`);
      const { abi } = data;

      // Connect to wallet
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.BrowserProvider(window.ethereum); 
      // In ethers v6, getSigner returns a promise that resolves to a signer
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();
      
      // Create contract instance
      const { contractAddress } = get();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      
      set({ 
        provider, 
        signer, 
        walletAddress, 
        contract, 
        contractAddress,
        isLoading: false 
      });
      
      return { walletAddress, contract };
    } catch (error) {
      set({ 
        error: error.message || "Failed to initialize blockchain connection", 
        isLoading: false 
      });
      throw error;
    }
  },
  
  // Fetch user records
  fetchRecords: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get(`${API_URL}/user-records`);
      set({ records: response.data.records, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Error fetching records", 
        isLoading: false 
      });
      throw error;
    }
  },
  
  // Add a new record
  addRecord: async (recordType, ipfsHash, description) => {
    try {
      set({ isLoading: true, error: null });
      
      const { contract, walletAddress } = get();
      
      if (!contract || !walletAddress) {
        await get().initBlockchain();
      }
      
      // Call smart contract
      const tx = await get().contract.addMyRecord(recordType, ipfsHash, description);
      await tx.wait();
      
      // Save to backend
      const response = await axios.post(`${API_URL}/add-record`, {
        recordType,
        ipfsHash,
        description,
        blockchainTxHash: tx.hash,
        walletAddress: get().walletAddress
      });
      
      // Update records
      await get().fetchRecords();
      
      set({ isLoading: false });
      return response.data.record;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message || "Error adding record", 
        isLoading: false 
      });
      throw error;
    }
  },
  
  // Verify a record (for providers)
  verifyRecord: async (recordId, patientAddress, recordIndex) => {
    try {
      set({ isLoading: true, error: null });
      
      const { contract } = get();
      
      if (!contract) {
        await get().initBlockchain();
      }
      
      // Call smart contract
      const tx = await get().contract.verifyRecord(patientAddress, recordIndex);
      await tx.wait();
      
      // Update backend
      const response = await axios.post(`${API_URL}/verify-record`, {
        recordId,
        verificationTxHash: tx.hash
      });
      
      // Update records
      await get().fetchRecords();
      
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message || "Error verifying record", 
        isLoading: false 
      });
      throw error;
    }
  }
}));