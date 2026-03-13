import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { content } = useContent();
  const { navbar } = content;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(() => {
    return localStorage.getItem('announcementDismissed') !== 'true' && content.announcement?.active;
  });
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleAnnouncementDismissed = () => setIsAnnouncementVisible(false);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('announcementDismissed', handleAnnouncementDismissed);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('announcementDismissed', handleAnnouncementDismissed);
    };
  }, []);

  return (
    <motion.div 
      initial={{ y: -100, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
      style={{
        position: 'fixed',
        top: (isScrolled || !isAnnouncementVisible) ? '1rem' : '4rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '95%',
        maxWidth: '1200px',
        zIndex: 1000,
        pointerEvents: 'none',
        transition: 'top 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <nav 
        className={`transition-all duration-500`} 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isScrolled ? '0.5rem 1.2rem' : '0.8rem 1.5rem',
          borderRadius: '100px',
          backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.85)' : 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          pointerEvents: 'auto',
          boxShadow: isScrolled 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 20px rgba(197, 160, 89, 0.1)' 
            : '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          gap: '1rem'
        }}
      >
        <motion.div 
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div style={{ position: 'relative' }}>
             <img 
              src={navbar.logo} 
              alt="Logo" 
              style={{ 
                height: isScrolled ? '36px' : '44px', 
                width: 'auto',
                filter: 'invert(1) brightness(1.2)',
                mixBlendMode: 'screen',
                transition: 'height 0.4s ease'
              }} 
            />
            {isScrolled && (
              <motion.div
                layoutId="logo-glow"
                style={{
                  position: 'absolute',
                  inset: -10,
                  background: 'radial-gradient(circle, rgba(197, 160, 89, 0.2) 0%, transparent 70%)',
                  zIndex: -1
                }}
              />
            )}
          </div>
        </motion.div>

        <div className="desktop-menu" style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          {navbar.links.map((link: any) => (
            <div 
              key={link.name} 
              style={{ position: 'relative' }}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Link 
                to={`/${link.href}`} 
                className="nav-link"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '1px',
                  opacity: hoveredLink === link.name ? 1 : 0.7,
                  color: hoveredLink === link.name ? 'var(--primary)' : 'white',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none'
                }}
              >
                {link.name}
              </Link>
              <AnimatePresence>
                {hoveredLink === link.name && (
                  <motion.div
                    layoutId="nav-glow-indicator"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: '100%' }}
                    exit={{ opacity: 0, width: 0 }}
                    style={{
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
                      zIndex: 1
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
          
          <motion.button 
            onClick={() => navigate('/contact')}
            className="btn-primary" 
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 25px rgba(197, 160, 89, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              padding: '0.7rem 1.8rem', 
              borderRadius: '100px', 
              fontSize: '0.75rem',
              fontWeight: 800,
              margin: 0,
              background: 'linear-gradient(135deg, #c5a059 0%, #d4b47a 50%, #b38f4d 100%)',
              backgroundSize: '200% auto',
              color: '#000000',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: '0 10px 20px -5px rgba(197, 160, 89, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            <Sparkles size={16} fill="currentColor" />
            {navbar.cta}
          </motion.button>
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;
