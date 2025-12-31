import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import './AboutUs.css'
import Food from "../../assets/Food.jpg";
import Food1 from "../../assets/aboutus2.jpg";

export default function AboutUs() {
  return (
    <>
      <div id="app">
      <Navbar class="navbar"/>
        <div className="heading">
        <h1 id="heading1">Food Redistribution and its Longing Impact</h1>
        <h2>
          Food redistribution is an essential strategy in addressing food
          insecurity and reducing food waste. It involves collecting surplus
          food from farms, restaurants, grocery stores, and other sources, then
          distributing it to individuals and communities in need.
        </h2>
        </div>
        <img src={Food} id="waste"/>
        <p id="first">
          The Need for Food Redistribution Despite global food production being
          sufficient to feed the world's population, millions of people suffer
          from hunger and malnutrition. At the same time, a significant
          percentage of food goes to waste due to logistical challenges,
          overproduction, and improper storage. Food redistribution helps bridge
          this gap by redirecting surplus food to those who need it most,
          fostering a more equitable food system.
          <ol>
            <span style={{fontSize: "25px"}}>Methods of Food Redistribution</span>
            <p style={{fontSize: "20px", marginBottom: "10px"}}>
              Several approaches are used to facilitate food redistribution:
            </p>
            <li>
              Food Banks and Pantries – Organizations that collect surplus food
              and distribute it to those in need through local food pantries and
              shelters.
            </li>
            <li>
              Community Fridges – Publicly accessible refrigerators stocked with
              donated food, allowing individuals to take what they need.
            </li>
            <li>
              Restaurant and Supermarket Donations – Establishments partner with
              NGOs to donate unsold but safe-to-eat food.
            </li>
            <li>
              Technology-Based Solutions - Digital platforms connect food donors
              with recipients in real-time, optimizing distribution efficiency
            </li>
          </ol>
        </p>
        <img src={Food1} id="flowchart"/>
        <p id="below">
          Challenges and Future Prospects While food redistribution is highly
          beneficial, it faces challenges such as logistical constraints, food
          safety concerns, and inadequate infrastructure. Addressing these
          issues requires coordinated efforts from governments, businesses, and
          communities. Looking ahead, technological advancements, improved
          policies, and increased public awareness can further enhance the
          effectiveness of food redistribution efforts. Integrating blockchain
          for transparency, AI-driven food tracking, and IoT for monitoring food
          storage conditions are potential innovations that can revolutionize
          food redistribution systems.
        </p>
        <Footer />
      </div>
    </>
  );
}
