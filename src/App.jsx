import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
// import Services from './pages/Services';
// import Affiliate from './pages/Affiliate';
// import Events from './pages/Events';
// import Agreements from './pages/Agreements';
// import Jobs from './pages/Jobs';

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
            {/* <Route path="/servicios" element={<Services />} />
            <Route path="/afiliate" element={<Affiliate />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/convenios" element={<Agreements />} />
            <Route path="/fenalempleo" element={<Jobs />} /> */}
            
            {/* Temporal placeholders for missing pages */}
            <Route path="/servicios" element={<ComingSoon page="Servicios" />} />
            <Route path="/afiliate" element={<ComingSoon page="Afiliación" />} />
            <Route path="/eventos" element={<ComingSoon page="Eventos" />} />
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

// Temporary Coming Soon component
function ComingSoon({ page }) {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold text-gradient mb-4">{page}</h1>
        <p className="text-xl text-gray-600 mb-8">Página en construcción</p>
        <a href="/" className="btn-primary">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

export default App;
