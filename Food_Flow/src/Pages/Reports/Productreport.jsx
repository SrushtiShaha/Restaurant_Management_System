import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ProductReport = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3002/product/getall'); // Make sure backend endpoint matches
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg m-6 border border-black">
      <h2 className="text-2xl font-bold mb-4 text-black text-center">📦 Product Report</h2>

      {/* Bar Chart */}
      <div style={{ width: '100%', height: 300 }} className="mb-8">
        <ResponsiveContainer>
          <BarChart data={products}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="proName" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="proPresentNo" fill="#4A90E2" name="Current Stock" />
            <Bar dataKey="reorder" fill="#50C878" name="Reorder Level" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table */}
      <div className="overflow-auto max-h-[500px] border border-gray-300 rounded-md">
        <table className="min-w-full text-sm text-left text-black">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="px-4 py-2">Product ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Current Stock</th>
              <th className="px-4 py-2">Unit</th>
              <th className="px-4 py-2">Reorder Level</th>
              <th className="px-4 py-2">Supplier ID</th>
              <th className="px-4 py-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{prod.proId}</td>
                <td className="px-4 py-2">{prod.proName}</td>
                <td className="px-4 py-2">{prod.proPresentNo}</td>
                <td className="px-4 py-2">{prod.unit}</td>
                <td className="px-4 py-2">{prod.reorder}</td>
                <td className="px-4 py-2">{prod.supplierId}</td>
                <td className="px-4 py-2">{prod.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductReport;