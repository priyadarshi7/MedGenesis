import React from 'react'

export default function PersonalTab({handleDeletePersonal, handlePersonalSubmit, handleInputChange, personalForm
    , 
}) {
  return (
          <div className="p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Personal Information</h3>
                <form onSubmit={handlePersonalSubmit}>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <div className="mt-1">
                        <select
                          id="gender"
                          name="gender"
                          value={personalForm.gender}
                          onChange={(e) => handleInputChange('personal', e)}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          name="dob"
                          id="dob"
                          value={personalForm.dob}
                          onChange={(e) => handleInputChange('personal', e)}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                        Contact Number
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          name="contact"
                          id="contact"
                          value={personalForm.contact}
                          onChange={(e) => handleInputChange('personal', e)}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Your contact number"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={personalForm.city}
                          onChange={(e) => handleInputChange('personal', e)}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Your city"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="state"
                          id="state"
                          value={personalForm.state}
                          onChange={(e) => handleInputChange('personal', e)}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Your state"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={handleDeletePersonal}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete Personal Info
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
  )
}
