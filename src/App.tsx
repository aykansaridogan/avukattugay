import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Sectors from './components/sections/Sectors';
import Articles from './components/sections/Articles';
import Reviews from './components/sections/Reviews';
import AppointmentForm from './components/sections/AppointmentForm';
import Footer from './components/layout/Footer';
import AnnouncementBar from './components/layout/AnnouncementBar';
import FloatingFAQ from './components/common/FloatingFAQ';
import LiveSupport from './components/common/LiveSupport';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import MetaContent from './components/common/MetaContent';
import { HelmetProvider } from 'react-helmet-async';
import { useState, useEffect } from 'react';

const LandingPage = () => {
  const { section } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on direct "/" access
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Scroll to section based on URL path
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        const offset = 100; // Account for fixed navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [section, pathname]);

  return (
    <div className="app">
      <AnnouncementBar />
      <Navbar />
      <main>
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        <section id="services"><Services /></section>
        <section id="sectors"><Sectors /></section>
        <section id="articles"><Articles /></section>
        <section id="reviews"><Reviews /></section>
        <section id="contact"><AppointmentForm /></section>
      </main>
      <Footer />
      <FloatingFAQ />
      <LiveSupport />
    </div>
  );
};

function App() {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');

  return (
    <ContentProvider>
      <HelmetProvider>
        <Router>
          <MetaContent />
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={
              isAdmin ? <Dashboard /> : <Login onLogin={setIsAdmin} />
            } />

            {/* Landing Page Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/:section" element={<LandingPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </HelmetProvider>
    </ContentProvider>
  );
}

export default App;
