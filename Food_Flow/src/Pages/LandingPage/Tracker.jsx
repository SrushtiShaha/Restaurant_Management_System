import React, { useEffect, useState } from "react";
import "./Tracker.css";
import mealsIcon from "../../assets/peoplefed.jpg";
import volunteersIcon from "../../assets/volunteeractive.jpg";
import foodSavedIcon from "../../assets/save.jpg";
import rewardsIcon from "../../assets/Volunteers.jpg";
import hourslog from "../../assets/hourlog.jpg";
import dishes from "../../assets/ngoconfirm.jpg";
import top from "../../assets/top.jpg";  
import rewardreedem from "../../assets/reward.jpg";  
import ngoaffiliated from "../../assets/affiliated.jpg";   
import numberofdonor from "../../assets/donor.jpg";   

export default function ImpactTracker() {
  const [trackerData, setTrackerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/donations/stats");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        console.log(data)

        const formattedData = [
          { image: mealsIcon, title: "Meals Rescued Today", value: data.totalMeals || "N/A" },
          { image: volunteersIcon, title: "Active Customers", value: data.totalVolunteers || "13" },
          { image: foodSavedIcon, title: "Food Saved from Waste(kg)", value: data.totalWeight || "N/A" },
          { image: numberofdonor, title: "Number of Restaurants", value: data.totalDonors || "N/A" },
          { image: ngoaffiliated, title: "NGOs Affiliated", value: data.totalNGOs || "12" },
          { image: top, title: "Top Volunteer", value: data.totalRewards || "N/A" },
          { image: dishes, title: "Total Dishes", value: data.totalDishes || "N/A" },
          { image: rewardreedem, title: "Rewards Redeemed", value: data.totalRewards || "N/A" },
          { image: hourslog, title: "Volunteer Hour Logged", value: data.totalRewards || "12" },
        ];

        setTrackerData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading impact data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="tracker-container">
      <h2 className="tracker-title">Our Impact</h2>
      <div className="tracker-grid">
        {trackerData.map((item, index) => (
          <div key={index} className="tracker-card">
            <img src={item.image} alt={item.title} className="tracker-image" />
            <p className="tracker-value">{item.value}</p>
            <p className="tracker-label">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}