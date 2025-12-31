import React, { useState } from "react";
import "./FAQModal.css";

const faqs = [
  { question: "How does the food redistribution system work?", answer: "Food is collected from donors, sorted, and distributed to those in need through partner organizations." },
  { question: "What types of food can be donated?", answer: "Non-perishable items, fresh produce, and prepared meals that meet food safety standards can be donated." },
  { question: "What’s the process for requesting a food donation?", answer: "Organizations can submit a request form on our website or contact our distribution team." },
  { question: "How can I register my shelter/NGO to receive food?", answer: "You need to fill out a registration form and meet our partnership requirements." },
  { question: "How is food safety ensured?", answer: "All food goes through a quality check, and we follow strict storage and transport guidelines." },
  { question: "How can I volunteer to help with food distribution?", answer: "You can sign up on our website, and we’ll contact you with available opportunities." }
];

const FAQModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    isOpen && (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>FAQs</h3>
            <button className="close-btn" onClick={onClose}>&times;</button>
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
    )
  );
};

const FAQSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button className="faq-btn" onClick={() => setIsModalOpen(true)}>
        Open FAQs
      </button>
      <FAQModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default FAQSection;
