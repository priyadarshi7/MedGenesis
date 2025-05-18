import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useProfileStore } from '../../store/profileStore';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Activity, User, Droplet, Heart, Calendar, Map, Phone, FileText, Thermometer, Scale, Clock, AlertCircle } from 'lucide-react';

function ProfileDash({ setActiveTab }) {
  const { user } = useAuthStore();
  const { profile } = useProfileStore();
  
  // Sample health stats data for visualization
  const [healthStats] = useState({
    bmi: profile.general?.bmi || 22.5,
    heartRate: profile.general?.heartrate || 72,
    bloodPressure: profile.general?.bloodpressure ? 
      parseInt(profile.general.bloodpressure.split('/')[0]) : 120,
    sleepData: [
      { name: 'Mon', hours: 7.2 },
      { name: 'Tue', hours: 6.8 },
      { name: 'Wed', hours: 7.5 },
      { name: 'Thu', hours: 8.1 },
      { name: 'Fri', hours: 6.5 },
      { name: 'Sat', hours: 7.8 },
      { name: 'Sun', hours: 8.2 },
    ],
    activityData: [
      { name: 'Steps', value: 8456 },
      { name: 'Calories', value: 1845 },
      { name: 'Water', value: 2100 },
    ],
    vitalsSummary: [
      { name: 'BP', value: profile.general?.bloodpressure ? 
        parseInt(profile.general.bloodpressure.split('/')[0]) : 120 },
      { name: 'HR', value: profile.general?.heartrate || 72 },
      { name: 'BMI', value: profile.general?.bmi ? Math.round(profile.general.bmi * 10) : 225 },
    ]
  });

  // Colors for the charts
  const COLORS = ['#8b5cf6', '#6366f1', '#ec4899', '#8b5cf6'];
  
  // Function to determine BMI category and color
  const getBmiCategory = (bmi) => {
    if (!bmi) return { category: 'Not calculated', color: '#6b7280' };
    if (bmi < 18.5) return { category: 'Underweight', color: '#60a5fa' };
    if (bmi < 25) return { category: 'Normal', color: '#34d399' };
    if (bmi < 30) return { category: 'Overweight', color: '#fbbf24' };
    return { category: 'Obese', color: '#f87171' };
  };
  
  const bmiInfo = getBmiCategory(profile.general?.bmi);

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-gray-800 overflow-hidden shadow-lg rounded-xl border border-purple-500/20">
          <div className="px-6 py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg p-3 shadow-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-400 truncate">
                    Name
                  </dt>
                  <dd>
                    <div className="text-2xl font-bold text-white">
                      {user?.name || "Not specified"}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 overflow-hidden shadow-lg rounded-xl border border-purple-500/20">
          <div className="px-6 py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-br from-pink-600 to-purple-600 rounded-lg p-3 shadow-lg">
                <Droplet className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-400 truncate">
                    Blood Group
                  </dt>
                  <dd>
                    <div className="text-2xl font-bold text-white">
                      {profile.general?.bloodgroup || "Not specified"}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 overflow-hidden shadow-lg rounded-xl border border-purple-500/20">
          <div className="px-6 py-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg p-3 shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-400 truncate">
                    BMI
                  </dt>
                  <dd className="flex items-center">
                    <div className="text-2xl font-bold text-white">
                      {profile.general?.bmi ? profile.general.bmi.toFixed(1) : "Not calculated"}
                    </div>
                    <span className="ml-2 px-2 py-1 text-xs rounded-full" style={{ backgroundColor: bmiInfo.color + '33', color: bmiInfo.color }}>
                      {bmiInfo.category}
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Visualization Section */}
      <div className="mt-8 bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-purple-500/20">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Activity className="mr-2 text-purple-400" />
            Health Metrics
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Vitals Overview */}
            <div className="bg-gray-900 p-4 rounded-lg shadow">
              <h4 className="text-purple-400 font-medium mb-3">Vitals Summary</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={healthStats.vitalsSummary}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name }) => name}
                    >
                      {healthStats.vitalsSummary.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#6366f1', color: '#f3f4f6' }}
                      formatter={(value, name, props) => {
                        if (name === 'BMI') return [value / 10, name];
                        return [value, name];
                      }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Sections */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Personal Info */}
        <div className="bg-gray-800 overflow-hidden shadow-lg rounded-xl border border-purple-500/20">
          <div className="px-6 py-5">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <User className="mr-2 text-purple-400" />
              Personal Information
            </h3>
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1 bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <User className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-400">Gender</div>
                      <div className="mt-1 text-lg font-medium text-white">{profile.personal?.gender || "Not specified"}</div>
                    </div>
                  </div>
                </div>
                
                <div className="sm:col-span-1 bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Calendar className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-400">Date of Birth</div>
                      <div className="mt-1 text-lg font-medium text-white">
                        {profile.personal?.dob ? new Date(profile.personal.dob).toLocaleDateString() : "Not specified"}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="sm:col-span-1 bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Phone className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-400">Contact Number</div>
                      <div className="mt-1 text-lg font-medium text-white">{profile.personal?.contact || "Not specified"}</div>
                    </div>
                  </div>
                </div>
                
                <div className="sm:col-span-1 bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Map className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-400">Location</div>
                      <div className="mt-1 text-lg font-medium text-white">
                        {profile.personal?.city && profile.personal?.state 
                          ? `${profile.personal.city}, ${profile.personal.state}` 
                          : profile.personal?.city || profile.personal?.state || "Not specified"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setActiveTab('personal')}
                className="inline-flex items-center px-4 py-2 border border-purple-500 shadow-md text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
              >
                Edit Personal Info
              </button>
            </div>
          </div>
        </div>

        {/* Health Info */}
        <div className="bg-gray-800 overflow-hidden shadow-lg rounded-xl border border-purple-500/20">
          <div className="px-6 py-5">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Heart className="mr-2 text-purple-400" />
              Health Information
            </h3>
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1 bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Scale className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-400">Height</div>
                      <div className="mt-1 text-lg font-medium text-white">
                        {profile.general?.height ? `${profile.general.height} cm` : "Not specified"}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="sm:col-span-1 bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Activity className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-400">Weight</div>
                      <div className="mt-1 text-lg font-medium text-white">
                        {profile.general?.weight ? `${profile.general.weight} kg` : "Not specified"}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="sm:col-span-1 bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Thermometer className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-400">Blood Pressure</div>
                      <div className="mt-1 text-lg font-medium text-white">
                        {profile.general?.bloodpressure || "Not specified"}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="sm:col-span-1 bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Heart className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-400">Heart Rate</div>
                      <div className="mt-1 text-lg font-medium text-white">
                        {profile.general?.heartrate ? `${profile.general.heartrate} bpm` : "Not specified"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <AlertCircle className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="ml-3 w-full">
                    <div className="text-sm font-medium text-gray-400">Allergies</div>
                    <div className="mt-2">
                      {profile.general?.allergies?.length ? (
                        <div className="flex flex-wrap gap-2">
                          {profile.general.allergies.map((allergen, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-900/40 text-red-300 border border-red-500/20"
                            >
                              {allergen}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">No allergies specified</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setActiveTab('health')}
                className="inline-flex items-center px-4 py-2 border border-purple-500 shadow-md text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
              >
                Edit Health Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDash;