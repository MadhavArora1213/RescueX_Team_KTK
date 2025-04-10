import React, { useState, useEffect } from 'react';
import { FaUser, FaInfoCircle, FaMapMarkerAlt, FaBell, FaExclamationTriangle } from 'react-icons/fa';
import MapView from "../map/MapView";
import Heatmap from "../map/Heatmap";
import Chat from "../common/Chat";
import { getAgencyData } from "../../services/api";

// Export as named export to fix the import error
export const AgencyDashboard = () => {
  const [agencyData, setAgencyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [emergencies, setEmergencies] = useState([]);
  const [stats, setStats] = useState({
    activeSOSCalls: 0,
    agenciesOnline: 0,
    resourcesAvailable: 0,
    completedMissions: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would fetch actual data from the backend
        // const response = await getAgencyData('current-agency-id');
        
        // For demo purposes, we'll use mock data
        setAgencyData({
          id: 'agency-123',
          name: 'Metro Fire & Rescue',
          type: 'Fire Department',
          location: {
            latitude: 40.7128,
            longitude: -74.0060
          },
          status: 'active',
          resources: [
            { type: 'Fire Truck', count: 5, available: 3 },
            { type: 'Ambulance', count: 3, available: 2 },
            { type: 'Rescue Team', count: 4, available: 3 }
          ],
          personnel: {
            total: 45,
            active: 32
          }
        });
        
        setEmergencies([
          {
            id: 'sos-1',
            type: 'fire',
            location: {
              latitude: 40.7135,
              longitude: -74.0046,
              address: '123 Broadway, Manhattan'
            },
            status: 'active',
            reportedAt: new Date().getTime() - 1000 * 60 * 15, // 15 mins ago
            priority: 'high'
          },
          {
            id: 'sos-2',
            type: 'medical',
            location: {
              latitude: 40.7120,
              longitude: -74.0052,
              address: '456 Park Ave, Manhattan'
            },
            status: 'pending',
            reportedAt: new Date().getTime() - 1000 * 60 * 5, // 5 mins ago
            priority: 'medium'
          }
        ]);
        
        setStats({
          activeSOSCalls: 7,
          agenciesOnline: 5,
          resourcesAvailable: 18,
          completedMissions: 32
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching agency data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatTime = (timestamp) => {
    const minutes = Math.floor((new Date().getTime() - timestamp) / (1000 * 60));
    return minutes < 60 
      ? `${minutes} min ago` 
      : `${Math.floor(minutes / 60)} hrs ${minutes % 60} min ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Agency Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg p-6 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">{agencyData.name}</h1>
            <p className="text-blue-200">{agencyData.type}</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500 text-white">
              <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
              Active
            </span>
            <button className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition duration-200">
              Update Status
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-red-100 p-3 mr-4">
              <FaExclamationTriangle className="text-red-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active SOS Calls</p>
              <p className="text-2xl font-bold">{stats.activeSOSCalls}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <FaUser className="text-green-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Agencies Online</p>
              <p className="text-2xl font-bold">{stats.agenciesOnline}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <FaInfoCircle className="text-blue-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Resources Available</p>
              <p className="text-2xl font-bold">{stats.resourcesAvailable}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <FaBell className="text-purple-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Missions</p>
              <p className="text-2xl font-bold">{stats.completedMissions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'emergencies'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('emergencies')}
          >
            Emergencies
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'resources'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'communication'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('communication')}
          >
            Communication
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Emergency Heatmap</h3>
              </div>
              <div className="h-96">
                <MapView />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Recent Emergencies</h3>
              </div>
              <div className="p-4 max-h-96 overflow-y-auto">
                {emergencies.map(emergency => (
                  <div key={emergency.id} className="mb-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`rounded-full p-2 mr-3 ${
                          emergency.type === 'fire' ? 'bg-red-100 text-red-500' :
                          emergency.type === 'medical' ? 'bg-blue-100 text-blue-500' :
                          emergency.type === 'flood' ? 'bg-teal-100 text-teal-500' :
                          'bg-yellow-100 text-yellow-500'
                        }`}>
                          {emergency.type === 'fire' && <span>🔥</span>}
                          {emergency.type === 'medical' && <span>🚑</span>}
                          {emergency.type === 'flood' && <span>🌊</span>}
                          {emergency.type === 'other' && <span>⚠️</span>}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {emergency.type.charAt(0).toUpperCase() + emergency.type.slice(1)} Emergency
                          </h4>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <FaMapMarkerAlt className="mr-1 text-gray-400" />
                            {emergency.location.address}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          emergency.status === 'active' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {emergency.status.toUpperCase()}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTime(emergency.reportedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 mr-2">
                        Respond
                      </button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'emergencies' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">All Emergencies</h3>
            </div>
            <div className="p-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reported
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 bg-gray-50"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {emergencies.map(emergency => (
                    <tr key={emergency.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                            emergency.type === 'fire' ? 'bg-red-100' :
                            emergency.type === 'medical' ? 'bg-blue-100' :
                            emergency.type === 'flood' ? 'bg-teal-100' :
                            'bg-yellow-100'
                          }`}>
                            {emergency.type === 'fire' && <span className="text-xl">🔥</span>}
                            {emergency.type === 'medical' && <span className="text-xl">🚑</span>}
                            {emergency.type === 'flood' && <span className="text-xl">🌊</span>}
                            {emergency.type === 'other' && <span className="text-xl">⚠️</span>}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {emergency.type.charAt(0).toUpperCase() + emergency.type.slice(1)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{emergency.location.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          emergency.status === 'active' ? 'bg-red-100 text-red-800' : 
                          emergency.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {emergency.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatTime(emergency.reportedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          emergency.priority === 'high' ? 'bg-red-100 text-red-800' : 
                          emergency.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {emergency.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">Respond</button>
                        <button className="text-gray-600 hover:text-gray-900">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'resources' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">Available Resources</h3>
            </div>
            <div className="p-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resource Type
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Available
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {agencyData.resources.map((resource, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{resource.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resource.count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resource.available}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`h-2.5 w-2.5 rounded-full ${
                            resource.available > 0 ? 'bg-green-500' : 'bg-red-500'
                          } mr-2`}></div>
                          {resource.available > 0 ? 'Available' : 'Unavailable'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'communication' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">Communications Center</h3>
            </div>
            <Chat />
          </div>
        )}
      </div>
    </div>
  );
};

// Also export as default to be flexible
export default AgencyDashboard;