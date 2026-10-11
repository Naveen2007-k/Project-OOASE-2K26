import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminPanel from '../components/AdminPanel';
import { Sparkles, Calendar, CheckCircle2, Clock, Crown, ArrowRight, Scissors } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Review State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewApptId, setReviewApptId] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchAppointments = async () => {
      try {
        let endpoint = 'http://localhost:5000/api/appointments/my-appointments'; // Customer
        
        if (user.role === 'admin') {
          endpoint = 'http://localhost:5000/api/appointments';
        } else if (user.role === 'beautician') {
          endpoint = 'http://localhost:5000/api/appointments/staff';
        }
        
        const res = await axios.get(endpoint);
        setAppointments(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, navigate]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/status`, { status });
      // Update local state
      setAppointments(appointments.map(appt => 
        appt._id === id ? { ...appt, status } : appt
      ));
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/reviews', {
        appointmentId: reviewApptId,
        rating,
        comment
      });
      alert('Review submitted successfully!');
      setShowReviewModal(false);
      setReviewApptId(null);
      setComment('');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit review');
    }
  };

  if (!user) return null;

  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  const pendingCount = appointments.filter(a => a.status === 'Pending' || a.status === 'Confirmed').length;

  return (
    <div className="min-h-[calc(100vh-64px)] py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/80 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-700 bg-pink-100/80 px-3 py-1 rounded-full mb-2">
              <Sparkles size={14} /> Salon Dashboard
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight font-display">
              Welcome back, <span className="text-pink-600">{user.name}</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Account Role: <span className="font-semibold text-gray-800 capitalize">{user.role}</span> &bull; Manage your salon appointments & treatments
            </p>
          </div>
          {user.role === 'customer' && (
            <button onClick={() => navigate('/services')} className="btn-primary flex items-center gap-2 text-sm px-6 py-3">
              <Scissors size={18} /> Book New Service
            </button>
          )}
        </div>

        {/* Quick Luxury Stat Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="card bg-white/85 border border-white/80 p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center shadow-md shadow-pink-200">
              <Calendar size={26} />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Bookings</div>
              <div className="text-3xl font-black text-gray-900 font-display">{appointments.length}</div>
            </div>
          </div>

          <div className="card bg-white/85 border border-white/80 p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-md shadow-emerald-200">
              <CheckCircle2 size={26} />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Completed Sessions</div>
              <div className="text-3xl font-black text-gray-900 font-display">{completedCount}</div>
            </div>
          </div>

          <div className="card bg-white/85 border border-white/80 p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 text-white flex items-center justify-center shadow-md shadow-amber-200">
              <Crown size={26} />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Luxe Privilege</div>
              <div className="text-lg font-black text-gray-900 font-display capitalize">
                {user.role === 'admin' ? 'Admin Access' : 'VIP Gold Member'}
              </div>
            </div>
          </div>
        </div>

        {user.role === 'admin' && <AdminPanel />}

        {/* Appointments Table Card */}
        <div className="card bg-white/90 backdrop-blur-md border border-white/80 shadow-xl shadow-pink-100/40 rounded-3xl p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6 border-b border-pink-100 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-display">
                {user.role === 'customer' ? 'My Salon Appointments' : 'All Salon Reservations'}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Real-time status updates and treatment details</p>
            </div>
            {appointments.length > 0 && (
              <span className="text-xs font-bold bg-pink-50 text-pink-700 px-3 py-1 rounded-full border border-pink-200">
                {appointments.length} Records
              </span>
            )}
          </div>
          
          {loading ? (
             <div className="text-center py-16">
               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-600 mx-auto"></div>
               <p className="text-xs text-gray-400 mt-3 font-semibold">Fetching appointments...</p>
             </div>
          ) : appointments.length === 0 ? (
             <div className="text-center py-16 px-4">
               <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-500">
                 <Calendar size={28} />
               </div>
               <h3 className="text-lg font-bold text-gray-800 mb-1">No Appointments Booked Yet</h3>
               <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                 Browse our 18 luxury services and schedule your first self-care session with our master beauticians.
               </p>
               {user.role === 'customer' && (
                 <button onClick={() => navigate('/services')} className="btn-primary text-sm px-6 py-2.5">
                   Explore Services & Book
                 </button>
               )}
             </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {user.role === 'customer' ? 'Beautician' : 'Customer'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appt) => (
                    <tr key={appt._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(appt.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appt.startTime} - {appt.endTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {appt.serviceId?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.role === 'customer' ? appt.beauticianId?.name : appt.customerId?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        ${appt.totalAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${appt.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : 
                            appt.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            appt.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {user.role === 'customer' && appt.status === 'Completed' && (
                          <button 
                            onClick={() => { setReviewApptId(appt._id); setShowReviewModal(true); }} 
                            className="text-primary-600 hover:text-primary-900"
                          >
                            Leave Review
                          </button>
                        )}
                        {(user.role === 'admin' || user.role === 'beautician') && appt.status === 'Pending' && (
                          <button onClick={() => handleUpdateStatus(appt._id, 'Confirmed')} className="text-green-600 hover:text-green-900 mr-3">
                            Confirm
                          </button>
                        )}
                        {(user.role === 'admin' || user.role === 'beautician') && appt.status === 'Confirmed' && (
                          <button onClick={() => handleUpdateStatus(appt._id, 'Completed')} className="text-blue-600 hover:text-blue-900 mr-3">
                            Mark Completed
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Rate Your Experience</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
                <select 
                  className="input-field" 
                  value={rating} 
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Terrible</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                <textarea 
                  className="input-field" 
                  rows="3" 
                  placeholder="Tell us about your service..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowReviewModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Submit Review</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
