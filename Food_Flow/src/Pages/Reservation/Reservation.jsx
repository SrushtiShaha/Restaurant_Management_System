import React, { useState } from 'react';
import '../Reservation/Reservation.css';

const ReservationDetailForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    userId: '',
    name: '',
    email: '',
    phone: '',
    dateTime: '',
    numberOfPeople: '',
    status: 'Pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reservation Data:', formData);
    // You can send data to API here
  };

  return (
    <div className="reservation-form-container">
      <h2>Reservation Details</h2>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="Reservation ID" value={formData.id} onChange={handleChange} required />
        <input type="text" name="userId" placeholder="User ID" value={formData.userId} onChange={handleChange} required />
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} required />
        <input type="number" name="numberOfPeople" placeholder="Number of People" value={formData.numberOfPeople} onChange={handleChange} required />
       
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancel">Cancel</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReservationDetailForm;