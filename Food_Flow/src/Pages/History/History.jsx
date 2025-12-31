import React, { useState } from "react";
import "./History.css";
import { useNavigate } from "react-router-dom"

const DonationHistory = () => {
  const [filter, setFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState(null);

  const donations = [
    { name: "Singapore fried rice", Price: 160, type: "VEG"},
    { name: "Chicken Noodle Fried Rice", Price: 170, type: "NON-VEG" },
    { name: "Masala Rice", Price: 130,  type: "VEG" },
    { name: "Chicken Biryani", Price: 180, type: "NON-VEG" },
    { name: "Veg Kofta", Price: 195, type: "VEG" },
    { name: "Stuuf Simla", Price: 160, type: "VEG" },
    { name: "Butter Roti", Price: 28, type: "VEG" },
    { name: "Paneer Paratha", Price: 38, type: "VEG" },
    { name: "Paneer Tikka Masala", Price: 210, type: "VEG" },
    { name: "Chicken Masala", Price: 190, type: "NON-VEG" },
    { name: "Paneer Matar", Price: 22, type: "VEG" },
    { name: "Paneer Lahori", Price: 14, type: "VEG" }
  ];

  const filteredDonations = donations.filter((donation) => 
    filter === "ALL" || donation.type === filter
  );

  const sortedDonations = [...filteredDonations].sort((a, b) => {
    if (sortBy === "QUANTITY") return b.weight - a.weight;
    return 0;
  });

  const navigate = useNavigate();

  return (
    <>
    <div className="donation-history">
      <h3>Menu</h3>

      <div className="filter-buttons">
        <button className={`filter-btn ${filter === "ALL" ? "active" : ""}`} onClick={() => setFilter("ALL")}>
          ALL
        </button>
        <button className={`filter-btn ${filter === "VEG" ? "active" : ""}`} onClick={() => setFilter("VEG")}>
          VEG
        </button>
        <button className={`filter-btn ${filter === "NON-VEG" ? "active" : ""}`} onClick={() => setFilter("NON-VEG")}>
          NON-VEG
        </button>
        <button className="sort-btn" onClick={() => setSortBy(sortBy === "QUANTITY" ? null : "QUANTITY")}>
          Sort by Quantity {sortBy === "QUANTITY" ? "⬆" : "⬇"}
        </button>
      </div>

      <div className="history-list">
        {sortedDonations.map((entry, index) => (
          <div key={index} className="history-item">
            <span>{entry.name}</span>
            <span>{entry.Price} /-</span>
            <span className={`donation-type ${entry.type === "VEG" ? "veg" : "non-veg"}`} style={{color : "white"}}>
              {entry.type}
            </span>
          </div>
        ))}
      </div>
      <button className="back-btn" style={{backgroundColor: "green", marginTop: "20px", padding: "20px", borderRadius: "8px", fontSize: "20px", color : "white"}} onClick={() => navigate("/donors")}>
        Back to Main Page
      </button>
    </div>
    </>
  );
};

export default DonationHistory;