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
    <div style={{ display: 'grid', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.2rem' }}>Gelen Randevu Talepleri</h3>
        <span style={{ background: 'var(--primary)', color: 'var(--bg-dark)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
          {submissions.length} Mesaj
        </span>
      </div>

      {submissions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed var(--border)' }}>
          <p style={{ color: 'var(--text-muted)' }}>Henüz gelen bir randevu talebi bulunmuyor.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {submissions.map((sub) => (
            <div key={sub.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', position: 'relative' }}>
              <button 
                onClick={() => removeSubmission(sub.id)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: '#ff4d4d', background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <Trash2 size={20} />
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '10px', borderRadius: '10px', color: 'var(--primary)' }}><User size={18} /></div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Gönderen</p>
                    <p style={{ fontWeight: 600 }}>{sub.name} {sub.surname}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '10px', borderRadius: '10px', color: 'var(--primary)' }}><Calendar size={18} /></div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tarih</p>
                    <p style={{ fontWeight: 600 }}>{sub.date}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '10px', borderRadius: '10px', color: 'var(--primary)' }}><Mail size={18} /></div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>E-Posta</p>
                    <p style={{ fontWeight: 600 }}>{sub.email}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '10px', borderRadius: '10px', color: 'var(--primary)' }}><Phone size={18} /></div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Telefon</p>
                    <p style={{ fontWeight: 600 }}>{sub.phone}</p>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--bg-dark)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <MessageSquare size={16} color="var(--primary)" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)' }}>{sub.category}</span>
                </div>
                <p style={{ lineHeight: 1.6, color: 'var(--text-muted)' }}>{sub.subject}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmissionsView;
