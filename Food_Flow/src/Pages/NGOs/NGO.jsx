import { useState } from "react";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import "./NGO.css";
import NGOConfirm from "../../assets/ngoconfirm.jpg";
import SchedulePickupImg from "../../assets/request.jpg";
import axios from "axios";

export default function NGO() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmData, setConfirmData] = useState({
    donorName: "",
    volunteerName: "",
  });
  const [formData, setFormData] = useState({
    foodType: "VEG",
    minServings: "",
    foodCategory: "",
    numKGs: "",
    numDishes: "",
  });

  // Handlers for confirm modal
  const handleConfirmChange = (e) => {
    setConfirmData({ ...confirmData, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    axios.post("http://localhost:5000/api/confirm-delivery", confirmData)
      .then(response => {
        console.log(response.data);
        setIsConfirmModalOpen(false);
      })
      .catch(error => console.error("Error confirming delivery:", error));
    console.log("Confirmed Data:", confirmData);
    setIsConfirmModalOpen(false);
  };

  // Handlers for request food modal
  const handleFoodType = (type) => {
    setFormData({ ...formData, foodType: type });
  };

  const handleFoodCategory = (category) => {
    setFormData({ ...formData, foodCategory: category });
  };

  const handleRequestChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setIsRequestModalOpen(false);
  };

  return (
    <>
      <div id="app">
        <Navbar />
        <div id="NGO-section">
          <h1>NGOs</h1>
          <p>Connecting Meals to those in need.</p>
        </div>

        {/* Confirm Deliveries Section */}
        <div id="register-food">
          <div id="left">
            <h1>Confirm Deliveries</h1>
            <p>Ensure Impact</p>
            <div id="buttons">
              <button onClick={() => setIsConfirmModalOpen(true)}>
                Confirm
              </button>
            </div>
          </div>
          <div id="right">
            <img
              src={NGOConfirm}
              alt="Confirm Deliveries"
              style={{ height: "200px" }}
            />
          </div>
        </div>

        {/* Request Food Section */}
        <div id="Schedule-Pickup">
          <div id="Schedule-left">
            <img
              src={SchedulePickupImg}
              alt="Request Food"
              style={{ height: "200px" }}
            />
          </div>
          <div id="Schedule-right">
            <h1>Request Food</h1>
            <p>Bridge the gap</p>
            <div id="buttons">
              <button onClick={() => setIsRequestModalOpen(true)}>
                Request
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* Confirm Delivery Modal */}
      {isConfirmModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsConfirmModalOpen(false)}
        >
          <div
            className="modal-content confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Confirm Delivery</h3>
              <button
                className="close-btn"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <label className="input-label">Donor</label>
              <select
                name="donorName"
                value={confirmData.donorName}
                onChange={handleConfirmChange}
                className="input-field"
              >
                <option value="">Select a Donor</option>
                <option value="WoodHouse">WoodHouse</option>
                <option value="Rajput Royals">Rajput Royals</option>
                <option value="O2">O2</option>
              </select>

              <label className="input-label">Volunteer</label>
              <select
                name="volunteerName"
                value={confirmData.volunteerName}
                onChange={handleConfirmChange}
                className="input-field"
              >
                <option value="">Select a Volunteer</option>
                <option value="Rishii">Rishii</option>
                <option value="Aditya">Aditya</option>
                <option value="Neil">Neil</option>
              </select>

              <button className="confirm-btn" onClick={handleConfirm}>
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Food Modal */}
      {isRequestModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsRequestModalOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Food Donation Request</h3>
              <button
                className="close-btn"
                onClick={() => setIsRequestModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleRequestSubmit}>
                <label>Food Type</label>
                <div className="food-type">
                  <button
                    type="button"
                    className={`food-btn ${
                      formData.foodType === "VEG" ? "veg" : ""
                    }`}
                    onClick={() => handleFoodType("VEG")}
                  >
                    VEG
                  </button>
                  <button
                    type="button"
                    className={`food-btn ${
                      formData.foodType === "NON-VEG" ? "non-veg" : ""
                    }`}
                    onClick={() => handleFoodType("NON-VEG")}
                  >
                    NON-VEG
                  </button>
                </div>

                <label>Min. Servings</label>
                <input
                  type="number"
                  name="minServings"
                  placeholder="Enter min. servings"
                  required
                  onChange={handleRequestChange}
                />

                <label>Food Category</label>
                <div className="food-category">
                  <button
                    type="button"
                    className="category-btn"
                    onClick={() => handleFoodCategory("HOTELS")}
                  >
                    HOTELS
                  </button>
                  <button
                    type="button"
                    className="category-btn"
                    onClick={() => handleFoodCategory("EVENTS")}
                  >
                    EVENTS
                  </button>
                  <button
                    type="button"
                    className="category-btn"
                    onClick={() => handleFoodCategory("WEDDINGS")}
                  >
                    WEDDINGS
                  </button>
                </div>

                <label>Required On</label>
                <input
                  type="date"
                  name="numKGs"
                  required
                  onChange={handleRequestChange}
                />

                <button type="submit" className="next-btn">
                  REQUEST
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}