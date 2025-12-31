import React, { useState } from "react";
import "./VolunteerRewards.css"; 
import { useNavigate } from "react-router-dom";

const MAX_POINTS = 1000;

const VolunteerRewards = () => {
  const [points, setPoints] = useState(250); 

  const rewards = [
    { name: "BRONZE BADGE", points: 100, img: "🥉", increment: 10, available: points >= 100 },
    { name: "SILVER BADGE", points: 200, img: "🥈", increment: 20, available: points >= 200 },
    { name: "GOLD BADGE", points: 500, img: "🥇", increment: 30, available: points >= 500 },
    { name: "FOOD DONATION VOUCHER", points: 700, img: "🎟", increment: 50, available: points >= 700 },
  ];

  const handleRedeem = (increment) => {
    setPoints((prevPoints) => {
      const newPoints = prevPoints + increment;
      return newPoints >= MAX_POINTS ? 100 : newPoints;
    });
  };

  const navigate = useNavigate();

  return (
    <div className="volunteer-container">
      <h2 className="volunteer-title">Volunteer Rewards</h2>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${(points / MAX_POINTS) * 100}%` }}
        ></div>
      </div>
      <p className="points-text">Your Points: {points}</p>

      {/* Rewards Grid */}
      <h3 className="reward-title">Redeemable Rewards</h3>
      <div className="rewards-grid">
        {rewards.map((reward, index) => (
          <div
            key={index}
            className={`reward-card ${reward.available ? "" : "locked"}`}
          >
            <div className="reward-icon">{reward.img}</div>
            <p className="reward-name">{reward.name}</p>
            <p className="reward-points">{reward.points} Points</p>
            <button
              className={`redeem-button ${reward.available ? "active" : "disabled"}`}
              disabled={!reward.available}
              onClick={() => handleRedeem(reward.increment)}
            >
              {reward.available ? "Redeem" : "Not Enough Points"}
            </button>
          </div>
        ))}
      </div>

      {/* Impact Section */}
      <div className="impact-section">
        <h3 className="impact-title">Your Impact</h3>
        <p className="impact-text">You have contributed to distributing 50+ meals!</p>
      </div>
      <button  style={{backgroundColor: "green", marginTop: "20px", padding: "20px", borderRadius: "8px", fontSize: "20px"}} onClick={() => navigate("/volunteer")}>Back to Main Page</button>
    </div>
  );
};

export default VolunteerRewards;
