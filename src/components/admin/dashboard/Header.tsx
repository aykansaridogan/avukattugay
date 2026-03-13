import { Save, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  onSave: () => void;
  onToggleSidebar?: () => void;
}

const Header = ({ title, onSave, onToggleSidebar }: HeaderProps) => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      marginBottom: '2rem', 
      gap: '0.75rem',
      padding: '0.5rem 0',
      position: 'relative'
    }}>
      {/* Toggle button - far left */}
      <button 
        onClick={onToggleSidebar}
        className="mobile-toggle"
        style={{ 
          color: 'white', 
          padding: '10px', 
          background: 'rgba(255,255,255,0.05)', 
          borderRadius: '12px',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <Menu size={20} />
      </button>

      {/* Title - flexible middle */}
      <h1 className="serif" style={{ 
        fontSize: 'clamp(1rem, 4.5vw, 1.6rem)', 
        margin: 0,
        flex: 1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: 1
      }}>
        {title}
      </h1>
      
      {/* Save button - far right, compact icon on mobile */}
      <button 
        onClick={onSave}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '0.5rem', 
          padding: '10px', 
          borderRadius: '12px',
          flexShrink: 0,
          background: 'var(--primary)',
          color: 'var(--bg-dark)',
          border: 'none',
          cursor: 'pointer',
          width: 'auto',
          minWidth: '42px'
        }}
      >
        <Save size={18} />
        <span className="desktop-only" style={{ fontSize: '0.85rem', fontWeight: 600, marginLeft: '4px' }}>Değişiklikleri Kaydet</span>
      </button>
    </div>
  );
};

export default Header;
