import axios from "axios";

const PINATA_API_KEY = 'f7e8ca7aa6197a291116';
const PINATA_SECRET_KEY = '689925405c279347cc818fdfb742d85dd19b71584dd0f7e7abbbc803a315db04';

// Upload file to IPFS using Pinata
export const uploadToIPFS = async (file) => {
  if (!file) return null;
  
  try {
    const formData = new FormData();
    formData.append("file", file);
    
    const pinataMetadata = JSON.stringify({
      name: file.name,
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', pinataOptions);
    
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data;`,
          pinata_api_key: 'f7e8ca7aa6197a291116',
          pinata_secret_api_key: '689925405c279347cc818fdfb742d85dd19b71584dd0f7e7abbbc803a315db04',
        },
      }
    );
    
    return {
      ipfsHash: res.data.IpfsHash,
      pinataUrl: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
    };
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw new Error("Error uploading to IPFS");
  }
};