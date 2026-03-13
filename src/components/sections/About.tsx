import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';

const About = () => {
  const { content } = useContent();
  const { about } = content;

  return (
    <section id="about" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="container">
        <div 
          className="grid-mobile-1"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', 
            gap: '3rem',
            alignItems: 'center'
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4/5',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid var(--border)'
            }}>
              <img 
                src={about.image} 
                alt={about.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '2rem',
                right: '2rem',
                padding: '1.5rem',
                background: 'rgba(10, 10, 10, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: '1px solid var(--border)'
              }}>
                <h4 className="serif" style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{about.name}</h4>
                <p style={{ color: 'var(--primary)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>{about.role}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>{about.badge}</span>
            <h2 style={{ fontSize: '3rem', margin: '1rem 0 2rem' }}>{about.title}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              {about.p1}
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
              {about.p2}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {about.stats.map((stat: any, index: number) => (
                <div key={index}>
                  <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{stat.value}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
