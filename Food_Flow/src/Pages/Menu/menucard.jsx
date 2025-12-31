// MenuCard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MenuCard() {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('http://localhost:3002/menu/all');
        console.log(res.data);
        setMenuItems(res.data);
      } catch (err) {
        console.error(err);
        setError('❌ Failed to load menu items.');
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Menu</h2>
      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.menuId} className="border rounded-lg p-4 shadow-md bg-white">
            <img src={item.imageUrl || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-40 object-cover mb-3 rounded" />
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <p className="font-semibold">₹{parseFloat(item.price).toFixed(2)}</p>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuCard;