import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useContent } from '../../context/ContentContext';

const AnnouncementBar = () => {
  const { content } = useContent();
  const { announcement } = content;
  const [isVisible, setIsVisible] = useState(() => {
    return localStorage.getItem('announcementDismissed') !== 'true';
  });

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('announcementDismissed', 'true');
    window.dispatchEvent(new Event('announcementDismissed'));
  };

  if (!announcement || !announcement.active || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        style={{ 
          background: 'linear-gradient(90deg, #b38f4d 0%, #c5a059 50%, #b38f4d 100%)',
          backgroundSize: '200% auto',
          color: '#000000', 
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2000,
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Shimmer Effect */}
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0.7rem 3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {announcement.link ? (
            <motion.a 
              href={announcement.link} 
              whileHover={{ scale: 1.01 }}
              style={{ 
                color: 'inherit', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.6rem', 
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}
            >
              <span style={{ opacity: 0.9 }}>{announcement.text}</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={14} strokeWidth={3} />
              </motion.div>
            </motion.a>
          ) : (
            <span style={{ fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.5px' }}>{announcement.text}</span>
          )}
          
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDismiss}
            style={{ 
              position: 'absolute', 
              right: '1rem', 
              top: '50%', 
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: 'rgba(0,0,0,0.6)',
              cursor: 'pointer',
              display: 'flex',
              padding: '6px',
              borderRadius: '50%',
              transition: 'all 0.2s'
            }}
          >
            <X size={16} strokeWidth={2.5} />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementBar;
