import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle, FiMapPin, FiUsers, FiArrowRight, FiCheck } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import MapView from '../components/map/MapView';

const Home = () => {
  const { user } = useAuth();
  
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-charcoal-black to-gray-800 text-white py-16 px-4 rounded-lg mb-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Emergency Response at Your Fingertips
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                RescueGrid connects citizens with emergency services during disasters, providing real-time coordination and life-saving information.
              </p>
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <Link 
                    to="/dashboard" 
                    className="bg-emergency-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
                  >
                    Go to Dashboard <FiArrowRight className="ml-2" />
                  </Link>
                ) : (
                  <Link 
                    to="/register" 
                    className="bg-emergency-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
                  >
                    Register Now <FiArrowRight className="ml-2" />
                  </Link>
                )}
                <Link 
                  to="/about" 
                  className="bg-transparent border border-white hover:bg-white hover:text-charcoal-black text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/src/assets/images/hero-illustration.svg" 
                alt="Emergency Response Illustration" 
                className="max-w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400?text=Emergency+Response';
                }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How RescueGrid Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-red-100 text-emergency-red rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FiAlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Emergency SOS</h3>
              <p className="text-gray-600">
                Send emergency alerts with your exact location to nearby services with a single tap.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FiMapPin size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Live Disaster Mapping</h3>
              <p className="text-gray-600">
                Access real-time maps showing active disasters, safe zones, and emergency services.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 text-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FiUsers size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Agency Coordination</h3>
              <p className="text-gray-600">
                Connect with multiple emergency services through a unified platform for faster response.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Preview Section */}
      <section className="py-12 bg-white rounded-lg shadow-md mb-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Emergency Services Near You</h2>
          <p className="text-gray-600 mb-8">
            RescueGrid provides real-time mapping of emergency services and incidents in your area.
          </p>
          
          <div className="h-96 rounded-lg overflow-hidden shadow-lg">
            <MapView height="100%" showEmergencies={true} />
          </div>
          
          <div className="mt-6 text-center">
            <Link 
              to={user ? "/dashboard" : "/register"} 
              className="inline-flex items-center text-emergency-red hover:text-red-700 font-medium"
            >
              View detailed emergency map <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Emergency Responders</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xl">FD</span>
                </div>
                <div>
                  <h3 className="font-bold">Fire Department</h3>
                  <p className="text-gray-500">Metro City</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "RescueGrid has revolutionized our response time. Being able to see emergency calls in real-time with exact locations has saved countless lives."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold text-xl">ER</span>
                </div>
                <div>
                  <h3 className="font-bold">Emergency Medical Services</h3>
                  <p className="text-gray-500">Central Hospital</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The coordination between agencies through RescueGrid allows us to prepare before arrival and provide better medical care during emergencies."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-emergency-red text-white py-16 px-4 rounded-lg">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Be Prepared for Any Emergency</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Download RescueGrid now and connect with emergency services before disaster strikes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {user ? (
              <Link 
                to="/dashboard" 
                className="bg-white text-emergency-red hover:bg-gray-100 px-8 py-3 rounded-lg font-medium"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  to="/register" 
                  className="bg-white text-emergency-red hover:bg-gray-100 px-8 py-3 rounded-lg font-medium"
                >
                  Sign Up Now
                </Link>
                <Link 
                  to="/login" 
                  className="bg-transparent border border-white hover:bg-white hover:text-emergency-red text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Features List */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Key Benefits of RescueGrid</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <FiCheck className="text-green-600" />
                </div>
                <span>One-tap SOS emergency alerts with your exact location</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <FiCheck className="text-green-600" />
                </div>
                <span>Real-time disaster mapping showing safe zones and danger areas</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <FiCheck className="text-green-600" />
                </div>
                <span>Direct communication with emergency responders during disasters</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <FiCheck className="text-green-600" />
                </div>
                <span>Offline mode for when communication networks are down</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <FiCheck className="text-green-600" />
                </div>
                <span>Family and group tracking during emergency situations</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;