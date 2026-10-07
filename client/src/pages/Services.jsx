import { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/services');
        setServices(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services', error);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleBook = (serviceId) => {
    if (user) {
      navigate(`/book/${serviceId}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Services</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of beauty treatments designed to help you look and feel your absolute best.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                No services available at the moment. Please check back later.
              </div>
            ) : (
              services.map((service) => (
                <div key={service._id} className="card hover:shadow-lg transition-all group border-0 shadow-md">
                  <div className="h-48 bg-primary-100 rounded-lg -mt-2 -mx-2 mb-4 flex items-center justify-center text-primary-300">
                     {/* Placeholder for service image */}
                     <span className="text-4xl font-bold opacity-50">{service.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-6 min-h-[48px]">{service.description || 'Professional beauty service tailored for you.'}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-gray-700 font-medium bg-gray-100 px-3 py-1 rounded-full">
                      <Clock size={16} className="mr-2 text-primary-500" />
                      {service.durationMinutes} mins
                    </div>
                    <div className="flex items-center text-2xl font-bold text-gray-900">
                      <DollarSign size={20} className="text-primary-600" />
                      {service.price}
                    </div>
                  </div>
                  
                  <button onClick={() => handleBook(service._id)} className="btn-primary w-full py-3 opacity-90 group-hover:opacity-100 transition-opacity">
                    Book Now
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
