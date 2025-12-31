import React, { useState, useEffect } from "react";
import "./ChatBot.css";
import { useNavigate } from "react-router-dom";

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snacks"];

const dietPreferences = {
  Breakfast: ["Healthy", "Fast Food", "High Protein", "Sweet"],
  Lunch: ["Vegetarian", "Non-Vegetarian", "Spicy", "Healthy"],
  Dinner: ["Light Meal", "Protein-Rich", "Spicy", "Comfort Food"],
  Snacks: ["Sweet", "Savory", "Crunchy", "Spicy"],
};

const menuRecommendations = {
  Breakfast: {
    Healthy: "Oats with fruits and nuts or sprouts🍓🥜",
    "Fast Food": "Pancakes with maple syrup or donuts🥞",
    "High Protein": "Egg and avocado toast or vegetable omelette🍳🥑",
    Sweet: "Chocolate waffles with honey or Banana Smoothie🍫🧇",
  },
  Lunch: {
    Vegetarian: "Paneer Butter Masala with naan or vegetable curry 🥘",
    "Non-Vegetarian": "Grilled chicken with rice or Butter Chicken with naan🍗🍚",
    Spicy: "Spicy Schezwan noodles or Kolhapuri veggie with naan 🌶🍜",
    Healthy: "Quinoa salad with fresh veggies or Curd Rice🥗",
  },
  Dinner: {
    "Light Meal": "Vegetable soup with garlic bread or Lemony Chopped Salad With Pita Bread🍲🥖",
    "Protein-Rich": "Grilled salmon with steamed veggies or Boiled chicken🐟🥦",
    Spicy: "Chili chicken with fried rice or Spicy maggie 🌶🍛",
    "Comfort Food": "Mac and cheese with garlic toast or a cheesy burger🧀🍞",
  },
  Snacks: {
    Sweet: "Chocolate brownies with ice cream or Chocolate cookies🍫🍨",
    Savory: "Cheese nachos with salsa or a toast with cheesy dips🧀🌽",
    Crunchy: "Roasted almonds and peanuts or air popped popcorn🥜",
    Spicy: "Spicy potato wedges with dip or Sicilian Pizza With Pepperoni and Spicy Tomato Sauce🌶🥔",
  },
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [selectedPreference, setSelectedPreference] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    startChatbot();
  }, []);

  const startChatbot = () => {
    setMessages([
      { sender: "bot", text: "Welcome to the Menu Recommender! 🍽" },
      { sender: "bot", text: "What type of meal are you looking for?" },
    ]);
    setSelectedMeal("");
    setSelectedPreference("");
  };

  const handleUserInput = (response) => {
    setMessages((prev) => [...prev, { sender: "user", text: response }]);

    if (!selectedMeal) {
      setSelectedMeal(response);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Great choice! What kind of ${response} do you prefer?`,
        },
      ]);
      return;
    }

    if (!selectedPreference) {
      setSelectedPreference(response);
      const recommendedDish = menuRecommendations[selectedMeal][response] || "Oops! No recommendation available.";
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `How about trying this: ${recommendedDish}` },
        { sender: "bot", text: `Would you like another recommendation? `},
      ]);
      return;
    }
  };

  return (
    <>
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-area">
          {!selectedMeal ? (
            mealTypes.map((meal) => (
              <button className="btn" key={meal} onClick={() => handleUserInput(meal)}>
                {meal}
              </button>
            ))
          ) : !selectedPreference ? (
            dietPreferences[selectedMeal].map((pref) => (
              <button className="btn" key={pref} onClick={() => handleUserInput(pref)}>
                {pref}
              </button>
            ))
          ) : (
            <button className="btn" onClick={startChatbot}>
              Get Another Recommendation 🔄
            </button>
          )}
        </div>
      </div>
      <button className="btn" onClick={() => navigate("/home")}>Back to Main Page</button>
    </>
  );
};

export default Chatbot;