import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6 bg-white/80 backdrop-blur-sm shadow-sm z-10">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">MediLink</h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">How it works</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Doctors</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <button className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Log in
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all">
              Sign up
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow px-6 lg:px-16 py-12 md:py-20 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-50 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-teal-50 opacity-40 blur-3xl"></div>
        </div>

        {/* Left Side */}
        <div className="z-10 max-w-2xl text-center lg:text-left mb-16 lg:mb-0 lg:pr-12">
          <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            Healthcare Simplified
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Seamless <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Healthcare</span> at Your Fingertips
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
            MediLink connects you with top healthcare professionals, simplifies appointment booking, and puts your health management in one secure, easy-to-use platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-5">
            <Link to="/signup">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl text-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-1">
                Get Started
              </button>
            </Link>
            <button className="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch Demo
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">10K+</p>
              <p className="text-gray-600">Happy Patients</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">500+</p>
              <p className="text-gray-600">Expert Doctors</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">98%</p>
              <p className="text-gray-600">Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Right Side – App Preview */}
        <div className="z-10 relative w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative">
            {/* Mockup Device */}
            <div className="relative mx-auto border-8 border-gray-800 rounded-[40px] w-[300px] h-[600px] shadow-xl overflow-hidden">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
                {/* Mockup Content */}
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"></div>
                    <div className="text-sm font-medium text-gray-500">9:41</div>
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  </div>
                  
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Your Appointments</h3>
                    <p className="text-gray-500 text-sm">Tuesday, March 12</p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"></div>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Dr. Sarah Johnson</p>
                            <p className="text-sm text-gray-500">Cardiology • 10:30 AM</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-auto bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl p-4 text-center">
                    <p className="font-medium">Book New Appointment</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-8 -left-8 w-24 h-24 rounded-2xl bg-white shadow-lg p-2 flex items-center justify-center">
              <div className="w-full h-full rounded-xl bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-2xl bg-white shadow-lg p-2 flex items-center justify-center">
              <div className="w-full h-full rounded-xl bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 px-6 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Why Choose MediLink
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Healthcare Made Simple</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform is designed with both patients and healthcare providers in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Easy Booking",
                description: "Schedule appointments in seconds with our intuitive interface.",
                icon: (
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Top Specialists",
                description: "Access verified healthcare professionals across all specialties.",
                icon: (
                  <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Secure Records",
                description: "Your medical data is encrypted and securely stored.",
                icon: (
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-16 bg-gradient-to-r from-blue-600 to-teal-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Take Control of Your Health?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of patients who have simplified their healthcare experience with MediLink.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-5">
            <Link to="/signup">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors">
                Create Your Account
              </button>
            </Link>
            <button className="px-8 py-4 bg-transparent text-white border border-white rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <h3 className="text-xl font-bold text-white">MediLink</h3>
              </div>
              <p className="mb-4">Simplifying healthcare connections for patients and providers.</p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {[
              {
                title: "For Patients",
                links: ["Find a Doctor", "Book Appointment", "Health Records", "Insurance"]
              },
              {
                title: "For Providers",
                links: ["Join MediLink", "Provider Dashboard", "Resources", "Support"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Contact"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold text-white mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>© 2023 MediLink. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;