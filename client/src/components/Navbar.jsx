import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Scissors, UserCheck } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/75 backdrop-blur-xl border-b border-pink-100/80 shadow-xs sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 py-2.5">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-200 group-hover:scale-105 transition-transform">
                <Scissors size={20} className="transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-gray-900 tracking-tight leading-none">
                  Luxe<span className="text-pink-600">Salon</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-pink-500">Beauty & Spa</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/services" className="text-gray-700 hover:text-pink-600 font-semibold transition-colors flex items-center gap-1.5">
              <Sparkles size={16} className="text-pink-500" /> Services
            </Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="text-gray-700 hover:text-pink-600 font-semibold transition-colors">
                  Dashboard
                </Link>
                <div className="h-6 w-px bg-pink-100"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-xs uppercase border border-pink-200">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <div className="hidden sm:flex flex-col">
                    <span className="text-xs font-bold text-gray-900 leading-none">{user.name}</span>
                    <span className="text-[10px] font-semibold text-pink-600 capitalize">{user.role}</span>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="btn-secondary text-xs px-3.5 py-1.5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-gray-700 font-semibold hover:text-pink-600 transition-colors">Log in</Link>
                <Link to="/register" className="btn-primary text-sm px-5 py-2">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
