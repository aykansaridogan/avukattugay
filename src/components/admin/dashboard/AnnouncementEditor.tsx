import { Bell, ExternalLink } from 'lucide-react';

interface AnnouncementEditorProps {
  data: any;
  updateSection: (newData: any) => void;
}

const AnnouncementEditor = ({ data, updateSection }: AnnouncementEditorProps) => {
  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(255, 215, 0, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--primary)' }}>
          <Bell size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem' }}>Duyuru Panosu</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sitenin en üstünde görünecek duyuruyu yönetin.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>Duyuru Durumu</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{data.active ? 'Şu an yayında' : 'Şu an kapalı'}</p>
          </div>
          <button 
            onClick={() => updateSection({ ...data, active: !data.active })}
            style={{ 
              width: '50px', 
              height: '26px', 
              borderRadius: '13px', 
              background: data.active ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.3s'
            }}
          >
            <div style={{ 
              position: 'absolute', 
              top: '3px', 
              left: data.active ? '27px' : '3px',
              width: '20px', 
              height: '20px', 
              background: data.active ? 'var(--bg-dark)' : 'white',
              borderRadius: '50%',
              transition: 'all 0.3s'
            }}></div>
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Duyuru Metni</label>
          <textarea 
            className="form-control" 
            rows={2}
            value={data.text} 
            onChange={(e) => updateSection({ ...data, text: e.target.value })}
            placeholder="Örn: Yeni makalemiz yayında!..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Yönlendirme Linki (Opsiyonel)</label>
          <div style={{ position: 'relative' }}>
            <ExternalLink size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              className="form-control" 
              style={{ paddingLeft: '2.8rem' }}
              value={data.link} 
              onChange={(e) => updateSection({ ...data, link: e.target.value })}
              placeholder="#articles veya https://..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementEditor;
