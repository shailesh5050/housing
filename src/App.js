import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Profile from "./Pages/Profile";
import Offers from "./Pages/Offers";
import Sign from "./Pages/Sign";
import SignUp from "./Pages/SignUp";
import Explore from "./Pages/Explore";
import ForgotPassword from "./Pages/ForgotPassword";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from "./Components/PrivateRoute";
import Category from "./Pages/Category";
import CreateListings from "./Pages/CreateListings";
import Fake from "./Pages/Fake";
import Listing from './Pages/Listing';
import Contact from "./Pages/Contact";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/profile" element={<PrivateRoute />} >
        <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/offers" element={<Offers />} />  
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/create-listing" element={<Fake />} /> 
        <Route path="/category/:categoryName/:listingId" element={<Listing  />} />
        <Route path="/contact/:landlordId" element={<Contact />} />
      </Routes>
      <Navbar />
    </Router>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    /> 
    </>
  );
}

export default App;
