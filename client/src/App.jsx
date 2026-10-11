import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen relative overflow-x-hidden">
          {/* Ambient Glowing Orbs Background */}
          <div className="fixed top-0 left-0 w-96 h-96 bg-pink-300/25 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
          <div className="fixed top-20 right-0 w-[28rem] h-[28rem] bg-amber-200/20 rounded-full blur-3xl pointer-events-none translate-x-1/3"></div>
          <div className="fixed bottom-0 left-1/3 w-[32rem] h-[32rem] bg-purple-300/20 rounded-full blur-3xl pointer-events-none translate-y-1/3"></div>

          <Navbar />
          
          <main className="flex-grow relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/services" element={<Services />} />
              <Route path="/book" element={<Services />} />
              <Route path="/booking" element={<Services />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/book/:id" element={<Booking />} />
            </Routes>
          </main>

          <footer className="bg-white/60 backdrop-blur-md border-t border-pink-100/80 py-8 text-center text-gray-500 relative z-10">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-gray-900 tracking-tight">Luxe<span className="text-pink-600">Salon</span></span>
                <span className="text-xs text-gray-400">| Premium Beauty Experience</span>
              </div>
              <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} LuxeSalon System. Crafted with elegance for academic demonstration.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
