import Home from './Pages/LandingPage/HomePage'
import About from './Pages/AboutUs/AboutUs'
import Donor from "./Pages/Donors/Donor";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import NGO from './Pages/NGOs/NGO'
import Volunteer from './Pages/Volunteer/Volunteer'
import Chatbot1 from './Pages/ChatBot/ChatBot1';
import Chatbot from './Pages/ChatBot/ChatBot';
import VolunteerRewards from './Pages/Reward/VolunteerRewards'
import History from './Pages/History/History'
import FAQSection from './Pages/FAQ/FAQ';
import Menuitem from '../src/Pages/Menu/menuitems';
import Product from './Pages/Product/product';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Customer from './Pages/Customer/Customer';
import Order from './Pages/Order/Order';
import Reservation from './Pages/Reservation/Reservation';
import Donation from './Pages/Donation/Donation';
import Admin from './Pages/Admin/Admin';
import Menucard from './Pages/Menu/menucard';
import Reportsnav from './Pages/Reports/Reportsnav';
import Donationreport from './Pages/Reports/Donationreport';
import Orderreport from './Pages/Reports/Orderreport';
import Customerreport from './Pages/Reports/Customerreport';
import Productreport from './Pages/Reports/Productreport';
import Revenuereport from './Pages/Reports/Revenuereport';
import Supplierreport from './Pages/Reports/Supplierreport';
import Supplier from './Pages/Supplier/Supplier';
import Menuitemreport from './Pages/Reports/Menuitemreport';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/Menuitem" element={<Menuitem/>} />
          <Route path='/Product' element={<Product/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/Customer" element={<Customer />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/Donation" element={<Donation />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/menucard" element={<Menucard/>} />
          <Route path="/Reservation" element={<Reservation/>} />
          <Route path="/donors" element={<Donor />} />
          <Route path="/NGOs" element={<NGO />} />
          <Route path="/Volunteer" element={<Volunteer />} />
          <Route path="/chatbot1" element={<Chatbot1 />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/vr" element={<VolunteerRewards />} />
          <Route path="/history" element={<History />} />
          <Route path="/FAQ" element={<FAQSection />} />
          <Route path='/Reportsnav' element={<Reportsnav />} />
          <Route path='/Donationreport' element={<Donationreport/>} />
          <Route path='/Orderreport' element={<Orderreport/>} />
          <Route path='/Customerreport' element={<Customerreport/>} />
          <Route path='/Productreport' element={<Productreport/>} />
          <Route path='/Revenuereport' element={<Revenuereport/>} />
          <Route path='/Supplierreport' element={<Supplierreport/>} />
          <Route path="/Supplier" element={<Supplier />} />
          <Route path="/Menuitemreport" element={<Menuitemreport/>} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
