import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Clock, Sparkles, Scissors, Heart, Palette, Wand2, Search, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['All', 'Hair', 'Skincare', 'Makeup', 'Spa', 'Nails', 'Waxing'];

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
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

  const getServiceVisual = (category, name) => {
    const cat = (category || '').toLowerCase();
    const nm = (name || '').toLowerCase();

    if (cat.includes('hair') || nm.includes('hair')) {
      return {
        bg: 'from-rose-500 via-pink-500 to-rose-400',
        badge: 'bg-rose-50 text-rose-700 border-rose-200',
        icon: <Scissors size={32} className="text-white drop-shadow-md" />
      };
    }
    if (cat.includes('skin') || cat.includes('facial') || nm.includes('facial')) {
      return {
        bg: 'from-amber-400 via-orange-400 to-rose-400',
        badge: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: <Sparkles size={32} className="text-white drop-shadow-md" />
      };
    }
    if (cat.includes('makeup') || nm.includes('makeup')) {
      return {
        bg: 'from-purple-500 via-fuchsia-500 to-pink-500',
        badge: 'bg-purple-50 text-purple-700 border-purple-200',
        icon: <Palette size={32} className="text-white drop-shadow-md" />
      };
    }
    if (cat.includes('spa') || cat.includes('massage') || nm.includes('massage')) {
      return {
        bg: 'from-teal-500 via-emerald-500 to-teal-400',
        badge: 'bg-teal-50 text-teal-700 border-teal-200',
        icon: <Heart size={32} className="text-white drop-shadow-md" />
      };
    }
    if (cat.includes('nail') || nm.includes('manicure') || nm.includes('nail')) {
      return {
        bg: 'from-violet-500 via-purple-500 to-indigo-500',
        badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        icon: <Wand2 size={32} className="text-white drop-shadow-md" />
      };
    }
    return {
      bg: 'from-pink-500 via-rose-500 to-red-400',
      badge: 'bg-pink-50 text-pink-700 border-pink-200',
      icon: <Sparkles size={32} className="text-white drop-shadow-md" />
    };
  };

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesCategory = selectedCategory === 'All' || 
        (service.category && service.category.toLowerCase() === selectedCategory.toLowerCase());
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        service.name.toLowerCase().includes(query) ||
        (service.description && service.description.toLowerCase().includes(query)) ||
        (service.category && service.category.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-3 shadow-xs">
            <Sparkles size={16} /> Luxe Salon & Spa Experience
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Our Luxury Salon Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from precision hair artistry, advanced medical-grade facials, royal bridal makeovers, and deeply restorative spa therapies.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md shadow-pink-200 scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search treatments, style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-6 px-1">
          <p className="text-sm font-semibold text-gray-500">
            Showing <span className="text-gray-900 font-bold">{filteredServices.length}</span> of {services.length} services
          </p>
          {selectedCategory !== 'All' && (
            <button 
              onClick={() => setSelectedCategory('All')} 
              className="text-xs font-semibold text-pink-600 hover:text-pink-800"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center py-24">
            <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-pink-600 mx-auto"></div>
            <p className="text-gray-500 mt-4 text-sm font-medium">Loading salon services...</p>
          </div>
        ) : (
          /* Services Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100 px-6">
                <Sparkles size={48} className="mx-auto text-pink-400 mb-4 animate-bounce" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Services Found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm">
                  We couldn't find any services matching "{searchQuery || selectedCategory}". Try clearing your search filters.
                </p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="btn-secondary text-sm px-6 py-2"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              filteredServices.map((service) => {
                const visual = getServiceVisual(service.category, service.name);
                return (
                  <div 
                    key={service._id} 
                    className="card hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group border-0 shadow-md bg-white rounded-3xl overflow-hidden flex flex-col justify-between p-6"
                  >
                    <div>
                      {/* Gradient Header Banner with Icon */}
                      <div className={`h-40 bg-gradient-to-tr ${visual.bg} -mt-6 -mx-6 mb-5 flex flex-col justify-between p-5 relative overflow-hidden shadow-inner`}>
                        <div className="flex justify-between items-start z-10">
                          <span className="bg-white/90 backdrop-blur-md text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            {service.category || 'Beauty'}
                          </span>
                        </div>
                        <div className="flex justify-center items-center z-10">
                          {visual.icon}
                        </div>
                        <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                      </div>
                      
                      {/* Service Details */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors leading-snug">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 mb-6 text-sm leading-relaxed min-h-[44px]">
                        {service.description || 'Professional beauty treatment tailored for your optimal glow.'}
                      </p>
                    </div>

                    <div>
                      {/* Duration & Price Bar */}
                      <div className="flex items-center justify-between mb-5 pt-3 border-t border-gray-100">
                        <div className="flex items-center text-gray-700 text-xs font-bold bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                          <Clock size={15} className="mr-1.5 text-pink-500" />
                          {service.durationMinutes} mins
                        </div>
                        <div className="flex items-baseline text-2xl font-black text-gray-900">
                          <span className="text-pink-600 text-lg mr-0.5 font-bold">$</span>
                          {service.price}
                        </div>
                      </div>
                      
                      {/* Book Action Button */}
                      <button 
                        onClick={() => handleBook(service._id)} 
                        className="btn-primary w-full py-3 shadow-md hover:shadow-lg font-bold flex items-center justify-center gap-2 group-hover:scale-[1.01] transition-all"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
