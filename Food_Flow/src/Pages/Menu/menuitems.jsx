import React, { useState } from 'react';
import axios from 'axios';
import './menuitems.css';

const MenuItemForm = () => {
  const [formData, setFormData] = useState({
    itemId: '',
    name: '',
    category: '',
    price: '',
    description: '',
    imageUrl: '',
  });

  const [searchId, setSearchId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      itemId: '',
      name: '',
      category: '',
      price: '',
      description: '',
      imageUrl: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/menu/add', formData);
      alert('✅ Menu item added successfully!');
      resetForm();
    } catch (err) {
      console.error('Add Error:', err);
      alert('❌ Failed to add item.');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3002/menu/update/${formData.itemId}`, formData);
      alert('✅ Menu item updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      alert('❌ Failed to update item.');
    }
  };

  const handleDelete = async () => {
    if (!formData.itemId) return alert('⚠️ Enter Item ID to delete.');
    try {
      await axios.delete(`http://localhost:3002/menu/delete/${formData.itemId}`);
      alert('🗑️ Menu item deleted successfully!');
      resetForm();
    } catch (err) {
      console.error('Delete error:', err);
      alert('❌ Failed to delete item.');
    }
  };

  const handleSearch = async () => {
    if (!searchId) return alert('⚠️ Enter Item ID to search.');
    try {
      const res = await axios.get(`http://localhost:3002/menu/search/${searchId}`);
      setFormData(res.data);
      alert('✅ Item found.');
    } catch (err) {
      console.error('Search error:', err);
      alert('❌ Item not found.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-black">
        <h1 className="text-3xl font-semibold mb-6 text-center text-black">Menu Item Form</h1>

        {/* 🔍 Search */}
        <div className="mb-4 flex space-x-2">
          <input
            type="text"
            placeholder="Search Item ID"
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
            <label className="block text-sm font-bold text-black mb-2">Item ID</label>
            <input
              type="text"
              name="itemId"
              value={formData.itemId}
              onChange={handleChange}
              required
              className="w-full py-2 px-3 border border-black rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full py-2 px-3 border border-black rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-black rounded bg-gray-100"
              required
            >
              <option value="">-- Select --</option>
              <option value="Main">Main</option>
              <option value="Starter">Starter</option>
              <option value="Dessert">Dessert</option>
              <option value="Drink">Drink</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="1"
              step="0.01"
              required
              className="w-full py-2 px-3 border border-black rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full py-2 px-3 border border-black rounded bg-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-black rounded bg-gray-100"
            />
          </div>

          {/* 🔘 Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded hover:bg-green-800"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded hover:bg-red-800"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemForm;
