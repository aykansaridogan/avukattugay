import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useContent } from '../../context/ContentContext';

const FloatingFAQ = () => {
  const { content } = useContent();
  const { faq } = content;
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!faq || !faq.items || faq.items.length === 0) return null;

  return (
    <div style={{ position: 'fixed', bottom: '7rem', right: '2rem', zIndex: 9997 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{
              position: 'absolute',
              bottom: '4.5rem',
              right: 0,
              width: '350px',
              maxHeight: '500px',
              backgroundColor: '#1a1a1a',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div style={{ 
              padding: '1.5rem', 
              background: 'linear-gradient(135deg, #c5a059 0%, #b38f4d 100%)',
              color: '#000',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{faq.title}</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.8 }}>Size nasıl yardımcı olabiliriz?</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'rgba(0,0,0,0.1)', border: 'none', borderRadius: '50%', padding: '5px', cursor: 'pointer', display: 'flex' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Swiper/List */}
            <div style={{ padding: '1rem', overflowY: 'auto', flex: 1 }} className="faq-scroll">
              <style>{`
                .faq-scroll::-webkit-scrollbar { width: 4px; }
                .faq-scroll::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 10px; }
              `}</style>
              {faq.items.map((item: any, index: number) => {
                const isItemOpen = activeIndex === index;
                return (
                  <div key={index} style={{ marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <button
                      onClick={() => setActiveIndex(isItemOpen ? null : index)}
                      style={{
                        width: '100%',
                        padding: '1rem 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem',
                        background: 'transparent',
                        border: 'none',
                        color: isItemOpen ? 'var(--primary)' : '#fff',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        transition: 'color 0.3s'
                      }}
                    >
                      <span>{item.question}</span>
                      {isItemOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </button>
                    <AnimatePresence>
                      {isItemOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ padding: '0 0 1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            
            <div style={{ padding: '1rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
               <a 
                href="#contact" 
                onClick={() => setIsOpen(false)}
                style={{ fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
               >
                 Daha fazla yardıma mı ihtiyacınız var?
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #c5a059 0%, #b38f4d 100%)',
          border: 'none',
          boxShadow: '0 10px 30px rgba(197, 160, 89, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000',
          cursor: 'pointer'
        }}
      >
        {isOpen ? <X size={28} /> : <HelpCircle size={28} />}
      </motion.button>
    </div>
  );
};

export default FloatingFAQ;
