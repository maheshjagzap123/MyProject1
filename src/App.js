import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import FloatingCTA from './components/FloatingCTA/FloatingCTA';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './pages/Register/Register';
import Gallery from './pages/Gallery/Gallery';
import Contact from './pages/Contact/Contact';
import RegistrationSuccess from './pages/RegistrationSuccess/RegistrationSuccess';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main>
          <Routes>
            <Route path="/"                   element={<Home />} />
            <Route path="/about"              element={<About />} />
            <Route path="/register"           element={<Register />} />
            <Route path="/gallery"            element={<Gallery />} />
            <Route path="/contact"            element={<Contact />} />
            <Route path="/registration-success" element={<RegistrationSuccess />} />
          </Routes>
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    </Router>
  );
}

export default App;
