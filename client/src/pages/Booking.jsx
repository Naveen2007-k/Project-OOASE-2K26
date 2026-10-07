import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Calendar as CalendarIcon, Clock, User as UserIcon, CreditCard, CheckCircle } from 'lucide-react';

const Booking = () => {
  const { id: serviceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [service, setService] = useState(null);
  const [beauticians, setBeauticians] = useState([]);
  
  const [selectedBeautician, setSelectedBeautician] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [servicesRes, beauticiansRes] = await Promise.all([
          axios.get('http://localhost:5000/api/services'),
          axios.get('http://localhost:5000/api/users/beauticians')
        ]);
        
        const foundService = servicesRes.data.find(s => s._id === serviceId);
        if (!foundService) {
          setError('Service not found');
        } else {
          setService(foundService);
        }
        
        setBeauticians(beauticiansRes.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [serviceId, navigate, user]);

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!selectedBeautician || !selectedDate || !selectedTime) {
      return setError('Please complete all selections');
    }
    setError('');
    setShowPayment(true);
  };

  const handleConfirmBooking = async () => {
    setProcessing(true);
    
    // Calculate end time simply for mock purposes
    const [time, period] = selectedTime.split(' ');
    let [hours] = time.split(':');
    hours = parseInt(hours);
    let endHours = hours + Math.ceil(service.durationMinutes / 60);
    if (endHours > 12) endHours -= 12;
    const endTime = `${endHours < 10 ? '0'+endHours : endHours}:00 ${period === 'AM' && endHours < 12 ? 'AM' : 'PM'}`;

    try {
      await axios.post('http://localhost:5000/api/appointments', {
        serviceId: service._id,
        beauticianId: selectedBeautician,
        date: selectedDate,
        startTime: selectedTime,
        endTime
      });
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
      setShowPayment(false);
    }
    setProcessing(false);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error && !showPayment) return <div className="text-center py-20 text-red-500">{error}</div>;

  if (success) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50">
        <div className="card text-center max-w-md p-10">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your payment was successful and the appointment is booked.</p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Appointment</h1>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Service Summary Header */}
          <div className="bg-primary-50 p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">{service?.name}</h2>
            <div className="flex gap-4 mt-2 text-gray-600 text-sm">
              <span className="flex items-center"><Clock size={16} className="mr-1"/> {service?.durationMinutes} mins</span>
              <span className="font-semibold text-gray-900">${service?.price}</span>
            </div>
          </div>

          <div className="p-6">
            {!showPayment ? (
              <form onSubmit={handleProceedToPayment} className="space-y-8">
                
                {/* Select Beautician */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <UserIcon size={18} className="text-primary-600"/> Select Beautician
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {beauticians.map(b => (
                      <div 
                        key={b._id}
                        onClick={() => setSelectedBeautician(b._id)}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedBeautician === b._id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
                      >
                        <div className="font-semibold text-gray-900">{b.name}</div>
                        <div className="text-sm text-gray-500 text-sm capitalize">{b.specialization || 'Generalist'}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <CalendarIcon size={18} className="text-primary-600"/> Select Date
                  </label>
                  <input 
                    type="date" 
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="input-field max-w-sm"
                  />
                </div>

                {/* Select Time */}
                {selectedDate && selectedBeautician && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <Clock size={18} className="text-primary-600"/> Select Time
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {timeSlots.map(time => (
                        <div 
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`border rounded-lg p-3 text-center cursor-pointer transition-colors ${selectedTime === time ? 'border-primary-500 bg-primary-50 font-medium text-primary-700' : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button type="submit" className="btn-primary px-8">Continue to Payment</button>
                </div>
              </form>
            ) : (
              /* Payment Mock UI */
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{service.name}</span>
                    <span>${service.price}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Date & Time</span>
                    <span>{selectedDate} at {selectedTime}</span>
                  </div>
                  <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>${service.price}</span>
                  </div>
                </div>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <CreditCard size={18} className="text-gray-500"/> Card Details (Mock)
                  </label>
                  <input type="text" placeholder="Card Number (e.g. 4242 4242 4242 4242)" className="input-field mb-3" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="MM/YY" className="input-field" />
                    <input type="text" placeholder="CVC" className="input-field" />
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <button onClick={() => setShowPayment(false)} className="btn-secondary flex-1" disabled={processing}>Back</button>
                  <button onClick={handleConfirmBooking} className="btn-primary flex-1 flex justify-center" disabled={processing}>
                    {processing ? 'Processing...' : `Pay $${service.price}`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
