import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import Navbar from '../../Pages/Admin/AdminNav';

const ReportPage = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <br />

      {/* Header */}
      <header className="text-center mt-10">
        <h1 className="text-3xl font-bold mt-15">Report Dashboard</h1>
        <p className="text-gray-600">Access reports for Admins, and Manager</p>
      </header>

      {/* Report Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20">
        {/* Customer Box */}
        <div className="bg-blue-500 text-white rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Customer</h2>
          <p className="mb-4">Manage users, courses, teacher and system settings.</p>
          <button
            onClick={() => navigate('/Customerreport')} // ✅ Navigate on click
            className="bg-white text-blue-500 px-4 py-2 rounded font-semibold"
          >
            Customer
          </button>
        </div>

        {/* Donation Box */}
        <div className="bg-yellow-400 text-white rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Donation</h2>
          <p className="mb-4">Manage students, review mark and check.</p>
          <button
            onClick={() => navigate('/Donationreport')} // ✅ Navigate on click
            className="bg-white text-yellow-600 px-4 py-2 rounded font-semibold"
          >
            Donation
          </button>
        </div>

        {/* Menu Box */}
        <div className="bg-green-500 text-white rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Menu</h2>
          <p className="mb-4">Access courses, teacher, subject and fill mark.</p>
          <button
            onClick={() => navigate('/Menureport')} // ✅ Navigate on click
            className="bg-white text-green-600 px-4 py-2 rounded font-semibold"
          >
            Menu
          </button>
        </div>

        {/* Order Box */}
        <div className="bg-blue-500 text-white rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Order</h2>
          <p className="mb-4">Manage users, courses, teacher and system settings.</p>
          <button
            onClick={() => navigate('/Orderreport')} // ✅ Navigate on click
            className="bg-white text-blue-500 px-4 py-2 rounded font-semibold"
          >
            Order
          </button>
        </div>

        {/* Product Box */}
        <div className="bg-yellow-400 text-white rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Product</h2>
          <p className="mb-4">Manage students, review mark and check.</p>
          <button
            onClick={() => navigate('/Productreport')} // ✅ Navigate on click
            className="bg-white text-yellow-600 px-4 py-2 rounded font-semibold"
          >
            Product
          </button>
        </div>

        {/* Revenue Box */}
        <div className="bg-green-500 text-white rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Revenue</h2>
          <p className="mb-4">Access courses, teacher, subject and fill mark.</p>
          <button
            onClick={() => navigate('/Revenuereport')} // ✅ Navigate on click
            className="bg-white text-green-600 px-4 py-2 rounded font-semibold"
          >
            Revenue
          </button>
        </div>

        {/* Supplier Box */}
        <div className="bg-blue-500 text-white rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Supplier</h2>
          <p className="mb-4">Manage users, courses, teacher and system settings.</p>
          <button
            onClick={() => navigate('/Supplierreport')} // ✅ Navigate on click
            className="bg-white text-blue-500 px-4 py-2 rounded font-semibold"
          >
            Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;