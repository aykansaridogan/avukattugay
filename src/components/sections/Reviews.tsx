import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const Reviews = () => {
  const { content } = useContent();
  const { reviews } = content;

  return (
    <section id="reviews" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <span style={{ color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>{reviews.badge}</span>
          <h2>{reviews.title}</h2>
          <div className="divider"></div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {reviews.items.map((review: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.2 }}
              className="glass"
              style={{ padding: '3rem 2rem', borderRadius: '20px', position: 'relative' }}
            >
              <Quote 
                size={40} 
                style={{ position: 'absolute', top: '2rem', right: '2rem', opacity: 0.1, color: 'var(--primary)' }} 
              />
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--primary)" color="var(--primary)" />
                ))}
              </div>
              <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '2rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                "{review.text}"
              </p>
              <div>
                <h4 className="serif" style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{review.name}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
