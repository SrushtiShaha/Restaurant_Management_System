import { useNavigate } from "react-router-dom";
import "./Admin.css";
// import Navbar from "../../components/ui/Navbar";
// import "../../components/ui/Navbar.css";
import Navbar from "./AdminNav";
// import Card from "./Card";
// import Tracker from "./Tracker";
// import Why from "./Why";
import Footer from "../../components/ui/Footer";
// import WhyGrid from "./WhyGrid";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div id="app">
        {/* <Card /> */}
        {/* <Tracker /> */}
        <div id="menu-section">
          <h1>Let us help you Choose Your Menu</h1>
          <button onClick={() => navigate("/chatbot1")}>Here</button>
        </div>
        {/* <Why /> */}
        {/* <WhyGrid /> */}
        <Footer />
        {/* Add dummy content to ensure scrolling */}
        {/* <div style={{ height: "500px", backgroundColor: "rgba(255, 255, 255, 0.8)", margin: "20px 0", padding: "20px" }}>
          {/* <p>Dummy content to test scrolling.</p> *
          {Array(20).fill().map((_, index) => (
            <p key={index}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          ))}
        </div> */}
      </div>
    </>
  );
}

export default App;