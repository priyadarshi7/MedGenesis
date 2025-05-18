import React from 'react'

export default function HealthInfo({
  handleInputChange, 
  generalForm, 
  showAllergenInput,
  setShowAllergenInput, 
  handleAddAllergen,
  setNewAllergen, 
  newAllergen,
  handleCalculateBMI, 
  handleDeleteGeneral, 
  handleRemoveAllergen, 
  handleGeneralSubmit,
  profile
}) {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Health Information</h3>
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="bloodgroup" className="block text-sm font-medium text-gray-700">
            Blood Group
          </label>
          <div className="mt-1">
            <select
              id="bloodgroup"
              name="bloodgroup"
              value={generalForm.bloodgroup}
              onChange={(e) => handleInputChange('general', e)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="bloodpressure" className="block text-sm font-medium text-gray-700">
            Blood Pressure
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="bloodpressure"
              id="bloodpressure"
              value={generalForm.bloodpressure}
              onChange={(e) => handleInputChange('general', e)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="e.g. 120/80"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">
            Height (cm)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="height"
              id="height"
              value={generalForm.height}
              onChange={(e) => handleInputChange('general', e)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Height in cm"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Weight (kg)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="weight"
              id="weight"
              value={generalForm.weight}
              onChange={(e) => handleInputChange('general', e)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Weight in kg"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="heartrate" className="block text-sm font-medium text-gray-700">
            Heart Rate (bpm)
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="heartrate"
              id="heartrate"
              value={generalForm.heartrate}
              onChange={(e) => handleInputChange('general', e)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="e.g. 72"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <div className="flex justify-between items-center">
            <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
              Allergies
            </label>
            <button
              type="button"
              onClick={() => setShowAllergenInput(!showAllergenInput)}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {showAllergenInput ? 'Cancel' : 'Add Allergen'}
            </button>
          </div>

          {showAllergenInput && (
            <div className="mt-2">
              <div className="flex">
                <input
                  type="text"
                  value={newAllergen}
                  onChange={(e) => setNewAllergen(e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md rounded-r-none"
                  placeholder="Enter allergen"
                />
                <button
                  type="button"
                  onClick={(e) => handleAddAllergen(e)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          <div className="mt-2">
            {profile && profile.general && profile.general.allergies && profile.general.allergies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.general.allergies.map((allergen, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                  >
                    {allergen}
                    <button
                      type="button"
                      onClick={() => handleRemoveAllergen(allergen)}
                      className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-red-400 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-500 focus:text-white"
                    >
                      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No allergies specified</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={handleDeleteGeneral}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete Health Info
        </button>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handleCalculateBMI}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Calculate BMI
          </button>
          <button
            type="button"
            onClick={(e) => handleGeneralSubmit(e)}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}