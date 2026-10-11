import { Link } from 'react-router-dom';
import { Calendar, Star, Clock, ShieldCheck, Sparkles, HeartHandshake, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md text-pink-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-sm border border-pink-200/60">
                <Sparkles size={15} className="text-pink-600 animate-spin" style={{ animationDuration: '6s' }} /> 
                The Pinnacle of Luxury Beauty & Wellness
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.15] mb-6 font-display">
                Sculpt Your Elegance, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500">
                  Embrace Pure Glow.
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
                Experience bespoke hair artistry, high-potency facials, and holistic spa treatments delivered by certified master beauticians in a serene sanctuary.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/services" className="btn-primary text-base px-8 py-3.5 shadow-lg shadow-pink-300/40">
                  Browse 18 Services
                </Link>
                <Link to="/register" className="btn-secondary text-base px-8 py-3.5">
                  Join VIP Club
                </Link>
              </div>

              {/* Quick Salon Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-pink-200/60 max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">18+</div>
                  <div className="text-xs font-medium text-gray-500">Luxury Treatments</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-pink-600 font-display">5★</div>
                  <div className="text-xs font-medium text-gray-500">Top Stylists</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">100%</div>
                  <div className="text-xs font-medium text-gray-500">Organic Care</div>
                </div>
              </div>
            </div>

            {/* Visual Glassmorphic Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                <div className="card border border-white/80 shadow-2xl shadow-pink-200/50 p-6 relative overflow-hidden bg-white/90">
                  <div className="h-64 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 p-6 flex flex-col justify-between text-white relative shadow-inner overflow-hidden">
                    <div className="flex justify-between items-center">
                      <span className="bg-white/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Salon Special
                      </span>
                      <Star size={20} className="fill-amber-300 text-amber-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black mb-1">Luxury 24K Gold Glow</h3>
                      <p className="text-xs text-white/90">Ultrasonic purification with pure 24K gold serum infusion</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 uppercase font-semibold">Starting At</div>
                      <div className="text-2xl font-black text-gray-900 font-display">$90</div>
                    </div>
                    <Link to="/services" className="btn-primary text-sm px-6 py-2.5">
                      Book Slot
                    </Link>
                  </div>
                </div>

                {/* Floating Micro Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-pink-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">Instant Confirmation</div>
                    <div className="text-[10px] text-gray-500">Zero wait times</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 font-display">Why Choose LuxeSalon</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              Every appointment is designed around your personal aesthetic, wellness, and utmost relaxation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border-white/80">
              <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-rose-400 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md shadow-pink-200">
                <Calendar size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Seamless Scheduling</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Choose your specialist, pick date & time slots, and manage reservations anytime with live notifications.
              </p>
            </div>
            
            <div className="card text-center hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border-white/80">
              <div className="w-16 h-16 bg-gradient-to-tr from-rose-500 to-pink-400 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md shadow-rose-200">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Certified Beauticians</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Trained hair stylists, skin aestheticians, and bridal makeup specialists dedicated to personalized elegance.
              </p>
            </div>

            <div className="card text-center hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border-white/80">
              <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-amber-400 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md shadow-pink-200">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Safe & Transparent</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Secure checkout with verified salon pricing, upfront appointment details, and genuine verified reviews.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
