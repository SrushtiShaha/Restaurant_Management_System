import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const MenuItemReport = () => {
  const [summary, setSummary] = useState({});
  const [byCategory, setByCategory] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/menuitem/reports/summary')
      .then(res => setSummary(res.data))
      .catch(err => console.error('Summary Error:', err));

    axios.get('http://localhost:3002/menuitem/reports/by-category')
      .then(res => setByCategory(res.data))
      .catch(err => console.error('Category Report Error:', err));

    axios.get('http://localhost:3002/menuitem/all')
      .then(res => setMenuItems(res.data))
      .catch(err => console.error('Menu Items Error:', err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">Menu Item Reports</h2>

      {/* Bar Chart by Category */}
      <div className="w-full h-64 mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={byCategory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="itemCount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Table */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-green-700 mb-2">Summary</h3>
        <table className="table-auto w-full text-left border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Total Menu Items</th>
              <th className="p-2 border">Total Menu Value (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">{summary.totalItems}</td>
              <td className="p-2 border">{summary.totalValue}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table: Menu Items by Category */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">Menu Items by Category</h3>
        <table className="table-auto w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Item Count</th>
              <th className="p-2 border">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {byCategory.map((item, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{item.category}</td>
                <td className="p-2 border">{item.itemCount}</td>
                <td className="p-2 border">{item.totalValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Full Menu Item List */}
      <div>
        <h3 className="text-xl font-semibold text-purple-700 mb-2">All Menu Items</h3>
        <table className="table-auto w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Menu ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price (₹)</th>
              <th className="p-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{item.menuId}</td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.category}</td>
                <td className="p-2 border">{item.price}</td>
                <td className="p-2 border">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuItemReport;
