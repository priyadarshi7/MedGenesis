import React, { useState } from 'react';
import { useBlockchainStore } from '../../store/useBlockchainStore';
import { uploadToIPFS } from '../../services/ipfsService';
import { toast } from 'react-hot-toast';

const AddRecordForm = () => {
  const { addRecord, isLoading } = useBlockchainStore();
  
  const [recordType, setRecordType] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!recordType || !description || !file) {
        toast.error('Please fill all fields and select a file');
        return;
      }
      
      setUploading(true);
      
      // 1. Upload to IPFS
      const ipfsResult = await uploadToIPFS(file);
      
      if (!ipfsResult || !ipfsResult.ipfsHash) {
        throw new Error('Failed to upload to IPFS');
      }
      
      // 2. Add to blockchain & save to database
      await addRecord(recordType, ipfsResult.ipfsHash, description);
      
      // Reset form
      setRecordType('');
      setDescription('');
      setFile(null);
      setFileName('');
      
      toast.success('Medical record added successfully!');
    } catch (error) {
      toast.error(error.message || 'Error adding record');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Record Type
        </label>
        <select
          value={recordType}
          onChange={(e) => setRecordType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Type</option>
          <option value="xray">X-Ray</option>
          <option value="prescription">Prescription</option>
          <option value="birthCertificate">Birth Certificate</option>
          <option value="vaccination">Vaccination</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the medical record"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload File
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {fileName ? (
                <p className="text-sm text-gray-500">{fileName}</p>
              ) : (
                <>
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="pt-1 text-sm text-gray-500">
                    Click to upload or drag and drop
                  </p>
                </>
              )}
            </div>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileChange} 
              accept="image/*,.pdf,.doc,.docx"
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || uploading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {(isLoading || uploading) ? 'Processing...' : 'Add Medical Record'}
      </button>
    </form>
  );
};

export default AddRecordForm;