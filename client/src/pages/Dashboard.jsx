import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminPanel from '../components/AdminPanel';

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

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user.name} ({user.role})</p>
          </div>
          {user.role === 'customer' && (
            <button onClick={() => navigate('/services')} className="btn-primary">
              New Booking
            </button>
          )}
        </div>

        {user.role === 'admin' && <AdminPanel />}

        <div className="card border-0 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">
            {user.role === 'customer' ? 'My Appointments' : 'All Appointments'}
          </h2>
          
          {loading ? (
             <div className="text-center py-10">Loading...</div>
          ) : appointments.length === 0 ? (
             <div className="text-center py-10 text-gray-500">No appointments found.</div>
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
