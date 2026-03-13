import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import ArticleModal from './ArticleModal';

const Articles = () => {
  const { content } = useContent();
  const { articles } = content;
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const publishedArticles = articles.items.filter((item: any) => item.status === 'published');

  return (
    <section id="articles" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="container">
        <div className="section-header">
          <span style={{ color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>{articles.badge}</span>
          <h2>{articles.title}</h2>
          <div className="divider"></div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {publishedArticles.map((article: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.2 }}
              style={{ 
                backgroundColor: 'var(--bg-card)', 
                borderRadius: '16px', 
                overflow: 'hidden',
                border: '1px solid var(--border)',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedArticle(article)}
            >
              <div style={{ height: '240px', overflow: 'hidden' }}>
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src={article.image} 
                  alt={article.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>{article.category}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    <Clock size={14} />
                    <span>{article.date}</span>
                  </div>
                </div>
                <h3 className="serif" style={{ fontSize: '1.4rem', marginBottom: '1.5rem', lineHeight: 1.4 }}>{article.title}</h3>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  color: 'white', 
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}>
                  Devamını Oku <ArrowRight size={18} color="var(--primary)" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal 
            article={selectedArticle} 
            onClose={() => setSelectedArticle(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Articles;
