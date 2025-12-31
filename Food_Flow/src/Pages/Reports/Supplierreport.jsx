import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SupplierReport = () => {
  const [summary, setSummary] = useState({});
  const [supplierList, setSupplierList] = useState([]);
  const [productStats, setProductStats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/supplier/reports/summary')
      .then(res => setSummary(res.data));

    axios.get('http://localhost:3002/supplier/reports/list')
      .then(res => setSupplierList(res.data));

    axios.get('http://localhost:3002/supplier/reports/by-product')
      .then(res => setProductStats(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">Supplier Reports</h2>

      {/* Summary Table */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-green-700 mb-2">Summary</h3>
        <table className="table-auto w-full text-left border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Total Suppliers</th>
              <th className="p-2 border">Distinct Products Provided</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">{summary.totalSuppliers}</td>
              <td className="p-2 border">{summary.distinctProducts}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Supplier List */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">Supplier List</h3>
        <table className="table-auto w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Supplier ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Product Provided</th>
            </tr>
          </thead>
          <tbody>
            {supplierList.map((s, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{s.suppId}</td>
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.phone}</td>
                <td className="p-2 border">{s.address}</td>
                <td className="p-2 border">{s.productProvides}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Provided Stats */}
      <div>
        <h3 className="text-xl font-semibold text-purple-700 mb-2">Product Supply Count</h3>
        <table className="table-auto w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Number of Suppliers</th>
            </tr>
          </thead>
          <tbody>
            {productStats.map((p, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{p.productProvides}</td>
                <td className="p-2 border">{p.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierReport;
