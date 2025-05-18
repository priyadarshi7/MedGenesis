import React from 'react'

function FirstTimeSetup({handleInputChange, handlePersonalSubmit, handleGeneralSubmit, personalForm, generalForm}) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Your Health Profile</h1>
            <p className="text-gray-600">Let's set up your profile with some basic information</p>
          </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-center mb-8">
                <div className="w-full max-w-md">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Step 1 of 2</span>
                  </div>
                  
                  <form onSubmit={handlePersonalSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                        Gender
                      </label>
                      <select 
                        id="gender" 
                        name="gender" 
                        value={personalForm.gender} 
                        onChange={(e) => handleInputChange('personal', e)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                        Date of Birth
                      </label>
                      <input 
                        type="date" 
                        id="dob" 
                        name="dob" 
                        value={personalForm.dob} 
                        onChange={(e) => handleInputChange('personal', e)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                        Contact Number
                      </label>
                      <input 
                        type="tel" 
                        id="contact" 
                        name="contact" 
                        value={personalForm.contact} 
                        onChange={(e) => handleInputChange('personal', e)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Your contact number"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                        City
                      </label>
                      <input 
                        type="text" 
                        id="city" 
                        name="city" 
                        value={personalForm.city} 
                        onChange={(e) => handleInputChange('personal', e)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Your city"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                        State
                      </label>
                      <input 
                        type="text" 
                        id="state" 
                        name="state" 
                        value={personalForm.state} 
                        onChange={(e) => handleInputChange('personal', e)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Your state"
                      />
                    </div>
                    
                    <div className="flex items-center justify-end">
                      <button 
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Save & Continue
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-8">
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">Health Information</h2>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Step 2 of 2</span>
                    </div>
                    
                    <form onSubmit={handleGeneralSubmit}>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bloodgroup">
                          Blood Group
                        </label>
                        <select 
                          id="bloodgroup" 
                          name="bloodgroup" 
                          value={generalForm.bloodgroup} 
                          onChange={(e) => handleInputChange('general', e)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
                            Height (cm)
                          </label>
                          <input 
                            type="number" 
                            id="height" 
                            name="height" 
                            value={generalForm.height} 
                            onChange={(e) => handleInputChange('general', e)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Height in cm"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                            Weight (kg)
                          </label>
                          <input 
                            type="number" 
                            id="weight" 
                            name="weight" 
                            value={generalForm.weight} 
                            onChange={(e) => handleInputChange('general', e)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Weight in kg"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bloodpressure">
                            Blood Pressure
                          </label>
                          <input 
                            type="text" 
                            id="bloodpressure" 
                            name="bloodpressure" 
                            value={generalForm.bloodpressure} 
                            onChange={(e) => handleInputChange('general', e)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="e.g. 120/80"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="heartrate">
                            Heart Rate (bpm)
                          </label>
                          <input 
                            type="text" 
                            id="heartrate" 
                            name="heartrate" 
                            value={generalForm.heartrate} 
                            onChange={(e) => handleInputChange('general', e)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="e.g. 72"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-end">
                        <button 
                          type="submit" 
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Complete Profile
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default FirstTimeSetup