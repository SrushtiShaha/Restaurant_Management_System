// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "./Navbar.css";
// import "../../Pages/Login/Login"

// export default function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation(); 

//   return (
//     <div id="navbar">
//       <Link to="/home" id="logo">
//         Good Food<span id="flow"></span>
//       </Link>

//       <div id="navbar-right">
//         <Link to="/home" className={location.pathname === "/home" ? "active" : ""}>Home</Link>
//         <Link to="/aboutus" className={location.pathname === "/aboutus" ? "active" : ""}>Blog</Link>
//         <Link to="/NGOs" className={location.pathname === "/NGOs" ? "active" : ""}>NGO</Link>

//         <button className={`donatebtn ${location.pathname === "/donors" ? "active" : ""}`} onClick={() => navigate("/donors")}>
//           Restaurant
//           </button>
//         <button className={`trackbtn ${location.pathname === "/volunteer" ? "active" : ""}`} onClick={() => navigate("/volunteer")}>
//           Volunteer
//         </button>
//       </div>

//       <div id="toggle">
//         <i className="fas fa-bars"></i>
//       </div>

//       <div>
//         <Link to="/Login" className="trackbtn">Login</Link>
//       </div>
//     </div>
//   );
// }

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import "../../Pages/Login/Login";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div id="navbar">
      <Link to="/home" id="logo">
        <span id="flow">Good Food</span>
      </Link>

      <div id="navbar-right">
        <Link to="/home" className={location.pathname === "/home" ? "active" : ""}>Home</Link>
        <Link to="/aboutus" className={location.pathname === "/aboutus" ? "active" : ""}>Blog</Link>
        <Link to="/NGOs" className={location.pathname === "/NGOs" ? "active" : ""}>NGO</Link>

        <button
          className={`donatebtn ${location.pathname === "/donors" ? "active" : ""}`}
          onClick={() => navigate("/donors")}
        >
          Restaurant
        </button>

        <button
          className={`trackbtn ${location.pathname === "/volunteer" ? "active" : ""}`}
          onClick={() => navigate("/volunteer")}
        >
          Volunteer
        </button>

        <div id="toggle">
          <i className="fas fa-bars"></i>
        </div>

        {/* {user && (
          <>
            <Link to="/add-menu" id="trackbtn" className={location.pathname === "/add-menu" ? "active" : ""}>
              Menu
            </Link>
            <Link to="/add-product" id="trackbtn" className={location.pathname === "/add-product" ? "active" : ""}>
              Product
            </Link>
            <Link to="/orders" id="trackbtn" className={location.pathname === "/customer" ? "active" : ""}>
              Customer
            </Link>
            <Link to="/orders" id="trackbtn" className={location.pathname === "/orders" ? "active" : ""}>
              Orders
            </Link>
            <Link to="/donate" id="trackbtn" className={location.pathname === "/donate" ? "active" : ""}>
              Donate
            </Link>
            <button className="trackbtn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )} */}

        <button
          className={`trackbtn ${location.pathname === "/Signup" ? "active" : ""}`}
          onClick={() => navigate("/Signup")}
        >
          Login
        </button>

        {/* {!user && (
          <Link to="/login" className="trackbtn">
            Login
          </Link>
        )} */}
      </div>

      <div id="toggle">
        <i className="fas fa-bars"></i>
      </div>
    </div>
  );
}