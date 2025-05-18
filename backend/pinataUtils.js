// pinataUtils.js
import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

// Create Pinata API instance with authentication
const pinataApi = axios.create({
  baseURL: 'https://api.pinata.cloud',
  headers: {
    pinata_api_key: PINATA_API_KEY,
    pinata_secret_api_key: PINATA_SECRET_API_KEY,
  }
});

// Upload file to Pinata
export const pinFileToIPFS = async (fileBuffer, fileName) => {
  try {
    const formData = new FormData();
    formData.append('file', fileBuffer, {
      filename: fileName
    });

    // Add metadata
    const metadata = JSON.stringify({
      name: fileName,
      keyvalues: {
        uploadedAt: new Date().toISOString(),
        application: 'MedicalRecords'
      }
    });
    formData.append('pinataMetadata', metadata);

    // Add options (pinning)
    const options = JSON.stringify({
      cidVersion: 1
    });
    formData.append('pinataOptions', options);

    const res = await pinataApi.post('/pinning/pinFileToIPFS', formData, {
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      }
    });

    return {
      success: true,
      ipfsHash: res.data.IpfsHash,
      pinSize: res.data.PinSize,
      timestamp: res.data.Timestamp
    };
  } catch (error) {
    console.error('Error pinning file to Pinata:', error);
    throw error;
  }
};

// Get file from Pinata
export const getFileFromIPFS = async (hash) => {
  try {
    const gateway = `https://gateway.pinata.cloud/ipfs/${hash}`;
    const response = await axios.get(gateway);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error getting file from Pinata:', error);
    throw error;
  }
};

// Test Pinata connection
export const testPinataConnection = async () => {
  try {
    const response = await pinataApi.get('/data/testAuthentication');
    return {
      success: true,
      message: response.data.message
    };
  } catch (error) {
    console.error('Error testing Pinata connection:', error);
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to connect to Pinata'
    };
  }
};