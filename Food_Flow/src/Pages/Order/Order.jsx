import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    productId: '',
    supplierId: '',
    orderQuantity: '',
    orderDate: '',
    deliveryDate: '',
    orderCost: '',
    amountToPay: '',
    status: 'ordered',
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
      productId: '',
      supplierId: '',
      orderQuantity: '',
      orderDate: '',
      deliveryDate: '',
      orderCost: '',
      amountToPay: '',
      status: 'ordered',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/order/addord', formData);
      if (response.status === 201 || response.status === 200) {
        alert('✅ Order submitted successfully!');
        resetForm();
      } else {
        alert(response.data.error || 'Failed to submit order.');
      }
    } catch (err) {
      console.error('❌ Axios error:', err.response?.data || err.message);
      alert(err.response?.data?.error || 'Server error. Please try again.');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3002/order/update/${formData.id}`, formData);
      alert('✅ Order updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      alert('❌ Error updating order.');
    }
  };

  const handleDelete = async () => {
    if (!formData.id) {
      alert('⚠️ Enter Order ID to delete.');
      return;
    }
    try {
      await axios.delete(`http://localhost:3002/order/delete/${formData.id}`);
      alert('🗑️ Order deleted successfully!');
      resetForm();
    } catch (err) {
      console.error('Delete error:', err);
      alert('❌ Error deleting order.');
    }
  };

  const handleSearch = async () => {
    if (!searchId) {
      alert('Please enter an Order ID to search.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3002/order/search/${searchId}`);
      setFormData(response.data);
      alert('✅ Order loaded.');
    } catch (err) {
      console.error('Search error:', err);
      alert(err.response?.data?.error || '❌ Error searching order.');
    }
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-order-bg bg-cover bg-center">
   <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-black">

      <h1 className="text-3xl font-semibold mb-6 text-center text-black">Order Details Form</h1>

      {/* 🔍 Search Block */}
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Search Order ID"
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

        <div className='flex space-x-4'>
          <div>
            <label className="block text-black text-sm font-bold mb-2">Order ID</label>
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
            <label className="block text-black text-sm font-bold mb-2">Product ID</label>
            <input
              type="text"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-black rounded bg-gray-100 text-black"
              required
            />
          </div>
        </div>

        <div className='flex space-x-4'>
          <div>
            <label className="block text-black text-sm font-bold mb-2">Supplier ID</label>
            <input
              type="text"
              name="supplierId"
              value={formData.supplierId}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-black rounded bg-gray-100 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-black text-sm font-bold mb-2">Order Quantity</label>
            <input
              type="number"
              name="orderQuantity"
              value={formData.orderQuantity}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-black rounded bg-gray-100 text-black"
              min="1"
              required
            />
          </div>
        </div>

        <div className='flex space-x-4'>
          <div>
            <label className="block text-black text-sm font-bold mb-2">Order Date</label>
            <input
              type="date"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-black rounded bg-gray-100 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-black text-sm font-bold mb-2">Delivery Date</label>
            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-black rounded bg-gray-100 text-black"
              required
            />
          </div>
        </div>

        <div className='flex space-x-4'>
          <div>
            <label className="block text-black text-sm font-bold mb-2">Order Cost</label>
            <input
              type="number"
              name="orderCost"
              value={formData.orderCost}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-black rounded bg-gray-100 text-black"
              min="0"
              step="10"
              required
            />
          </div>

          <div>
            <label className="block text-black text-sm font-bold mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-black rounded bg-gray-100 text-black"
            >
              <option value="ordered">Ordered</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-black text-sm font-bold mb-2">Amount to Pay</label>
          <input
            type="number"
            name="amountToPay"
            value={formData.amountToPay}
            onChange={handleChange}
            className="w-full py-2 px-3 border border-black rounded bg-gray-100 text-black"
            min="0"
            step="0.01"
            required
          />
        </div>

        {/* 🔘 Action Buttons */}
        <div className='flex space-x-4'>
          <button
            onClick={handleSubmit}
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

export default OrderForm;