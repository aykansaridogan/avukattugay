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
      zIndex: 1000, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem'
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
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)'
        }}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        style={{ 
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          background: 'var(--bg-dark)',
          borderRadius: '24px',
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
            top: '1.5rem', 
            right: '1.5rem', 
            zIndex: 10,
            background: 'rgba(0,0,0,0.5)',
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
          <X size={24} />
        </button>

        <div style={{ overflowY: 'auto', flex: 1, padding: '0 0 4rem' }}>
          <div style={{ width: '100%', height: '400px', position: 'relative' }}>
            <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '3rem 4rem', background: 'linear-gradient(to top, var(--bg-dark), transparent)' }}>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', alignItems: 'center' }}>
                <span style={{ 
                  background: 'var(--primary)', 
                  color: 'var(--bg-dark)', 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.75rem', 
                  fontWeight: 700 
                }}>
                  {article.category}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                  <Clock size={16} />
                  <span>{article.date}</span>
                </div>
              </div>
              <h1 className="serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white' }}>{article.title}</h1>
            </div>
          </div>

          <div style={{ padding: '3rem 4rem', display: 'grid', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            {article.content && article.content.length > 0 ? (
              article.content.map((block: any, idx: number) => (
                <div key={idx}>
                  {block.type === 'heading' && (
                    <h2 className="serif" style={{ fontSize: '1.8rem', color: 'var(--primary)', marginTop: '1rem' }}>{block.value}</h2>
                  )}
                  {block.type === 'paragraph' && (
                    <p style={{ lineHeight: 1.8, fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>{block.value}</p>
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
