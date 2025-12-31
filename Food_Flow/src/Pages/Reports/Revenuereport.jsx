import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';

const RevenueReport = () => {
  const [summary, setSummary] = useState({ totalRevenue: 0, totalSales: 0 });
  const [detailed, setDetailed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryRes = await axios.get('http://localhost:3002/revenue/report');
        setSummary(summaryRes.data || { totalRevenue: 0, totalSales: 0 });

        const detailRes = await axios.get('http://localhost:3002/revenue/daily');
        setDetailed(Array.isArray(detailRes.data) ? detailRes.data : []);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    };

    fetchData();
  }, []);

  const pieData = [
    { name: 'Total Revenue (₹)', value: summary.totalRevenue },
    { name: 'Total Sales (Customers)', value: summary.totalSales }
  ];

  const COLORS = ['#4A90E2', '#50C878'];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg m-6 border border-black max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">💰 Revenue & Sales Report</h2>

      {/* Pie Chart */}
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Revenue Line Chart */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-black mb-2">📈 Daily Revenue</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={detailed}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="totalBill"
              stroke="#FF8042"
              strokeWidth={2}
              name="Revenue (₹)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Table */}
      <h3 className="text-lg font-semibold text-black mb-2">📅 Daily Revenue Table</h3>
      <div className="overflow-auto border border-gray-300 rounded-md max-h-[400px]">
        <table className="min-w-full text-sm text-left text-black">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Customer Count</th>
              <th className="px-4 py-2">Revenue (₹)</th>
            </tr>
          </thead>
          <tbody>
            {detailed.map((entry, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{entry.date}</td>
                <td className="px-4 py-2">{entry.customerCount ?? 0}</td>
                <td className="px-4 py-2">
                  ₹{entry.totalBill != null ? entry.totalBill.toFixed(2) : '0.00'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueReport;