import { Save } from 'lucide-react';

interface HeaderProps {
  title: string;
  onSave: () => void;
}

const Header = ({ title, onSave }: HeaderProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
      <div>
        <h1 className="serif" style={{ fontSize: '2.5rem' }}>{title}</h1>
        <p style={{ color: 'var(--text-muted)' }}>Bölüm içeriklerini buradan düzenleyebilirsiniz.</p>
      </div>
      <button 
        onClick={onSave}
        className="btn-primary" 
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 2rem' }}
      >
        <Save size={20} />
        Değişiklikleri Kaydet
      </button>
    </div>
  );
};

export default Header;
