import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';

const Hero = () => {
  const { content } = useContent();
  const { hero } = content;

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '100px'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(rgba(10,10,10,0.7), rgba(10,10,10,0.9)), url("${hero.bgImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1
      }} />

      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          style={{ maxWidth: '800px' }}
        >
          <motion.span 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
            }}
            style={{ color: 'var(--primary)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}
          >
            {hero.badge}
          </motion.span>
          
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
            }}
            style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1.1, marginBottom: '2rem' }}
          >
            {hero.title.split('Güvenin')[0]} <span style={{ color: 'var(--primary)' }}>Güvenin</span> {hero.title.split('Güvenin')[1]}
          </motion.h1>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
            }}
            style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px' }}
          >
            {hero.description}
          </motion.p>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
            }}
            style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
          >
            <a href="#contact" className="btn-primary">{hero.primaryBtn}</a>
            <a href="#services" className="btn-outline">{hero.secondaryBtn}</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
