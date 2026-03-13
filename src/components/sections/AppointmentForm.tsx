import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const AppointmentForm = () => {
  const { content } = useContent();
  const { contact } = content;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const submission = {
      id: Date.now(),
      date: new Date().toLocaleString('tr-TR'),
      category: formData.get('category'),
      name: formData.get('firstName'),
      surname: formData.get('lastName'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      status: 'new'
    };

    const existingSubmissions = JSON.parse(localStorage.getItem('form_submissions') || '[]');
    localStorage.setItem('form_submissions', JSON.stringify([submission, ...existingSubmissions]));

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact">
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '4rem',
          alignItems: 'start'
        }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          >
            <span style={{ color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>{contact.badge}</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', margin: '1rem 0 2rem' }}>{contact.title}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
              {contact.description}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--glass)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)', display: 'flex' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Telefon</p>
                  <p style={{ fontWeight: 600 }}>{contact.phone}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--glass)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)', display: 'flex' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>E-Posta</p>
                  <p style={{ fontWeight: 600 }}>{contact.email}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--glass)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)', display: 'flex' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Adres</p>
                  <p style={{ fontWeight: 600 }}>{contact.address}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
            className="glass" 
            style={{ padding: 'clamp(1.5rem, 5vw, 3rem)', borderRadius: '12px', position: 'relative' }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ 
                    textAlign: 'center', 
                    padding: '3rem 0'
                  }}
                >
                  <CheckCircle2 size={64} color="var(--primary)" style={{ margin: '0 auto 1.5rem' }} />
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Randevu Talebiniz Alındı</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Av. Tugay Kayhan en kısa sürede sizinle iletişime geçecektir. Teşekkür ederiz.</p>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Kategori</label>
                    <select name="category" className="form-control" required>
                      <option value="">Seçiniz...</option>
                      {contact.appointmentCategories?.map((cat: string) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Ad</label>
                      <input name="firstName" type="text" className="form-control" required placeholder="Adınız" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Soyad</label>
                      <input name="lastName" type="text" className="form-control" required placeholder="Soyadınız" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Telefon</label>
                    <input name="phone" type="tel" className="form-control" required placeholder="05XX XXX XX XX" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">E-Posta</label>
                    <input name="email" type="email" className="form-control" required placeholder="örnek@eposta.com" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Randevu Özeti</label>
                    <textarea name="subject" className="form-control" rows={4} required placeholder="Kısaca durumunuzu özetleyin..."></textarea>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    Randevu Talebi Gönder
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
