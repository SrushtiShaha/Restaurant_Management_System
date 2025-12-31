import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AdminNav.css";
import "../../Pages/Menu/menuitems";
import '../../Pages/Product/product';
import "../../Pages/Login/Login"
import '../../Pages/Customer/Customer';
import '../../Pages/Order/Order';
import '../../Pages/Donation/Donation';
import '../../Pages/Supplier/Supplier';
import '../../Pages/Reports/Reportsnav';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 

  return (
    <div id="navbar">
      <Link to="/home" id="logo">
        Good Food<span id="flow"></span>
      </Link>

      <div id="navbar-right">
        <Link to="/home" className={location.pathname === "/home" ? "active" : ""}>Home</Link>
        <Link to="/aboutus" className={location.pathname === "/aboutus" ? "active" : ""}>Blog</Link>
        <Link to="/NGOs" className={location.pathname === "/NGOs" ? "active" : ""}>NGO</Link>

        <button className={`donatebtn ${location.pathname === "/donors" ? "active" : ""}`} onClick={() => navigate("/donors")}>
          Restaurant
          </button>
        <button className={`trackbtn ${location.pathname === "/volunteer" ? "active" : ""}`} onClick={() => navigate("/volunteer")}>
          Volunteer
        </button>
      </div>

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

      <div>
        <Link to="/Menuitem" className="trackbtn">Menu</Link>
      </div>

      <div>
        <Link to="/Product" className="trackbtn">Product</Link>
      </div>

      <div>
        <Link to="/Customer" className="trackbtn">Customer</Link>
      </div>

      <div>
        <Link to="/Order" className="trackbtn">Order</Link>
      </div>

      <div>
        <Link to="/Donation" className="trackbtn">Donate</Link>
      </div>

      <div>
        <Link to="/Supplier" className="trackbtn">Supplier</Link>
      </div>

      <div>
        <Link to="/Reportsnav" className="trackbtn">Reports</Link>
      </div>
      
      <div>
        <Link to="/home" className="trackbtn">Logout</Link>
      </div>
    </div>
  );
}
