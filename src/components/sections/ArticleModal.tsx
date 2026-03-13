import { motion } from 'framer-motion';
import { X, Clock } from 'lucide-react';

interface ArticleModalProps {
  article: any;
  onClose: () => void;
}

const ArticleModal = ({ article, onClose }: ArticleModalProps) => {
  if (!article) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      zIndex: 99999, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: 'clamp(0.5rem, 3vw, 2rem)'
    }}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(12px)'
        }}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        style={{ 
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          maxHeight: '100%',
          background: 'var(--bg-dark)',
          borderRadius: 'clamp(0px, 4vw, 24px)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <button 
          onClick={onClose}
          style={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem', 
            zIndex: 10,
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ overflowY: 'auto', flex: 1, paddingBottom: '3rem' }}>
          <div style={{ width: '100%', height: 'clamp(250px, 40vh, 450px)', position: 'relative' }}>
            <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1rem, 5vw, 4rem)', 
              background: 'linear-gradient(to top, var(--bg-dark) 20%, transparent)' 
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
                <span style={{ 
                  background: 'var(--primary)', 
                  color: 'var(--bg-dark)', 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.7rem', 
                  fontWeight: 700 
                }}>
                  {article.category}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
                  <Clock size={14} />
                  <span>{article.date}</span>
                </div>
              </div>
              <h1 className="serif" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', color: 'white', lineHeight: 1.2 }}>{article.title}</h1>
            </div>
          </div>

          <div style={{ 
            padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1.25rem, 5vw, 4rem)', 
            display: 'grid', 
            gap: '1.5rem', 
            maxWidth: '800px', 
            margin: '0 auto' 
          }}>
            {article.content && article.content.length > 0 ? (
              article.content.map((block: any, idx: number) => (
                <div key={idx}>
                  {block.type === 'heading' && (
                    <h2 className="serif" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', color: 'var(--primary)', marginTop: '0.5rem', marginBottom: '0.5rem' }}>{block.value}</h2>
                  )}
                  {block.type === 'paragraph' && (
                    <p style={{ lineHeight: 1.7, fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: 'rgba(255,255,255,0.85)' }}>{block.value}</p>
                  )}
                  {block.type === 'image' && (
                    <div style={{ margin: '1rem 0' }}>
                      <img src={block.value} alt="" style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--border)' }} />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Henüz detaylı içerik eklenmemiş.</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ArticleModal;
