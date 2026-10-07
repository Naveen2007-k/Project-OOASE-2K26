import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Scissors } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary-100 p-2 rounded-lg text-primary-600">
                <Scissors size={24} />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">Luxe<span className="text-primary-600">Salon</span></span>
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/services" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Services</Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                  Dashboard
                </Link>
                <div className="h-6 w-px bg-gray-200"></div>
                <div className="text-sm font-medium text-gray-700">Hi, {user.name}</div>
                <button 
                  onClick={handleLogout}
                  className="btn-secondary text-sm px-3 py-1.5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-gray-600 font-medium hover:text-primary-600 transition-colors">Log in</Link>
                <Link to="/register" className="btn-primary">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
