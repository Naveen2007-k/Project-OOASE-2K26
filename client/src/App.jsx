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
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/services" element={<Services />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/book/:id" element={<Booking />} />
            </Routes>
          </main>
          <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Beauty Salon. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
