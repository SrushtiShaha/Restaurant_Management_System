import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const OrderReports = () => {
  const [summary, setSummary] = useState({});
  const [bySupplier, setBySupplier] = useState([]);
  const [byProduct, setByProduct] = useState([]);
  const [byStatus, setByStatus] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/order/reports/summary').then(res => setSummary(res.data));
    axios.get('http://localhost:3002/order/reports/by-supplier').then(res => setBySupplier(res.data));
    axios.get('http://localhost:3002/order/reports/by-product').then(res => setByProduct(res.data));
    axios.get('http://localhost:3002/order/reports/by-status').then(res => setByStatus(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">Order Reports</h2>

      {/* Line Chart for Orders by Status */}
      <div className="w-full h-64 mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={byStatus}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#ff7300" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Table */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-green-700 mb-2">Summary</h3>
        <table className="table-auto w-full text-left border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Total Orders</th>
              <th className="p-2 border">Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">{summary.totalOrders}</td>
              <td className="p-2 border">{summary.totalQuantity}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Orders by Supplier */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">Orders by Supplier</h3>
        <table className="table-auto w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Supplier ID</th>
              <th className="p-2 border">Order Count</th>
              <th className="p-2 border">Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {bySupplier.map((s, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{s.supplierId}</td>
                <td className="p-2 border">{s.count}</td>
                <td className="p-2 border">{s.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Orders by Product */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-purple-700 mb-2">Orders by Product</h3>
        <table className="table-auto w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Product ID</th>
              <th className="p-2 border">Order Count</th>
              <th className="p-2 border">Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {byProduct.map((p, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{p.productId}</td>
                <td className="p-2 border">{p.count}</td>
                <td className="p-2 border">{p.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Orders by Status Table */}
      <div>
        <h3 className="text-xl font-semibold text-orange-700 mb-2">Orders by Status</h3>
        <table className="table-auto w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Count</th>
            </tr>
          </thead>
          <tbody>
            {byStatus.map((s, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{s.status}</td>
                <td className="p-2 border">{s.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderReports;