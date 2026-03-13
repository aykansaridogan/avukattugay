import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Gavel } from 'lucide-react';

const Login = ({ onLogin }: { onLogin: (status: boolean) => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('admin_password') || 'admin123';
    
    if (password === storedPassword) {
      onLogin(true);
      localStorage.setItem('isAdmin', 'true');
    } else {
      setError('Geçersiz şifre, lütfen tekrar deneyin.');
      setPassword('');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--bg-dark)',
      padding: '2rem'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass"
        style={{ 
          padding: '3rem', 
          borderRadius: '24px', 
          width: '100%', 
          maxWidth: '400px',
          border: '1px solid rgba(255, 215, 0, 0.1)',
          textAlign: 'center'
        }}
      >
        <div style={{ 
          width: '64px', 
          height: '64px', 
          background: 'rgba(255, 215, 0, 0.1)', 
          borderRadius: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          color: 'var(--primary)'
        }}>
          <Gavel size={32} />
        </div>

        <h2 className="serif" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Yönetim Paneli</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '0.9rem' }}>Devam etmek için yönetici şifresini girin</p>

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label" style={{ paddingLeft: '0.5rem' }}>Giriş Şifresi</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', opacity: 0.6 }} />
              <input 
                type="password" 
                className="form-control" 
                style={{ paddingLeft: '3.2rem', height: '56px', borderRadius: '14px' }} 
                placeholder="Örn: 123456"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ color: '#ff4d4d', fontSize: '0.8rem', marginTop: '1rem', fontWeight: 500 }}
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', height: '56px', marginTop: '2rem', borderRadius: '14px', fontSize: '1rem' }}
          >
            Sisteme Giriş Yap
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
