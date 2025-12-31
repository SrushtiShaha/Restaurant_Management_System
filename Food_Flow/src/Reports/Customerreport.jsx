import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const CustomerReport = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/customer/getall');
        setCustomers(response.data);
         console.log('Customer Data:', response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg m-6 border border-black">
      <h2 className="text-2xl font-bold mb-6 text-black">📊 Customer Report</h2>

      {/* Bar Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-black mb-2">Total Bill per Customer</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={customers}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="userId" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalBill" fill="#4A90E2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Table Report */}
      <h3 className="text-lg font-semibold text-black mb-2">Customer Table</h3>
      <div className="overflow-auto max-h-[400px] border border-gray-300 rounded-md">
        <table className="min-w-full text-sm text-left text-black">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Visited Date</th>
              <th className="px-4 py-2">No. of People</th>
              <th className="px-4 py-2">Total Bill</th>
              <th className="px-4 py-2">Donation</th>
              <th className="px-4 py-2">Food Remained</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust.userId} className="border-t">
                <td className="px-4 py-2">{cust.userId}</td>
                <td className="px-4 py-2">{cust.name}</td>
                <td className="px-4 py-2">{cust.phone}</td>
                <td className="px-4 py-2">{cust.visitedDate}</td>
                <td className="px-4 py-2">{cust.noOfPeople}</td>
                <td className="px-4 py-2">{cust.totalBill}</td>
                <td className="px-4 py-2">{cust.donationStatus}</td>
                <td className="px-4 py-2">{cust.donatedFoodRemained ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerReport;