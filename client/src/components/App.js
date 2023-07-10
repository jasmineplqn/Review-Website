import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./navbar/Header";
import GlobalStyles from "./GlobalStyles";
import Homepage from "./Homepage";
import Login from "./authentication/Login";
import SignUp from "./authentication/Signup";
import Submission from "./Submission";
import Footer from "./Footer";
import Items from "./items/Items";
import Item from "./item/Item";
import About from "./About";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Routes>
        {/* Add new homepage later */}
        <Route path="/" element={<Items />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/submission" element={<Submission />} />
        <Route path="/about" element={<About />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:itemId"  element={<Item/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
