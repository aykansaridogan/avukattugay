import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useContent } from '../../context/ContentContext';

const FAQ = () => {
  const { content } = useContent();
  const { faq } = content;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!faq || !faq.items || faq.items.length === 0) return null;

  return (
    <section id="faq" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="container">
        <div className="section-header">
          <span style={{ color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>{faq.badge}</span>
          <h2>{faq.title}</h2>
          <div className="divider"></div>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gap: '1rem' }}>
          {faq.items.map((item: any, index: number) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index}
                style={{ 
                  border: '1px solid var(--border)', 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  background: isOpen ? 'rgba(255,255,255,0.02)' : 'transparent',
                  transition: 'all 0.3s'
                }}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  style={{ 
                    width: '100%', 
                    padding: '1.5rem 2rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    gap: '1.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '1.1rem', fontWeight: 500, color: isOpen ? 'var(--primary)' : 'white' }}>{item.question}</span>
                  <div style={{ color: 'var(--primary)' }}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div style={{ padding: '0 2rem 1.5rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
