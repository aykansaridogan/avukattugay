import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const Services = () => {
  const { content } = useContent();
  const { services } = content;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <section id="services" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={containerVariants}
          className="section-header"
        >
          <motion.span variants={itemVariants} style={{ color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>{services.badge}</motion.span>
          <motion.h2 variants={itemVariants}>{services.title}</motion.h2>
          <motion.div variants={itemVariants} className="divider"></motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={containerVariants}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}
        >
          {services.items.map((item: any, index: number) => {
            const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.HelpCircle;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="glass"
                style={{ padding: '3rem 2rem', borderRadius: '8px', textAlign: 'center' }}
              >
                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  <IconComponent size={40} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
