import { LogOut } from 'lucide-react';

interface SidebarProps {
  groups: any[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Sidebar = ({ groups, activeTab, setActiveTab }: SidebarProps) => {
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
  };

  return (
    <div style={{ 
      position: 'fixed', 
      left: 0, 
      top: 0, 
      bottom: 0, 
      width: '280px', 
      background: 'rgba(30, 30, 30, 0.4)',
      backdropFilter: 'blur(10px)',
      borderRight: '1px solid var(--border)',
      padding: '2.5rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100
    }}>
      <div style={{ marginBottom: '3rem', padding: '0 0.5rem' }}>
        <h2 className="serif" style={{ fontSize: '1.4rem', color: 'var(--primary)', letterSpacing: '1px' }}>TUGAY KAYHAN</h2>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px' }}>Hukuk & Danışmanlık</p>
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
          fontSize: '0.9rem'
        }}
      >
        <LogOut size={18} />
        Sistemden Çıkış
      </button>
    </div>
  );
};

export default Sidebar;
