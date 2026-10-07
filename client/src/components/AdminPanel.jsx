import { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    durationMinutes: '',
    category: 'General'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/services', {
        ...formData,
        price: Number(formData.price),
        durationMinutes: Number(formData.durationMinutes)
      });
      alert('Service added successfully');
      setShowAddForm(false);
      setFormData({ name: '', description: '', price: '', durationMinutes: '', category: 'General' });
    } catch (error) {
      alert('Failed to add service');
    }
  };

  return (
    <div className="card border-0 shadow-md mb-8">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-900">Admin Control Panel</h2>
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="btn-secondary"
        >
          {showAddForm ? 'Close' : 'Add New Service'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
              <input type="text" required className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input type="text" className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input type="number" required className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Mins)</label>
              <input type="number" required className="input-field" value={formData.durationMinutes} onChange={e => setFormData({...formData, durationMinutes: e.target.value})} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea className="input-field" rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
            </div>
          </div>
          <button type="submit" className="btn-primary mt-2">Save Service</button>
        </form>
      )}
    </div>
  );
};

export default AdminPanel;
