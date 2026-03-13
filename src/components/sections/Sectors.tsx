import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const Sectors = () => {
  const { content } = useContent();
  const { sectors } = content;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  return (
    <section id="sectors" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={containerVariants}
          className="section-header"
        >
          <motion.span variants={itemVariants} style={{ color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>{sectors.badge}</motion.span>
          <motion.h2 variants={itemVariants}>{sectors.title}</motion.h2>
          <motion.div variants={itemVariants} className="divider"></motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={containerVariants}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem' 
          }}
        >
          {sectors.items.map((sector: any, index: number) => {
            const IconComponent = (LucideIcons as any)[sector.icon] || LucideIcons.HelpCircle;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass"
                style={{ 
                  padding: '2rem', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.5rem',
                  cursor: 'pointer'
                }}
                whileHover={{ 
                  borderColor: 'var(--primary)', 
                  backgroundColor: 'rgba(197, 160, 89, 0.05)',
                  y: -5
                }}
              >
                <div style={{ color: 'var(--primary)' }}>
                  <IconComponent size={32} />
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 500 }}>{sector.name}</h4>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Sectors;
