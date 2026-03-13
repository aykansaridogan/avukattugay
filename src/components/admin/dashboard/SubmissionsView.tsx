import { Trash2, Calendar, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

const SubmissionsView = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('form_submissions') || '[]');
    setSubmissions(data);
  }, []);

  const removeSubmission = (id: number) => {
    const newData = submissions.filter(s => s.id !== id);
    localStorage.setItem('form_submissions', JSON.stringify(newData));
    setSubmissions(newData);
  };

  return (
    <div style={{ display: 'grid', gap: 'clamp(1rem, 5vw, 2rem)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', margin: 0 }}>Gelen Randevu Talepleri</h3>
        <span style={{ background: 'var(--primary)', color: 'var(--bg-dark)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
          {submissions.length} Mesaj
        </span>
      </div>

      {submissions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'clamp(2rem, 10vw, 4rem) 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed var(--border)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Henüz gelen bir randevu talebi bulunmuyor.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {submissions.map((sub) => (
            <div key={sub.id} style={{ 
              background: 'rgba(255,255,255,0.03)', 
              padding: 'clamp(1.25rem, 5vw, 2rem)', 
              borderRadius: '16px', 
              border: '1px solid var(--border)', 
              position: 'relative' 
            }}>
              <button 
                onClick={() => removeSubmission(sub.id)}
                style={{ position: 'absolute', top: 'clamp(1rem, 4vw, 1.5rem)', right: 'clamp(1rem, 4vw, 1.5rem)', color: '#ff4d4d', background: 'transparent', border: 'none', cursor: 'pointer', padding: '5px' }}
              >
                <Trash2 size={18} />
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 'clamp(1rem, 4vw, 2rem)', marginBottom: '1.5rem', paddingRight: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '8px', borderRadius: '8px', color: 'var(--primary)', flexShrink: 0 }}><User size={16} /></div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>Gönderen</p>
                    <p style={{ fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub.name} {sub.surname}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '8px', borderRadius: '8px', color: 'var(--primary)', flexShrink: 0 }}><Calendar size={16} /></div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>Randevu Tarihi</p>
                    <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary)' }}>{sub.appointmentDate || 'Belirtilmedi'}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '8px', borderRadius: '8px', color: 'var(--text-muted)', flexShrink: 0 }}><Calendar size={16} /></div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>Gönderim Tarihi</p>
                    <p style={{ fontWeight: 600, fontSize: '0.8rem' }}>{sub.submissionDate || sub.date}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '8px', borderRadius: '8px', color: 'var(--primary)', flexShrink: 0 }}><Mail size={16} /></div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>E-Posta</p>
                    <p style={{ fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub.email}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '8px', borderRadius: '8px', color: 'var(--primary)', flexShrink: 0 }}><Phone size={16} /></div>
                  <div>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>Telefon</p>
                    <p style={{ fontWeight: 600, fontSize: '0.85rem' }}>{sub.phone}</p>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <MessageSquare size={14} color="var(--primary)" />
                  <span style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary)' }}>{sub.category}</span>
                </div>
                <p style={{ lineHeight: 1.5, color: 'var(--text-muted)', fontSize: '0.85rem' }}>{sub.subject}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmissionsView;
