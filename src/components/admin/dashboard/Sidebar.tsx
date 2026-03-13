import { LogOut, X } from 'lucide-react';

interface SidebarProps {
  groups: any[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ groups, activeTab, setActiveTab, isOpen, onClose }: SidebarProps) => {
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 9998,
            display: 'block'
          }}
        />
      )}
      
      <div style={{ 
        position: 'fixed', 
        left: isOpen ? 0 : '-280px', 
        top: 0, 
        bottom: 0, 
        width: '280px', 
        background: '#111',
        borderRight: '1px solid var(--border)',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9999,
        transition: 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }} className="admin-sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h2 className="serif" style={{ fontSize: '1.2rem', color: 'var(--primary)', letterSpacing: '1px' }}>TUGAY KAYHAN</h2>
            <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>Hukuk Paneli</p>
          </div>
          <button onClick={onClose} className="mobile-toggle" style={{ color: 'white' }}>
            <X size={20} />
          </button>
        </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1, overflowY: 'auto' }}>
        {groups.map((group, gIdx) => (
          <div key={gIdx}>
            <p style={{ 
              fontSize: '0.7rem', 
              color: 'var(--text-muted)', 
              fontWeight: 700, 
              letterSpacing: '1.5px', 
              marginBottom: '1rem',
              paddingLeft: '0.5rem'
            }}>
              {group.title}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {group.items.map((tab: any) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.8rem 1rem',
                    borderRadius: '10px',
                    background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--bg-dark)' : 'rgba(255,255,255,0.7)',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ opacity: activeTab === tab.id ? 1 : 0.6 }}>{tab.icon}</span>
                  <span style={{ flex: 1 }}>{tab.name}</span>
                  {tab.badge > 0 && (
                    <span style={{ 
                      background: activeTab === tab.id ? 'var(--bg-dark)' : 'var(--primary)', 
                      color: activeTab === tab.id ? 'var(--primary)' : 'var(--bg-dark)',
                      padding: '2px 8px',
                      borderRadius: '8px',
                      fontSize: '0.65rem',
                      fontWeight: 800
                    }}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

        <button 
          onClick={handleLogout}
          style={{
            marginTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            color: '#ff4d4d',
            fontWeight: 600,
            background: 'rgba(255, 77, 77, 0.05)',
            border: '1px solid rgba(255, 77, 77, 0.1)',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            justifyContent: 'center',
            fontSize: '0.85rem'
          }}
        >
          <LogOut size={16} />
          Çıkış Yap
        </button>
      </div>
    </>
  );
};

export default Sidebar;
