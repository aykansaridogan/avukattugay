import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'kvkk' | 'privacy' | 'terms';
  content: {
    title: string;
    content: string;
  };
}

const LegalModal = ({ isOpen, onClose, type, content }: LegalModalProps) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'kvkk': return <ShieldCheck size={40} color="var(--primary)" />;
      case 'privacy': return <Lock size={40} color="var(--primary)" />;
      case 'terms': return <FileText size={40} color="var(--primary)" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              width: '100%',
              maxWidth: '700px',
              backgroundColor: '#0a0a0a',
              borderRadius: '24px',
              border: '1px solid var(--border)',
              position: 'relative',
              maxHeight: '85vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '2rem',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {getIcon()}
                <h3 className="serif" style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>{content.title}</h3>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: 'none',
                  color: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div style={{
              padding: '2rem',
              overflowY: 'auto',
              flex: 1,
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: 1.8,
              whiteSpace: 'pre-line',
              fontSize: '0.95rem'
            }}>
              {content.content}
            </div>

            {/* Footer */}
            <div style={{
              padding: '1.5rem 2rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={onClose}
                className="btn-primary"
                style={{
                  padding: '0.6rem 2rem',
                  borderRadius: '100px',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
              >
                Anladım
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;
