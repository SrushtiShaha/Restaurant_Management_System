// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     role: 'Admin', // Default role
//     password: '',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const { username, role, password } = formData;

// //     // Basic validation
// //     if (!username || !role || !password) {
// //       setError('All fields are required.');
// //       return;
// //     }

//     // Simulate login success (replace with actual API call to your backend)
//     console.log('Login Data:', { username, role, password });
//     setError('');
//     // Navigate to homepage or dashboard after login
//     navigate('/home');
//   };

//   return (
//     <div className="login-container">
//       <div className="login-form">
//         <h2>Login to FoodFlow</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
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
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//         <p className="signup-link">
//           Don't have an account? <a href="/signup">Sign up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     role: 'Admin',
//     password: '',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { username, role, password } = formData;

//     if (!username || !role || !password) {
//       setError('All fields are required.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3001/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, role, password }),
//       });

//       if (response.ok) {
//         navigate('/home');
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Login failed');
//       }
//     } catch (error) {
//       setError('Error connecting to the server.');
//     }
//   };

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import './Login.css';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     role: 'Admin',
//     password: '',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   const { username, role, password } = formData;

//   if (!username || !role || !password) {
//     setError('All fields are required.');
//     return;
//   }

//   try {
//     const response = await fetch('http://localhost:3001/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, role, password }),
//     });

//     if (response.ok) {
//       navigate('/home');
//     } else {
//       const data = await response.json();
//       setError(data.message || 'Login failed');
//     }
//   } catch (error) {
//     setError('Error connecting to the server.');
//   }
// };

//   return (
//     <div className="login-container">
//       <div className="login-form">
//         <h2>Login to FoodFlow</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
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
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//         <div className="signup-link">
//           <p>
//             Don't have an account? <Link to="/signup">Sign up</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import './Login.css';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     role: 'Admin',
//     password: '',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { username, role, password } = formData;

//     if (!username || !role || !password) {
//       setError('All fields are required.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3001/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, role, password }),
//       });

//       const data = await response.json(); // Parse the response JSON
//       if (response.ok) {
//         console.log('Login successful:', data);
//         navigate('/home');
//       } else {
//         setError(data.error || 'Login failed'); // Use data.error to match backend response
//       }
//     } catch (error) {
//       setError('Error connecting to the server.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-form">
//         <h2>Login to FoodFlow</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
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
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//         <div className="signup-link">
//           <p>
//             Don't have an account? <Link to="/signup">Sign up</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState('user');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Adding loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:3002/login', {
        username, password, role
      });

      const { message, user } = response.data;

      if (message === 'Login successful') {
        localStorage.setItem("user", JSON.stringify(user)); // ✅ Save logged-in user
        alert('Login successful!');
        switch (user.role) {
          case 'Admin':
            navigate('/Admin');
            break;
          case 'Manager':
            navigate('/Admin');
            break;
          case 'user':
            navigate('/home');
            break;
          default:
            navigate('/home');
        }
      } else {
        setErrorMessage('Invalid credentials.');
      }
    } catch (error) {
  console.error('Error:', error);
  if (error.response && error.response.data && error.response.data.error) {
    setErrorMessage(error.response.data.error);
  } else {
    setErrorMessage('Server error. Please try again later.');
  }
}
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <div className="form-group">
            {/* <label htmlFor="username">Username:</label> */}
            <input
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            /><br /><br />
        </div>
        <label htmlFor="password">Password:</label>
        <div className="form-group">
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            /><br /><br />
        </div>
        <button type="submit" className="login-button" disabled={loading}>Login</button> {/* Disable button during loading */}

      {/* <div className="signup-link">
           <p>
             Don't have an account? <Link to="/signup">Sign up</Link>
           </p>
      </div> */}
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      </div>


    </div>
  );
}

export default Login;