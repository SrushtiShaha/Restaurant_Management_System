import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    currentStock: '',
    unit: 'unit',
    reorder: '',
    supplierId: '',
    category: '',
  });

  const [searchId, setSearchId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      currentStock: '',
      unit: 'unit',
      reorder: '',
      supplierId: '',
      category: '',
    });
    setMessage('');
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/product/add', formData);
      if (response.status === 200 || response.status === 201) {
        alert('✅ Product added successfully!');
        resetForm();
      } else {
        setError(response.data.error || 'Submission failed.');
      }
    } catch (err) {
      console.error('❌ Axios error:', err);
      setError(err.response?.data?.error || 'Server error. Please try again.');
    }
  };

  const handleSearch = async () => {
    if (!searchId) {
      alert('Enter Product ID to search.');
      return;
    }
    try {
      const res = await axios.get(`http://localhost:3002/product/search/${searchId}`);
      setFormData({
        id: res.data.id,
        name: res.data.name,
        currentStock: res.data.currentStock,
        unit: res.data.unit,
        reorder: res.data.reorder,
        supplierId: res.data.supplierId,
        category: res.data.category,
      });
      alert('✅ Product loaded.');
    } catch (err) {
      console.error('Search error:', err);
      setError(err.response?.data?.error || 'Product not found.');
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:3002/product/update/${formData.id}`, formData);
      alert('✅ Product updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      setError(err.response?.data?.error || 'Error updating product.');
    }
  };

  const handleDelete = async () => {
    if (!formData.id) {
      alert('⚠️ Enter Product ID to delete.');
      return;
    }
    try {
      await axios.delete(`http://localhost:3002/product/delete/${formData.id}`);
      alert('🗑️ Product deleted successfully!');
      resetForm();
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.error || 'Error deleting product.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10" id="Product">
      <h1 className="text-2xl font-bold text-black mb-6 text-center">Product Details Form</h1>

      {/* 🔍 Search Input */}
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Search Product ID"
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-bold text-black">Product ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-bold text-black">Current Stock</label>
            <input
              type="number"
              name="currentStock"
              value={formData.currentStock}
              onChange={handleChange}
              className="input-field"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="input-field"
            >
              <option value="unit">Unit</option>
              <option value="kg">Kilogram</option>
              <option value="liter">Liter</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-bold text-black">Reorder Level</label>
            <input
              type="number"
              name="reorder"
              value={formData.reorder}
              onChange={handleChange}
              className="input-field"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black">Supplier ID</label>
            <input
              type="text"
              name="supplierId"
              value={formData.supplierId}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-black">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select Category</option>
            <option value="Ingredient">Ingredient</option>
            <option value="Beverage">Beverage</option>
            <option value="Packaging">Packaging</option>
          </select>
        </div>

        {message && <div className="text-green-600 text-sm">{message}</div>}
        {error && <div className="text-red-600 text-sm">{error}</div>}

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
  );
};

export default ProductForm;