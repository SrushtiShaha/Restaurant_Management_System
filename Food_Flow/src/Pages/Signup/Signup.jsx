// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Signup.css';

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     id: '', // Can be auto-generated or manually entered
//     username: '',
//     role: 'Admin', // Default role
//     password: '',
//     email: '',
//     createdAt: new Date().toISOString().split('T')[0], // Auto-fill with current date (YYYY-MM-DD)
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { id, username, role, password, email, createdAt } = formData;

//     // Basic validation
//     if (!id || !username || !role || !password || !email || !createdAt) {
//       setError('All fields are required.');
//       return;
//     }

//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address.');
//       return;
//     }

//     // Simulate signup success (replace with actual API call to your backend)
//     console.log('Signup Data:', { id, username, role, password, email, createdAt });
//     setError('');
//     // Navigate to login page after signup
//     navigate('/login');
//   };

//   return (
//     <div className="signup-container" id='Signin'>
//       <div className="signup-form">
//         <h2>Sign Up for FoodFlow</h2>
//         {/* {error && <p className="error-message">{error}</p>} */}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="id">ID</label>
//             <input
//               type="text"
//               id="id"
//               name="id"
//               value={formData.id}
//               onChange={handleChange}
//               placeholder="Enter your ID"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Enter your username"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="role">Role</label>
//             <select
//               id="role"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//             >
//               <option value="Admin">Admin</option>
//               <option value="Restaurant">Restaurant</option>
//               <option value="Volunteer">Volunteer</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="createdAt">Created At</label>
//             <input
//               type="date"
//               id="createdAt"
//               name="createdAt"
//               value={formData.createdAt}
//               onChange={handleChange}
//               readOnly // Make it read-only since it's auto-filled
//             />
//           </div>
//           <button type="submit" className="signup-button">
//             Sign Up
//           </button>
//         </form>
//         <p className="login-link">
//           Already have an account? <a href="/login">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    role: 'Admin',
    password: '',
    email: '',
    createdAt: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, username, role, password, email, createdAt } = formData;

    if (!id || !username || !role || !password || !email || !createdAt) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    console.log('Signup Data:', { id, username, role, password, email, createdAt });
    setError('');
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Enter your ID"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Admin">Admin</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Volunteer">Volunteer</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="createdAt">Created At</label>
            <input
              type="date"
              id="createdAt"
              name="createdAt"
              value={formData.createdAt}
              onChange={handleChange}
              readOnly
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;