import React from 'react'

export default function Nav({setActiveTab, activeTab}) {
  return (
               <nav className="flex border-b border-gray-200">
              <button
                className={`px-6 py-4 text-sm font-medium ${activeTab === 'dashboard' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${activeTab === 'personal' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('personal')}
              >
                Personal Information
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${activeTab === 'health' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('health')}
              >
                Health Information
              </button>
            </nav>
  )
}
