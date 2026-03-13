import { useState } from 'react';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const SecurityEditor = () => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem('admin_password') || 'admin123';

    if (currentPass !== storedPass) {
      setStatus({ type: 'error', message: 'Mevcut şifre hatalı!' });
      return;
    }

    if (newPass !== confirmPass) {
      setStatus({ type: 'error', message: 'Yeni şifreler eşleşmiyor!' });
      return;
    }

    if (newPass.length < 6) {
      setStatus({ type: 'error', message: 'Şifre en az 6 karakter olmalıdır!' });
      return;
    }

    localStorage.setItem('admin_password', newPass);
    setStatus({ type: 'success', message: 'Şifre başarıyla güncellendi!' });
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div style={{ maxWidth: '500px' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(255, 215, 0, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--primary)' }}>
          <ShieldCheck size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem' }}>Güvenlik Ayarları</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Panel giriş şifresini buradan değiştirebilirsiniz.</p>
        </div>
      </div>

      <form onSubmit={handleUpdate} style={{ display: 'grid', gap: '1.5rem' }}>
        <div className="form-group">
          <label className="form-label">Mevcut Şifre</label>
          <input 
            type={showPass ? "text" : "password"}
            className="form-control" 
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
            required
          />
        </div>

        <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem 0' }}></div>

        <div className="form-group">
          <label className="form-label">Yeni Şifre</label>
          <input 
            type={showPass ? "text" : "password"}
            className="form-control" 
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Yeni Şifre (Tekrar)</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={showPass ? "text" : "password"}
              className="form-control" 
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
            <button 
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {status.message && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
            style={{ color: status.type === 'error' ? '#ff4d4d' : '#4ade80', fontSize: '0.9rem', fontWeight: 600 }}
          >
            {status.message}
          </motion.p>
        )}

        <button type="submit" className="btn-primary" style={{ height: '52px', marginTop: '1rem' }}>
          Şifreyi Güncelle
        </button>
      </form>
    </div>
  );
};

export default SecurityEditor;
