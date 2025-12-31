import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import "./Card.css";
import Image1 from "../../assets/NatrajAnnex.jpg";
import Image2 from "../../assets/iconinn.jpg";
import Image3 from "../../assets/masterchef.avif";
import Image4 from "../../assets/hemraj.avif";
import Image5 from "../../assets/cocoon.jpg";
import Image6 from "../../assets/greatmaratha.jpg";

export default function Card() {
  const cardData = [
    {
      image: Image1,
      title: "Natraj Annex",
      // description: "Turn your surplus into someone's meal. Donate food, make a difference. Every contribution helps reduce waste and feed those in need. By donating excess food, you’re not just preventing waste—you’re offering nourishment, kindness, and hope to individuals and families struggling with food insecurity."
    },
    {
      image: Image4,
      title: "Hemraj",
      // description: "Connecting meals to those in need. Join our network of passionate individuals dedicated to ensuring that surplus food reaches hungry people efficiently and responsibly. As a volunteer, you play a crucial role in food distribution, logistics, and community engagement—helping to bridge the gap between donors and those in need."
    },
    {
      image: Image3,
      title: "MasterChef",
      // description: "Deliver food, spread hope. Partner with us to bring nutritious meals to those who need them the most, creating a hunger-free community together. With your help, we can ensure that no food goes to waste, and no person goes hungry. Join us in making a lasting impact on food accessibility and social welfare."
    },
    {
      image: Image6,
      title: "Great Maratha",
      // description: "Deliver food, spread hope. Partner with us to bring nutritious meals to those who need them the most, creating a hunger-free community together. With your help, we can ensure that no food goes to waste, and no person goes hungry. Join us in making a lasting impact on food accessibility and social welfare."
    },
    {
      image: Image2,
      title: "Icon In",
      // description: "Deliver food, spread hope. Partner with us to bring nutritious meals to those who need them the most, creating a hunger-free community together. With your help, we can ensure that no food goes to waste, and no person goes hungry. Join us in making a lasting impact on food accessibility and social welfare."
    },
    {
      image: Image5,
      title: "Cocoon",
      // description: "Deliver food, spread hope. Partner with us to bring nutritious meals to those who need them the most, creating a hunger-free community together. With your help, we can ensure that no food goes to waste, and no person goes hungry. Join us in making a lasting impact on food accessibility and social welfare."
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Link to="/donors"><div /*className="card-container"*/>
    {cardData.map((card, index) => (
      <div key={index} /*className="flip-card"*/>
        <div /*className="flip-card-inner"*/>
          {/* Front Side */}
          <div /*className="flip-card-front"*/>
            <img
              src={card.image}
              alt={card.title}
              className="card-image"
              style={{
                padding: "10px",
                borderRadius: "50px",
                height: "250px",
              }}
            />
          </div>

          {/* Back Side */}
          <div /*className="flip-card-back"*/>
            <h3 className="card-title"></h3>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </div>
        </div>
      </div>
    ))}
  </div></Link>
  );
}
