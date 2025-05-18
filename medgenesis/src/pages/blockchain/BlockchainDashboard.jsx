import React, { useState, useEffect } from 'react';
import { useBlockchainStore } from '../../store/useBlockchainStore';
import { toast } from 'react-hot-toast';
import RecordList from './RecordList';
import AddRecordForm from './AddRecordForm';

const BlockchainDashboard = () => {
  const {
    records,
    initBlockchain,
    fetchRecords,
    isLoading,
    walletAddress
  } = useBlockchainStore();
  
  const [isConnected, setIsConnected] = useState(false);
  const [connectionAttempted, setConnectionAttempted] = useState(false);
  
  useEffect(() => {
    const connectWallet = async () => {
      try {
        await initBlockchain();
        await fetchRecords();
        setIsConnected(true);
      } catch (error) {
        console.error("Wallet connection error:", error);
        toast.error(error.message || "Failed to connect wallet");
      } finally {
        setConnectionAttempted(true);
      }
    };
    
    // Setup event listeners for wallet/chain changes
    const setupListeners = () => {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', () => {
      connectWallet(); // Good
    });

    window.ethereum.on('chainChanged', () => {
      connectWallet(); // Better than full reload
    });
  }
};

    
    // Only attempt to connect if:
    // 1. MetaMask is available
    // 2. We haven't attempted connection yet
    // 3. We're not already connected
    if (window.ethereum && !connectionAttempted && !isConnected) {
      connectWallet();
      setupListeners();
    }
    
    // Cleanup function
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, [connectionAttempted, isConnected]); // Add dependencies to prevent infinite loop
  
  const handleManualConnect = async () => {
    try {
      await initBlockchain();
      await fetchRecords();
      setIsConnected(true);
    } catch (error) {
      console.error("Manual connection error:", error);
      toast.error(error.message || "Failed to connect wallet");
    } finally {
      setConnectionAttempted(true);
    }
  };
  
  if (!window.ethereum) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">MetaMask Required!</strong>
          <p>Please install MetaMask to use this feature.</p>
          <a
            href="https://metamask.io/download.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Download MetaMask
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Medical Records on Blockchain</h1>
      
      {!isConnected ? (
        <div className="text-center py-10">
          <button
            onClick={handleManualConnect}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Record</h2>
              <AddRecordForm />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Your Medical Records</h2>
              <p className="mb-4 text-sm text-gray-500">
                Connected Wallet: {walletAddress ? walletAddress.substring(0, 6) + '...' + walletAddress.substring(38) : 'Not connected'}
              </p>
              <RecordList records={records} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainDashboard;