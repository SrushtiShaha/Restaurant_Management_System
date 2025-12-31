import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import "./Footer.css";
import "../../Pages/FAQ/FAQModal.css"
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    { question: "How does the food redistribution system work?", answer: "Food donors submit surplus food, which is then matched with NGOs or shelters for redistribution." },
    { question: "What types of food can be donated?", answer: "You can donate cooked food, packaged food, and raw ingredients, as long as they meet safety guidelines." },
    { question: "What's the process for requesting a food donation?", answer: "NGOs and shelters can register on our platform and submit requests based on their needs." },
    { question: "How can I register my shelter/NGO to receive food?", answer: "Go to the registration page, fill out your details, and submit the required documents for verification." },
    { question: "How is food safety ensured?", answer: "We follow strict food safety protocols, including temperature control, packaging, and hygiene checks." },
    { question: "How can I volunteer to help with food distribution?", answer: "Visit our volunteer page, sign up, and choose the nearest distribution center to assist." },
  ];

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {/* Brand & Social Icons */}
          <div className="footer-section brand">
            <h2>FoodFlow</h2>
            <div className="social-icons">
              <FaFacebookF />
              <FaLinkedinIn />
              <FaYoutube />
              <FaInstagram />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-section">
            <h3>Our Mission</h3>
            <ul>
              <li>
                <a href="#">How It Works</a>
              </li>
              <li>
                <Link to="/volunteer">Volunteer</Link> {/* Updated to Link */}
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul>
              <li>
                <button style={{ color: "white" }} className="faq-btn" onClick={() => setIsOpen(true)}>
                  FAQs
                </button>
              </li>
              <li>
                <Link to="/aboutus">Blog</Link> {/* Updated to Link */}
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* FAQ Modal */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>FAQs</h3>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                &times;
              </button>
            </div>
            <input
              type="text"
              className="search-bar"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="faq-list">
              {filteredFaqs.map((faq, index) => (
                <details key={index} className="faq-item">
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
