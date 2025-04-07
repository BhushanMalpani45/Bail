import React from 'react';

const LawyerLoginPage = () => {
  return (
    <div className="flex h-screen">
      {/* Image Section */}
      <div className="hidden md:flex flex-1 bg-gray-200 items-center justify-center">
        <img
          src="https://your-domain.com/assets/lawyer-login.jpg" // Example image URL; replace with your actual path
          alt="Lawyer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 md:p-12">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Lawyer Login
          </h2>
          <form className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
            <p className="mt-4 text-center text-gray-600 text-sm">
              Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LawyerLoginPage;
