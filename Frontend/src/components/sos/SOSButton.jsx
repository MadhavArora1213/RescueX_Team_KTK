import React, { useState } from 'react';
import { FaExclamationTriangle, FaArrowRight, FaLocationArrow } from 'react-icons/fa';
import { createSOSSignal } from '../../services/api';

const SOSButton = ({ onClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [location, setLocation] = useState(null);
  const [emergencyType, setEmergencyType] = useState('');
  const [description, setDescription] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
    // Reset state when opening modal
    setStep(1);
    setSuccess(false);
    setEmergencyType('');
    setDescription('');
    
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleEmergencyTypeSelect = (type) => {
    setEmergencyType(type);
  };

  const handleSubmit = async () => {
    if (!location) {
      alert('Location is required. Please enable location services.');
      return;
    }

    try {
      setLoading(true);
      
      const sosData = {
        location,
        type: emergencyType,
        description,
        timestamp: new Date().toISOString(),
        status: 'pending'
      };
      
      // Call the parent's onClick handler if provided
      if (onClick) {
        onClick(sosData);
      }
      
      // In a real app, this would send data to your backend
      // await createSOSSignal(sosData);
      
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      setLoading(false);
      
      // Close modal after success
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting SOS:', error);
      setLoading(false);
      alert('Failed to send SOS. Please try again or call emergency services directly.');
    }
  };

  return (
    <>
      <div className="mb-6">
        <button
          onClick={handleOpenModal}
          className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-lg shadow-lg transition-all hover:shadow-xl transform hover:-translate-y-1"
        >
          <FaExclamationTriangle className="mr-2 h-6 w-6" />
          <span className="text-xl font-bold">SOS EMERGENCY</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
            {/* Modal Header */}
            <div className="bg-red-600 text-white py-4 px-6">
              <h2 className="text-xl font-bold flex items-center">
                <FaExclamationTriangle className="mr-2" /> Emergency SOS
              </h2>
              {step < 3 && (
                <p className="text-sm text-red-100 mt-1">
                  Step {step} of 2: {step === 1 ? 'Emergency Type' : 'Additional Details'}
                </p>
              )}
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4">
              {success ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">SOS Signal Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Help is on the way. Stay where you are if safe to do so.
                  </p>
                </div>
              ) : (
                <>
                  {step === 1 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Select Emergency Type:</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          className={`p-4 flex flex-col items-center justify-center rounded-lg border-2 hover:bg-red-50 ${
                            emergencyType === 'fire' ? 'bg-red-100 border-red-500' : 'border-gray-300'
                          }`}
                          onClick={() => handleEmergencyTypeSelect('fire')}
                        >
                          <span className="text-2xl mb-2">🔥</span>
                          <span className="font-medium">Fire</span>
                        </button>
                        <button
                          type="button"
                          className={`p-4 flex flex-col items-center justify-center rounded-lg border-2 hover:bg-red-50 ${
                            emergencyType === 'medical' ? 'bg-red-100 border-red-500' : 'border-gray-300'
                          }`}
                          onClick={() => handleEmergencyTypeSelect('medical')}
                        >
                          <span className="text-2xl mb-2">🚑</span>
                          <span className="font-medium">Medical</span>
                        </button>
                        <button
                          type="button"
                          className={`p-4 flex flex-col items-center justify-center rounded-lg border-2 hover:bg-red-50 ${
                            emergencyType === 'flood' ? 'bg-red-100 border-red-500' : 'border-gray-300'
                          }`}
                          onClick={() => handleEmergencyTypeSelect('flood')}
                        >
                          <span className="text-2xl mb-2">🌊</span>
                          <span className="font-medium">Flood</span>
                        </button>
                        <button
                          type="button"
                          className={`p-4 flex flex-col items-center justify-center rounded-lg border-2 hover:bg-red-50 ${
                            emergencyType === 'other' ? 'bg-red-100 border-red-500' : 'border-gray-300'
                          }`}
                          onClick={() => handleEmergencyTypeSelect('other')}
                        >
                          <span className="text-2xl mb-2">⚠️</span>
                          <span className="font-medium">Other</span>
                        </button>
                      </div>
                      <div className="mt-6">
                        {location ? (
                          <div className="flex items-center text-sm text-green-600">
                            <FaLocationArrow className="mr-1" />
                            <span>Location detected</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-sm text-yellow-600">
                            <FaLocationArrow className="mr-1" />
                            <span>Getting your location...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Additional Details:</h3>
                      <textarea
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Describe the emergency situation (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Modal Footer */}
            {!success && (
              <div className="px-6 py-4 bg-gray-50 flex justify-between">
                {step === 1 ? (
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Back
                  </button>
                )}
                
                {step === 2 ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!emergencyType || loading}
                    className={`px-4 py-2 rounded bg-red-600 text-white flex items-center ${
                      !emergencyType || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 4v4m0 4v4" />
                        </svg>
                        Loading...
                      </>
                    ) : (
                      <>
                        <FaArrowRight className="mr-2" />
                        Submit
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!emergencyType}
                    className={`px-4 py-2 rounded bg-blue-600 text-white ${
                      !emergencyType ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SOSButton;