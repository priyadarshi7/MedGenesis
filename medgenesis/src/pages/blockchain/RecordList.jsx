
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useBlockchainStore } from '../../store/useBlockchainStore';
import { Search, Filter, Calendar, FileText, AlertCircle, CheckCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const RecordList = ({ records: initialRecords }) => {
  const { user } = useAuthStore();
  const { verifyRecord, isLoading } = useBlockchainStore();
  const [records, setRecords] = useState([]);
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    date: 'all'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setRecords(initialRecords);
    setFilteredRecords(initialRecords);
  }, [initialRecords]);

  const handleVerify = async (record, e) => {
    e.stopPropagation();
    try {
      await verifyRecord(record._id, record.walletAddress, records.indexOf(record));
      // Update local state to reflect the verification
      const updatedRecords = records.map(r => 
        r._id === record._id ? { ...r, verified: true } : r
      );
      setRecords(updatedRecords);
      applyFilters(updatedRecords, searchTerm, filters);
      
      // Show toast notification
      showToast('Record verified successfully', 'success');
    } catch (error) {
      showToast(error.message || 'Error verifying record', 'error');
    }
  };

  // Simple toast function since we can't use react-hot-toast
  const showToast = (message, type) => {
    const toastEl = document.createElement('div');
    toastEl.className = `fixed top-4 right-4 px-4 py-2 rounded shadow-lg ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    toastEl.textContent = message;
    document.body.appendChild(toastEl);
    setTimeout(() => {
      document.body.removeChild(toastEl);
    }, 3000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getRecordTypeLabel = (type) => {
    switch (type) {
      case 'xray': return 'X-Ray';
      case 'prescription': return 'Prescription';
      case 'birthCertificate': return 'Birth Certificate';
      case 'vaccination': return 'Vaccination';
      default: return type;
    }
  };

  const getRecordTypeIcon = (type) => {
    switch (type) {
      case 'xray': return <FileText className="h-4 w-4" />;
      case 'prescription': return <FileText className="h-4 w-4" />;
      case 'birthCertificate': return <FileText className="h-4 w-4" />;
      case 'vaccination': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const toggleRecordDetails = (recordId) => {
    setExpandedRecord(expandedRecord === recordId ? null : recordId);
  };

  const applyFilters = (recordsToFilter, search, activeFilters) => {
    let result = [...recordsToFilter];
    
    // Apply search
    if (search) {
      result = result.filter(record => 
        record.description.toLowerCase().includes(search.toLowerCase()) ||
        getRecordTypeLabel(record.recordType).toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply type filter
    if (activeFilters.type !== 'all') {
      result = result.filter(record => record.recordType === activeFilters.type);
    }
    
    // Apply status filter
    if (activeFilters.status !== 'all') {
      result = result.filter(record => 
        (activeFilters.status === 'verified' && record.verified) ||
        (activeFilters.status === 'pending' && !record.verified)
      );
    }
    
    // Apply date filter
    if (activeFilters.date !== 'all') {
      const now = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(now.getDate() - 90);
      
      result = result.filter(record => {
        const recordDate = new Date(record.createdAt);
        if (activeFilters.date === 'last30days') {
          return recordDate >= thirtyDaysAgo;
        } else if (activeFilters.date === 'last90days') {
          return recordDate >= ninetyDaysAgo;
        }
        return true;
      });
    }
    
    setFilteredRecords(result);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilters(records, value, filters);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    applyFilters(records, searchTerm, newFilters);
  };

  const resetFilters = () => {
    const resetFiltersObj = { type: 'all', status: 'all', date: 'all' };
    setFilters(resetFiltersObj);
    setSearchTerm('');
    applyFilters(records, '', resetFiltersObj);
  };

  // Group records by month
  const groupRecordsByMonth = () => {
    const grouped = {};
    
    filteredRecords.forEach(record => {
      const date = new Date(record.createdAt);
      const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      
      grouped[monthYear].push(record);
    });
    
    return grouped;
  };

  const recordsByMonth = groupRecordsByMonth();

  if (records.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center py-10 text-gray-500">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No records found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first medical record!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* Search and Filters */}
      <div className="border-b border-gray-200 bg-gray-50 p-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
          {/* Search Box */}
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search records..."
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-4 py-2 sm:text-sm border border-gray-300 rounded-md"
            />
          </div>
          
          {/* Filter Toggle Button */}
          <div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {isFilterOpen ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
            </button>
          </div>
        </div>
        
        {/* Filter Options */}
        {isFilterOpen && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {/* Record Type Filter */}
            <div>
              <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700">Record Type</label>
              <select
                id="type-filter"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Types</option>
                <option value="xray">X-Ray</option>
                <option value="prescription">Prescription</option>
                <option value="birthCertificate">Birth Certificate</option>
                <option value="vaccination">Vaccination</option>
              </select>
            </div>
            
            {/* Status Filter */}
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status-filter"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            
            {/* Date Filter */}
            <div>
              <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700">Date Range</label>
              <select
                id="date-filter"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Time</option>
                <option value="last30days">Last 30 Days</option>
                <option value="last90days">Last 90 Days</option>
              </select>
            </div>
            
            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Records List */}
      <div className="px-4 py-6">
        {filteredRecords.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No matching records found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-500">
              Showing {filteredRecords.length} of {records.length} records
            </div>
            
            {/* Records grouped by month */}
            {Object.entries(recordsByMonth).map(([monthYear, monthRecords]) => (
              <div key={monthYear} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                  {monthYear}
                </h3>
                
                <div className="space-y-3">
                  {monthRecords.map((record) => (
                    <div 
                      key={record._id} 
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                    >
                      {/* Record Header - Always visible */}
                      <div 
                        onClick={() => toggleRecordDetails(record._id)}
                        className="bg-gray-50 px-4 py-3 cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${
                            record.verified ? 'bg-green-100' : 'bg-yellow-100'
                          }`}>
                            {getRecordTypeIcon(record.recordType)}
                          </div>
                          
                          <div>
                            <div className="flex items-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                record.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {record.verified ? (
                                  <><CheckCircle className="mr-1 h-3 w-3" /> Verified</>
                                ) : (
                                  <><Clock className="mr-1 h-3 w-3" /> Pending</>
                                )}
                              </span>
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {getRecordTypeLabel(record.recordType)}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-gray-900 mt-1">{record.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-3">{formatDate(record.createdAt)}</span>
                          {expandedRecord === record._id ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                      
                      {/* Expanded Details */}
                      {expandedRecord === record._id && (
                        <div className="border-t border-gray-200 px-4 py-4 bg-white">
                          <div className="space-y-4">
                            {/* Record Details */}
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                              <div>
                                <dt className="text-sm font-medium text-gray-500">Record ID</dt>
                                <dd className="mt-1 text-sm text-gray-900">{record._id.substring(0, 12)}...</dd>
                              </div>
                              
                              <div>
                                <dt className="text-sm font-medium text-gray-500">Created At</dt>
                                <dd className="mt-1 text-sm text-gray-900">{formatDate(record.createdAt)}</dd>
                              </div>
                              
                              {record.walletAddress && (
                                <div className="sm:col-span-2">
                                  <dt className="text-sm font-medium text-gray-500">Wallet Address</dt>
                                  <dd className="mt-1 text-sm text-gray-900 break-all">{record.walletAddress}</dd>
                                </div>
                              )}
                              
                              {record.ipfsHash && (
                                <div className="sm:col-span-2">
                                  <dt className="text-sm font-medium text-gray-500">IPFS Hash</dt>
                                  <dd className="mt-1 text-sm text-gray-900 break-all">{record.ipfsHash}</dd>
                                </div>
                              )}
                            </dl>
                            
                            {/* Actions */}
                            <div className="flex justify-end space-x-3 pt-3 border-t border-gray-200">
                              <a 
                                href={`https://gateway.pinata.cloud/ipfs/${record.ipfsHash}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                View Document
                              </a>
                              
                              {user?.isProvider && !record.verified && (
                                <button
                                  onClick={(e) => handleVerify(record, e)}
                                  disabled={isLoading}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                                >
                                  {isLoading ? 'Processing...' : 'Verify Record'}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RecordList;