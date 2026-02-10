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

// Temporary Coming Soon component
function ComingSoon({ page }) {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          {page}
        </h1>
        <p className="text-xl text-gray-600 mb-8">Página en construcción</p>
        <Link to="/" className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
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
            <Route path="/convenios" element={<ComingSoon page="Convenios" />} />
            <Route path="/fenalempleo" element={<ComingSoon page="FenalEmpleo" />} />
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