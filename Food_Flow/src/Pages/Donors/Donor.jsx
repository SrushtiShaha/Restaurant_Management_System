import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import "./Donor.css";
import RegisterFoodImg from "../../assets/RegisterFoodImg.jpeg";
import SchedulePickupImg from "../../assets/SchedulePickupImg.jpg";  

export default function Donor() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    foodType: "",
    minServings: "",
    foodCategory: "",
    numKGs: "",
    numDishes: "",
  });
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFoodType = (type) => {
    setFormData({ ...formData, foodType: type });
  };

  const handleFoodCategory = (category) => {
    setFormData({ ...formData, foodCategory: category });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/donations", formData);
      console.log("Data saved:", response.data);
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  const navigate = useNavigate();

  return (
    <>
      <div id="app">
        <Navbar />
        <div id="donor-section">
          <h1>Restaurants</h1>
        </div>

        <div id="register-food">
          <div id="left">
            <h1>Donate Surplus Food</h1>
            <p>Share Excess, Reduce Waste, Feed Communities</p>
            <div id="buttons">
              <button onClick={() => setIsOpen(true)}>Add Details</button>
            </div>
          </div>
          <div id="right">
            <img src={RegisterFoodImg} alt="Register Food" />
          </div>
        </div>

        <div id="Donation">
          <div id="Donation-left">
            <h1>Check Out Our Menu</h1>
            <p></p>
            <div id="buttons">
              <button onClick={()=>navigate("/menucard")}>Check Menu</button>
            </div>
          </div>
          <div id="Donation-right">
            <img src={SchedulePickupImg} alt="Donation History" style={{height: "220px"}}/>
          </div>
        </div>

        <Footer />
      </div>
      
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Food Donation Filters</h3>
              <button style={{ width: "10px"}} className="close-btn" onClick={() => setIsOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <label>Food Type</label>
                <div className="food-type">
                  <button type="button" style={{backgroundColor: "green"}} className={`food-btn ${formData.foodType === "VEG" ? "active" : ""}`} onClick={() => handleFoodType("VEG")}>VEG</button>
                  <button type="button" style={{backgroundColor: "red"}} className={`food-btn ${formData.foodType === "NON-VEG" ? "active" : ""}`} onClick={() => handleFoodType("NON-VEG")}>NON-VEG</button>
                </div>

                <label>Min. Servings</label>
                <input type="number" name="minServings" placeholder="Enter min. servings" required onChange={handleChange} />

                <label>Food Category</label>
                <div className="food-category">
                  <button type="button" style={{backgroundColor: "black", width: "2px !important"}} className={`category-btn ${formData.foodCategory === "HOTELS" ? "active" : ""}`} onClick={() => handleFoodCategory("HOTELS")}>HOTELS</button>
                  <button type="button" className={`category-btn ${formData.foodCategory === "EVENTS" ? "active" : ""}`} onClick={() => handleFoodCategory("EVENTS")}>EVENTS</button>
                  <button type="button" className={`category-btn ${formData.foodCategory === "WEDDINGS" ? "active" : ""}`} onClick={() => handleFoodCategory("WEDDINGS")}>WEDDINGS</button>
                </div>

                <label>Estimated Food</label>
                <div className="food-estimation">
                  <input type="number" name="numKGs" placeholder="No. of KGs" required onChange={handleChange} />
                  <input type="number" name="numDishes" placeholder="No. of dishes" required onChange={handleChange} />
                </div>

                <button type="submit" className="next-btn">NEXT</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
