
import { useState, useEffect, act } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useProfileStore } from '../../store/profileStore';
import FirstTimeSetup from './FirstTimeSetup';
import PersonalTab from './PersonalTab';
import ProfileDash from './ProfileDashboard';
import HealthInfo from './HealthInfo';
import Nav from './nav';

export default function ProfileDashboard() {
  const { user, isAuthenticated } = useAuthStore();
  const { 
    profile, 
    isLoading, 
    error, 
    message,
    getProfile, 
    updatePersonalInfo, 
    updateGeneralInfo,
    deletePersonalInfo,
    deleteGeneralInfo,
    addAllergen,
    deleteAllergen,
    calculateBMI,
    clearNotifications
  } = useProfileStore();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAllergenInput, setShowAllergenInput] = useState(false);
  const [newAllergen, setNewAllergen] = useState('');
  const [personalForm, setPersonalForm] = useState({
    gender: '',
    dob: '',
    contact: '',
    city: '',
    state: ''
  });
  const [generalForm, setGeneralForm] = useState({
    bloodgroup: '',
    height: '',
    weight: '',
    bloodpressure: '',
    heartrate: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfileData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (profile) {
      // Populate forms with existing data if available
      if (profile.personal) {
        setPersonalForm({
          gender: profile.personal.gender || '',
          dob: profile.personal.dob ? new Date(profile.personal.dob).toISOString().split('T')[0] : '',
          contact: profile.personal.contact || '',
          city: profile.personal.city || '',
          state: profile.personal.state || ''
        });
      }
      
      if (profile.general) {
        setGeneralForm({
          bloodgroup: profile.general.bloodgroup || '',
          height: profile.general.height || '',
          weight: profile.general.weight || '',
          bloodpressure: profile.general.bloodpressure || '',
          heartrate: profile.general.heartrate || ''
        });
      }
    }
  }, [profile]);

  const fetchProfileData = async () => {
    try {
      await getProfile();
    } catch (err) {
      console.error("Error fetching profile data:", err);
    }
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePersonalInfo(personalForm);
    } catch (err) {
      console.error("Error updating personal info:", err);
    }
  };

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateGeneralInfo(generalForm);
    } catch (err) {
      console.error("Error updating general info:", err);
    }
  };

  const handleAddAllergen = async (e) => {
    e.preventDefault();
    if (newAllergen.trim()) {
      try {
        await addAllergen(newAllergen.trim());
        setNewAllergen('');
        setShowAllergenInput(false);
      } catch (err) {
        console.error("Error adding allergen:", err);
      }
    }
  };

  const handleCalculateBMI = async () => {
    try {
      await calculateBMI();
    } catch (err) {
      console.error("Error calculating BMI:", err);
    }
  };

  const handleDeletePersonal = async () => {
    if (window.confirm("Are you sure you want to delete your personal information?")) {
      try {
        await deletePersonalInfo();
      } catch (err) {
        console.error("Error deleting personal info:", err);
      }
    }
  };

  const handleDeleteGeneral = async () => {
    if (window.confirm("Are you sure you want to delete your general health information?")) {
      try {
        await deleteGeneralInfo();
      } catch (err) {
        console.error("Error deleting general info:", err);
      }
    }
  };

  const handleRemoveAllergen = async (allergen) => {
    try {
      await deleteAllergen(allergen);
    } catch (err) {
      console.error("Error removing allergen:", err);
    }
  };

  const handleInputChange = (formType, e) => {
    const { name, value } = e.target;
    if (formType === 'personal') {
      setPersonalForm(prev => ({ ...prev, [name]: value }));
    } else {
      setGeneralForm(prev => ({ ...prev, [name]: value }));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
          <p className="mb-4">You need to be logged in to access your profile information.</p>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => window.location.href = '/login'}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const isProfileEmpty = 
    !profile.personal?.gender && 
    !profile.personal?.dob && 
    !profile.personal?.contact && 
    !profile.general?.bloodgroup && 
    !profile.general?.height && 
    !profile.general?.weight;

  // First time user experience - Welcome and setup
  if (isProfileEmpty) {
    return (
      <FirstTimeSetup handleGeneralSubmit={handleGeneralSubmit} 
      handleInputChange={handleInputChange}
      personalForm={personalForm}
      generalForm={generalForm}
      handlePersonalSubmit={handlePersonalSubmit}
      />
    );
  }

  // Dashboard view for existing users
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification message */}
      {(message || error) && (
        <div className={`p-4 fixed top-4 right-4 z-50 rounded-lg shadow-lg ${error ? 'bg-red-100 border-l-4 border-red-500' : 'bg-green-100 border-l-4 border-green-500'}`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {error ? (
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm ${error ? 'text-red-700' : 'text-green-700'}`}>
                {error || message}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={clearNotifications}
                  className={`inline-flex rounded-md p-1.5 ${error ? 'text-red-500 hover:bg-red-100' : 'text-green-500 hover:bg-green-100'}`}
                >
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Health Card</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your personal and health information
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
           <Nav
           setActiveTab={setActiveTab}
           activeTab={activeTab}
           />
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
             <ProfileDash
             setActiveTab={setActiveTab}
             />
            )}

            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
        <PersonalTab
        handleDeletePersonal={handleDeletePersonal}
        handleInputChange={handleInputChange}
        personalForm={personalForm}
        handlePersonalSubmit={handlePersonalSubmit}
        />
            )}

            {/* Health Info Tab */}
            {activeTab === 'health' && (
              <HealthInfo
              handleCalculateBMI={handleCalculateBMI}
              handleDeleteGeneral={handleDeleteGeneral}
              generalForm={generalForm}
              handleInputChange={handleInputChange}
              handleAddAllergen={handleAddAllergen}
              handleRemoveAllergen={handleRemoveAllergen}
              setNewAllergen={setNewAllergen}
              showAllergenInput={showAllergenInput}
              setShowAllergenInput={setShowAllergenInput}
              handleGeneralSubmit={handleGeneralSubmit}
              profile={profile}
              />
              )}
          </div>
        </div>
      </div>
    </div>
  );
}