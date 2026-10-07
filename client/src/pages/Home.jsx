import { Link } from 'react-router-dom';
import { Calendar, Star, Clock, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Experience the Art of <span className="text-primary-600">Beauty & Wellness</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Book your next salon appointment with top-rated beauticians. Enjoy premium services, flexible scheduling, and a relaxing atmosphere tailored just for you.
            </p>
            <div className="flex gap-4">
              <Link to="/services" className="btn-primary text-lg px-8 py-3">Book Appointment</Link>
              <Link to="/register" className="btn-secondary text-lg px-8 py-3">Create Account</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We provide a seamless experience from booking to the final touch.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Scheduling</h3>
              <p className="text-gray-600">Book, reschedule, or cancel your appointments online anytime, anywhere.</p>
            </div>
            
            <div className="card text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Top Beauticians</h3>
              <p className="text-gray-600">Our staff is highly trained and experienced to give you the best look possible.</p>
            </div>

            <div className="card text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Payments</h3>
              <p className="text-gray-600">Pay securely online or choose to pay at the salon after your service is completed.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
