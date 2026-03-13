import { Shield, FileWarning, Eye } from 'lucide-react';

interface LegalEditorProps {
  data: any;
  updateSection: (section: string, field: string, value: any) => void;
}

const LegalEditor = ({ data, updateSection }: LegalEditorProps) => {
  const sections = [
    { id: 'kvkk', name: 'KVKK Aydınlatma Metni', icon: <Shield size={18} /> },
    { id: 'privacy', name: 'Gizlilik Politikası', icon: <Eye size={18} /> },
    { id: 'terms', name: 'Kullanım Şartları', icon: <FileWarning size={18} /> }
  ];

  return (
    <div style={{ display: 'grid', gap: '2.5rem' }}>
      {sections.map((sec) => (
        <div key={sec.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(197, 160, 89, 0.1)', padding: '10px', borderRadius: '10px', color: 'var(--primary)' }}>
              {sec.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>{sec.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Alt kısımdaki bağlantılara tıklandığında açılan metin.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Başlık</label>
              <input
                className="form-control"
                value={data[sec.id]?.title}
                onChange={(e) => updateSection(sec.id, 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">İçerik</label>
              <textarea
                className="form-control"
                rows={10}
                value={data[sec.id]?.content}
                onChange={(e) => updateSection(sec.id, 'content', e.target.value)}
                style={{ fontSize: '0.9rem', lineHeight: '1.6' }}
              />
              <small style={{ color: 'var(--text-muted)', marginTop: '0.5rem', display: 'block' }}>
                Satır atlamalar (Enter) sitede korunacaktır.
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LegalEditor;
