import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Loader from "./Components/Loader/Loader";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Product from "./Pages/Product/Product";
import Infrastructure from "./Pages/Infrastructure/Infrastructure";
import Industry from "./Pages/Industry-Serve/Industry";
import Home from "./Pages/Home/Home";
import BackToTop from "./Components/BackToTop/BackToTop";
import Login from "./Pages/Login/Login";
import AuthContainer from "./Pages/Login/AuthContainer";
import SignUp from "./Pages/Login/SignUp";
import Gallery from "./Pages/Gallery/Gallery";
import Team from "./Pages/Team/Team";

function App() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e) => {
      const href = e.target.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product" element={<Product />} />
              <Route path="/team" element={<Team />} />
              <Route path="/industry" element={<Industry />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/AuthContainer" element={<AuthContainer />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
            <Footer />
          </BrowserRouter>
          <BackToTop />
        </>
      )}
    </div>
  );
}

export default App;
