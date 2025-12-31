import React, { useState } from 'react';
import axios from 'axios';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    foodDetails: '',
    quantity: '',
    donationPlace: '',
    donationAddress: '',
    donationDate: '',
    volunteerName: '',
    volunteerId: '',
    status: 'planned',
    description: '',
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
      foodDetails: '',
      quantity: '',
      donationPlace: '',
      donationAddress: '',
      donationDate: '',
      volunteerName: '',
      volunteerId: '',
      status: 'planned',
      description: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/donation/adddo', formData);
      alert('✅ Donation submitted successfully!');
      resetForm();
    } catch (err) {
      console.error('Submit error:', err);
      alert('❌ Error submitting data.');
    }
  };

 const handleUpdate = async () => {
  try {
    const response = await axios.put(`http://localhost:3002/donation/update/${formData.id}`, formData);
    alert('✅ Donation updated successfully!');
  } catch (err) {
    console.error('Update error:', err);
    alert('❌ Error updating data.');
  }
};

const handleDelete = async () => {
  if (!formData.id) {
    alert('⚠️ Enter Donation ID to delete.');
    return;
  }
  try {
    await axios.delete(`http://localhost:3002/donation/delete/${formData.id}`);
    alert('🗑️ Donation deleted successfully!');
    resetForm();
  } catch (err) {
    console.error('Delete error:', err);
    alert('❌ Error deleting donation.');
  }
};

const handleSearch = async () => {
  if (!searchId) {
    alert("Please enter a Donation ID to search.");
    return;
  }

  try {
    const response = await axios.get(`http://localhost:3002/donation/search/${searchId}`);
    setFormData(response.data);
    alert("✅ Record loaded.");
  } catch (err) {
    console.error('Search error:', err);
    alert(err.response?.data?.error || '❌ Error searching record.');
  }
};


  return (
    <div className="max-w-2xl mx-auto mt-1 p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-center text-black">Donation Details Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Keep your existing fields here */}
        {/* ... */}
         
          {/* Form Fields */}
           <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="block text-black text-sm mb-2 rounded-md w-full p-2 mt-2 w-full py-2 px-3 border border-black  text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        
          <input
            type="text"
            name="foodDetails"
            placeholder="Food Details"
            value={formData.foodDetails}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="donationPlace"
            placeholder="Donation Place"
            value={formData.donationPlace}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="donationAddress"
            placeholder="Donation Address"
            value={formData.donationAddress}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="date"
            name="donationDate"
            value={formData.donationDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="volunteerName"
            placeholder="Volunteer Name"
            value={formData.volunteerName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="volunteerId"
            placeholder="Volunteer ID"
            value={formData.volunteerId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="planned">Planned</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
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
        <div className="mb-4 flex space-x-2">
  <input
    type="text"
    placeholder="Enter Donation ID"
    value={searchId}
    onChange={(e) => setSearchId(e.target.value)}
    className="w-full border px-3 py-2 rounded"
  />
  <button
    type="button"
    onClick={handleSearch}
    className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-800"
  >
    Search
  </button>
</div>

      </form>
    </div>
  );
};

export default DonationForm;