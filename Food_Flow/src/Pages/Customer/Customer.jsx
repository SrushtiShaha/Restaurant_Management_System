import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    numberOfPeople: '',
    orderDetails: '',
    totalBill: '',
    userId: '',
    visitedDate: '',
    phoneNo: '',
    donationStatus: 'no',
    donatedFoodRemained: false,
    donationId: '',
  });

  const [searchId, setSearchId] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      numberOfPeople: '',
      orderDetails: '',
      totalBill: '',
      userId: '',
      visitedDate: '',
      phoneNo: '',
      donationStatus: 'no',
      donatedFoodRemained: false,
      donationId: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/customer/addcust', formData);
      if (response.status === 200 || response.status === 201) {
        alert('✅ Customer added successfully!');
        resetForm();
      } else {
        alert(response.data.error || 'Submission failed.');
      }
    } catch (err) {
      console.error('❌ Axios error:', err);
      alert(err.response?.data?.error || 'Server error occurred.');
    }
  };

  const handleSearch = async () => {
    if (!searchId) {
      alert('Please enter a User ID to search.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3002/customer/search/${searchId}`);
      const data = response.data;
      setFormData({
        name: data.name,
        numberOfPeople: data.numberOfPeople,
        orderDetails: data.orderDetails,
        totalBill: data.totalBill,
        userId: data.userId,
        visitedDate: data.visitedDate,
        phoneNo: data.phoneNo,
        donationStatus: data.donationStatus,
        donatedFoodRemained: data.donatedFoodRemained,
        donationId: data.donationId,
      });
      alert('✅ Customer loaded!');
    } catch (err) {
      console.error('Search error:', err);
      alert(err.response?.data?.error || '❌ Error fetching customer.');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3002/customer/update/${formData.userId}`, formData);
      alert('✅ Customer updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      alert('❌ Error updating customer.');
    }
  };

  const handleDelete = async () => {
    if (!formData.userId) {
      alert('⚠️ Enter User ID to delete.');
      return;
    }
    try {
      await axios.delete(`http://localhost:3002/customer/delete/${formData.userId}`);
      alert('🗑️ Customer deleted successfully!');
      resetForm();
    } catch (err) {
      console.error('Delete error:', err);
      alert('❌ Error deleting customer.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl p-6 bg-white rounded-lg shadow-lg border border-black w-full">
        <h1 className="text-2xl font-bold text-black mb-6 text-center">Customer Form</h1>

        {/* 🔍 Search Bar */}
        <div className="mb-4 flex space-x-2">
          <input
            type="text"
            placeholder="Search User ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full px-3 py-2 border border-black rounded"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
          >
            Search
          </button>
        </div>

        {/* 📝 Form */}
        
          {/* === All input fields go here === */}
          {/* KEEP your entire current form layout here as-is */}
        <form onSubmit={handleSubmit} className="space-y-4">
      <div className='flex space-x-4'>
        <div>
          <label className="block text-black text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block text-black text-sm mb-2 rounded-md w-full p-2 mt-2 w-full py-2 px-3 border border-black  text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        <div>
          <label className="block text-black text-sm font-bold mb-2">Number of People</label>
          <input
            type="number"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleChange}
            className="block text-black text-sm mb-2 rounded-md w-full p-2 mt-2 w-full py-2 px-3 border border-black  text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
            min="1"
            required
          />
        </div>
      </div>

      <div className='flex space-x-4'>
        <div>
          <label className="block text-black text-sm font-bold mb-2">Order Details</label>
          <textarea
            name="orderDetails"
            value={formData.orderDetails}
            onChange={handleChange}
            className="block text-black text-sm mb-2 rounded-md w-full p-2 mt-2 w-full py-2 px-3 border border-black  text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-black text-sm font-bold mb-2">Total Bill</label>
          <input
            type="number"
            name="totalBill"
            value={formData.totalBill}
            onChange={handleChange}
            className="block text-black text-sm mb-2 rounded-md w-full p-2 mt-2 w-full py-2 px-3 border border-black  text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      <div className='flex space-x-4'>
        <div>
          <label className="block text-black text-sm font-bold mb-2">User ID</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="block text-black text-sm mb-2 rounded-md w-full p-2 mt-2 w-full py-2 px-3 border border-black  text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        <div>
          <label className="block text-black text-sm font-bold mb-2">Visited Date</label>
          <input
            type="date"
            name="visitedDate"
            value={formData.visitedDate}
            onChange={handleChange}
            className="block text-black text-sm mb-2 rounded-md w-full p-2 mt-2 w-full py-2 px-3 border border-black  text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
      </div>

      <div className='flex space-x-4'>
        <div>
          <label className="block text-black text-sm font-bold mb-2">Phone Number</label>
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            className="block text-black text-sm mb-2 rounded-md w-full p-2 mt-2 w-full py-2 px-3 border border-black  text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
            pattern="[0-9]{10}"
            placeholder="1234567890"
            required
          />
        </div>

        <div>
          <label className="block text-black text-sm font-bold mb-2">Donation Status</label>
          <select
            name="donationStatus"
            value={formData.donationStatus}
            onChange={handleChange}
            className="block text-black text-sm mb-2 rounded-md w-full p-2 mt-2 w-full py-2 px-3 border border-black  text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="partial">Partial</option>
          </select>
        </div>
      </div>

      <div className='flex space-x-4'>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="donatedFoodRemained"
            checked={formData.donatedFoodRemained}
            onChange={handleChange}
            className="h-4 w-4 text-gray-500 focus:ring-gray-500 border-gray-600 rounded bg-gray-700 border border-black  text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <label className="block text-black text-sm font-bold mb-2">Donated Any Food Remained</label>
        </div>

        <div>
          <label className="block text-black text-sm font-bold mb-2">Donation ID</label>
          <input
            type="text"
            name="donationId"
            value={formData.donationId}
            onChange={handleChange}
            className="block text-black text-sm mb-2 rounded-md w-full p-2 mt-2 w-full py-2 px-3 border border-black  text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
      </div>

       
      </form>
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-800"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-800"
            >
              Delete
            </button>
          </div>
        
      </div>
    </div>
  );
};

export default CustomerForm;