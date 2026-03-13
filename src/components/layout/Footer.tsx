import { motion } from 'framer-motion';
import {
  Instagram,
  Linkedin,
  Twitter,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useState } from 'react';
import LegalModal from './LegalModal';

const Footer = () => {
  const { content } = useContent();
  const { footer, contact, services, legal } = content;
  const { socials } = contact;

  const [activeLegal, setActiveLegal] = useState<any>(null);

  return (
    <footer style={{
      padding: '5rem 0 2rem',
      backgroundColor: '#0a0a0a',
      borderTop: '1px solid var(--border)',
      color: 'white'
    }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '4rem',
            marginBottom: '4rem'
          }}
        >
          {/* Sol Sütun: Logo + Sosyal Medya */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}
          >
            <motion.img
              src={footer.logo}
              alt="Logo"
              whileHover={{ scale: 1.05, filter: 'invert(1) brightness(1.4)' }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                height: '150px',
                width: 'auto',
                filter: 'invert(1) brightness(1.2)',
                mixBlendMode: 'screen',
                marginBottom: '-1rem',
                cursor: 'pointer'
              }}
            />
            <br />
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              {socials?.instagram && (
                <motion.a
                  whileHover={{ y: -3, color: 'var(--primary)' }}
                  href={socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#a0a0a0',
                    transition: 'all 0.3s'
                  }}
                >
                  <Instagram size={18} />
                </motion.a>
              )}
              {socials?.linkedin && (
                <motion.a
                  whileHover={{ y: -3, color: 'var(--primary)' }}
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#a0a0a0',
                    transition: 'all 0.3s'
                  }}
                >
                  <Linkedin size={18} />
                </motion.a>
              )}
              {socials?.twitter && (
                <motion.a
                  whileHover={{ y: -3, color: 'var(--primary)' }}
                  href={socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#a0a0a0',
                    transition: 'all 0.3s'
                  }}
                >
                  <Twitter size={18} />
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Orta Sütun: Hizmetlerimiz */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              marginBottom: '2rem',
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Çalışma Alanlarımız
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {services.items.map((service: any, index: number) => (
                <motion.a
                  key={index}
                  href="#services"
                  whileHover={{ x: 5, color: '#ffffff' }}
                  style={{
                    color: '#a0a0a0',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color 0.3s'
                  }}
                >
                  <ArrowRight size={14} style={{ opacity: 0.5 }} />
                  {service.title}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Sağ Sütun: İletişim Detayları */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              marginBottom: '2rem',
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              İletişim Detayları
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <motion.a
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                whileHover={{ x: 5, color: '#ffffff' }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  color: '#a0a0a0',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
              >
                <div style={{ color: 'var(--primary)' }}><Phone size={18} /></div>
                <span>{contact.phone}</span>
              </motion.a>
              <motion.a
                href={`mailto:${contact.email}`}
                whileHover={{ x: 5, color: '#ffffff' }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  color: '#a0a0a0',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
              >
                <div style={{ color: 'var(--primary)' }}><Mail size={18} /></div>
                <span>{contact.email}</span>
              </motion.a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', color: '#a0a0a0' }}>
                <div style={{ color: 'var(--primary)', marginTop: '3px' }}><MapPin size={18} /></div>
                <span style={{ lineHeight: 1.5 }}>{contact.address}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Alt Kısım: Telif + Mevzuat + Developer */}
        <div style={{
          paddingTop: '3rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ color: '#666', fontSize: '0.85rem' }}>{footer.copy}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#444', fontSize: '0.8rem' }}>
                <ShieldCheck size={14} />
                <span>{footer.compliance}</span>
              </div>
            </div>

            {/* SDN Developer Credit */}
            <motion.div
              whileHover={{
                borderColor: 'rgba(255,255,255,0.2)',
                backgroundColor: 'rgba(255,255,255,0.02)',
                y: -2
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.8rem 1.2rem',
                borderRadius: '12px',
                backgroundColor: '#000000',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
            >
              <img
                src={footer.sdnLogo}
                alt="SDN Logo"
                style={{
                  height: '28px',
                  backgroundColor: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  objectFit: 'contain',
                  border: '1px solid #000000',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                }}
              />
              <p style={{ fontSize: '0.75rem', color: '#888', margin: 0 }}>
                {footer.devCredit}
              </p>
            </motion.div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <motion.button
              onClick={() => setActiveLegal('kvkk')}
              whileHover={{ color: '#ffffff', x: 3 }}
              style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: '#444', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.3s' }}
            >
              KVKK Aydınlatma Metni
            </motion.button>
            <motion.button
              onClick={() => setActiveLegal('privacy')}
              whileHover={{ color: '#ffffff', x: 3 }}
              style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: '#444', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.3s' }}
            >
              Gizlilik Politikası
            </motion.button>
            <motion.button
              onClick={() => setActiveLegal('terms')}
              whileHover={{ color: '#ffffff', x: 3 }}
              style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: '#444', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.3s' }}
            >
              Kullanım Şartları
            </motion.button>
          </div>
        </div>
      </div>

      <LegalModal
        isOpen={!!activeLegal}
        onClose={() => setActiveLegal(null)}
        type={activeLegal}
        content={legal[activeLegal] || {}}
      />
    </footer>
  );
};

export default Footer;
