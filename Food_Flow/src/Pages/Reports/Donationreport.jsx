//donation report
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EF5', '#FF6384'];

const Reports = () => {
  const [summary, setSummary] = useState({});
  const [volunteers, setVolunteers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/donation/reports/summary').then(res => setSummary(res.data));
    axios.get('http://localhost:3002/donation/reports/by-volunteer').then(res => setVolunteers(res.data));
    axios.get('http://localhost:3002/donation/reports/by-place').then(res => setPlaces(res.data));
    axios.get('http://localhost:3002/donation/reports/by-status').then(res => setStatuses(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-lg mt-10 text-black">
      <h2 className="text-3xl font-bold mb-6 text-center">Donation Reports</h2>

      {/* Summary */}
      <div className="mb-8 text-center text-gray-800">
        <p className="text-lg"><strong>Total Donations:</strong> {summary.totalDonations}</p>
        <p className="text-lg"><strong>Total Quantity Donated:</strong> {summary.totalQuantity}</p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        {/* Status Chart */}
        <div>
          <h3 className="text-xl font-semibold text-center text-orange-700 mb-4">By Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statuses}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statuses.map((_, index) => (
                  <Cell key={`status-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Location Chart */}
        <div>
          <h3 className="text-xl font-semibold text-center text-purple-700 mb-4">By Location</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={places}
                dataKey="count"
                nameKey="donationPlace"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {places.map((_, index) => (
                  <Cell key={`place-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Volunteer Table */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Donations by Volunteer</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Volunteer Name</th>
                <th className="py-2 px-4 border">Volunteer ID</th>
                <th className="py-2 px-4 border">Donation Count</th>
                <th className="py-2 px-4 border">Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((v, idx) => (
                <tr key={idx} className="text-center">
                  <td className="py-2 px-4 border">{v.volunteerName}</td>
                  <td className="py-2 px-4 border">{v.volId}</td>
                  <td className="py-2 px-4 border">{v.count}</td>
                  <td className="py-2 px-4 border">{v.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Place Table */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Donations by Place</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Donation Place</th>
                <th className="py-2 px-4 border">Donation Count</th>
              </tr>
            </thead>
            <tbody>
              {places.map((p, idx) => (
                <tr key={idx} className="text-center">
                  <td className="py-2 px-4 border">{p.donationPlace}</td>
                  <td className="py-2 px-4 border">{p.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Table */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-red-700 mb-4">Donations by Status</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Donation Count</th>
              </tr>
            </thead>
            <tbody>
              {statuses.map((s, idx) => (
                <tr key={idx} className="text-center">
                  <td className="py-2 px-4 border">{s.status}</td>
                  <td className="py-2 px-4 border">{s.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;