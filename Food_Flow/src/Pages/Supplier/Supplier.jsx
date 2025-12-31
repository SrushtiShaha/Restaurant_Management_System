import React, { useState } from 'react';
import axios from 'axios';

const SupplierForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    address: '',
    product: '',
  });

  const [searchId, setSearchId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      phone: '',
      address: '',
      product: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/supplier/add', formData);
      if (response.status === 200 || response.status === 201) {
        alert('✅ Supplier added successfully!');
        resetForm();
      } else {
        alert(response.data.error || 'Failed to add supplier.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert(err.response?.data?.error || '❌ Server error.');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3002/supplier/update/${formData.id}`, formData);
      alert('✅ Supplier updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      alert('❌ Error updating supplier.');
    }
  };

  const handleDelete = async () => {
    if (!formData.id) {
      alert('⚠️ Enter Supplier ID to delete.');
      return;
    }
    try {
      await axios.delete(`http://localhost:3002/supplier/delete/${formData.id}`);
      alert('🗑️ Supplier deleted successfully!');
      resetForm();
    } catch (err) {
      console.error('Delete error:', err);
      alert('❌ Error deleting supplier.');
    }
  };

  const handleSearch = async () => {
    if (!searchId) {
      alert('Please enter a Supplier ID to search.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3002/supplier/search/${searchId}`);
      setFormData(response.data);
      alert('✅ Supplier loaded.');
    } catch (err) {
      console.error('Search error:', err);
      alert(err.response?.data?.error || '❌ Error searching supplier.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-black">
        <h1 className="text-3xl font-semibold mb-6 text-center text-black">Supplier Details Form</h1>

        {/* 🔍 Search Block */}
        <div className="mb-4 flex space-x-2">
          <input
            type="text"
            placeholder="Search Supplier ID"
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
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-black text-sm font-bold mb-2">Supplier ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-black rounded bg-gray-100 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-black text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-black rounded bg-gray-100 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-black text-sm font-bold mb-2">Phone No.</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-black rounded bg-gray-100 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-black text-sm font-bold mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-black rounded bg-gray-100 text-black"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-black text-sm font-bold mb-2">Product It Provides</label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-black rounded bg-gray-100 text-black"
              required
            />
          </div>

          {/* 🔘 Action Buttons */}
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
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;
