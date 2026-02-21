import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Affiliate from './pages/Affiliate';
import Events from './pages/Events';
import Convenios from './pages/Convenios';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quienes-somos" element={<About />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/afiliate" element={<Affiliate />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/convenios" element={<Convenios />} />
          </Routes>
        </main>
        <Footer />
      </div>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            fontFamily: 'Open Sans, sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#00C78E',
              secondary: '#fff',
            },
          },
        }}
      />
    </Router>
  );
}

export default App;