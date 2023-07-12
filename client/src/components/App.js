import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./navbar/Header";
import GlobalStyles from "./GlobalStyles";
import Homepage from "./Homepage";
import Login from "./authentication/Login";
import SignUp from "./authentication/Signup";
import Submission from "./submission/Submission";
import Items from "./items/Items";
import Item from "./item/Item";
import About from "./About";
import Profile from "./profile/Profile";
import AddReview from "./review/AddReview";
import UpdateReview from "./review/UpdateReview";

// all the routes
const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/submission" element={<Submission />} />
        <Route path="/add-review/:itemId" element={<AddReview/>} />
        <Route path="/reviews/:reviewId" element={<UpdateReview/>} />
        <Route path="/about" element={<About />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:itemId"  element={<Item/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
