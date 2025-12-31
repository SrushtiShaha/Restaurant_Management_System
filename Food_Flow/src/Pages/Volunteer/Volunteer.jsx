import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import "./Volunteer.css";
import RegisterFoodImg from "../../assets/accept.jpg";
import SchedulePickupImg from "../../assets/quality.jpg";
import donation from "../../assets/donation.jpg"
import Modal from "../Donors/ModalDonor";

export default function Volunteer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div id="app">
        <Navbar />
        <div id="v-section">
          <h1>Volunteers</h1>
          <br />
          <p>Deliver Food, Spread Hope!!</p>
        </div>
        <div id="register-food">
          <div id="left">
            <h1>Accept Task</h1>
            <p>Take a task, change a life</p>
            <div id="buttons">
              <button className="modal-toggle" onClick={() => setIsOpen(true)}>
                Accept Task
              </button>
            </div>
          </div>
          <div id="right">
            <img src={RegisterFoodImg} alt="" style={{height: "200px"}}/>
          </div>
        </div>
        <div id="Schedule-Pickup">
          <div id="Schedule-left">
            <img src={SchedulePickupImg} alt="" style={{height: "200px", width: "300px"}}/>
          </div>
          <div id="Schedule-right">
            <h1>Quality Check</h1>
            <p>Ensure Freshness</p>
            <div id="buttons">
              <button onClick={() => navigate("/chatbot")}>Go to chatbot</button>
            </div>
          </div>
        </div>
        <div id="Donation">
          <div id="Donation-left">
            <h1>Check Rewards</h1>
            <p>Your Impact, your rewards</p>
            <div id="buttons">
            <button style= {{width: "200px"}} onClick={() => navigate("/vr")}>Reward Section</button>
            </div>
          </div>
          <div id="Donation-right">
            <img src={donation} alt=""  style={{height: "200px", width: "300px"}}/>
          </div>
        </div>
        <Footer />
      </div>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Task Acceptance Form</h3>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <label>Do you accept this order</label>
                <div className="food-type">
                  <button type="button" className="food-btn veg" style={{color:"white"}}>
                    Yes
                  </button>
                  <button type="button" className="food-btn non-veg" style={{color:"white"}}>
                    No
                  </button>
                </div>

                <label>Donor Name</label>
                <p>NGO ADITYA</p>
                <label>Amount of Food</label>
                <div className="food-category">
                 <p>There is 5kgs of Food at WoodHouse Hotel,Sangli</p>
                </div>
                <div className="food-estimation">
                  Time : Donation Posted at 9pm
                </div>
                <button type="submit" className="next-btn">
                  NEXT
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
