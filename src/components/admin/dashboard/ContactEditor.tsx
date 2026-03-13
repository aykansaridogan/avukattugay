import { Trash2 } from 'lucide-react';

interface ContactEditorProps {
  data: any;
  updateField: (field: string, value: any) => void;
}

const ContactEditor = ({ data, updateField }: ContactEditorProps) => {
  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <div style={{ display: 'grid', gap: '1rem' }} className="grid-mobile-1">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Üst Rozet (Badge)</label>
            <input 
              className="form-control" 
              value={data.badge} 
              onChange={(e) => updateField('badge', e.target.value)}
              style={{ fontSize: '0.9rem' }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Başlık</label>
            <input 
              className="form-control" 
              value={data.title} 
              onChange={(e) => updateField('title', e.target.value)}
              style={{ fontSize: '0.9rem' }}
            />
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label className="form-label">Açıklama</label>
        <textarea 
          className="form-control" 
          rows={3}
          value={data.description} 
          onChange={(e) => updateField('description', e.target.value)}
          style={{ fontSize: '0.9rem', lineHeight: 1.5 }}
        />
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }} className="grid-mobile-1">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Telefon</label>
            <input 
              className="form-control" 
              value={data.phone} 
              onChange={(e) => updateField('phone', e.target.value)}
              style={{ fontSize: '0.9rem' }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">E-Posta</label>
            <input 
              className="form-control" 
              value={data.email} 
              onChange={(e) => updateField('email', e.target.value)}
              style={{ fontSize: '0.9rem' }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Adres</label>
            <input 
              className="form-control" 
              value={data.address} 
              onChange={(e) => updateField('address', e.target.value)}
              style={{ fontSize: '0.9rem' }}
            />
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--primary)', fontWeight: 700 }}>Sosyal Medya Linkleri</h4>
        <div style={{ display: 'grid', gap: '1.5rem' }} className="grid-mobile-1">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Instagram</label>
              <input 
                className="form-control" 
                value={data.socials?.instagram || ''} 
                onChange={(e) => updateField('socials', { ...data.socials, instagram: e.target.value })}
                placeholder="https://..."
                style={{ fontSize: '0.9rem' }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">LinkedIn</label>
              <input 
                className="form-control" 
                value={data.socials?.linkedin || ''} 
                onChange={(e) => updateField('socials', { ...data.socials, linkedin: e.target.value })}
                placeholder="https://..."
                style={{ fontSize: '0.9rem' }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Twitter / X</label>
              <input 
                className="form-control" 
                value={data.socials?.twitter || ''} 
                onChange={(e) => updateField('socials', { ...data.socials, twitter: e.target.value })}
                placeholder="https://..."
                style={{ fontSize: '0.9rem' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--primary)', fontWeight: 700 }}>Randevu Kategorileri</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {data.appointmentCategories?.map((cat: string, index: number) => (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: 'rgba(197, 160, 89, 0.1)', 
              padding: '6px 14px', 
              borderRadius: '20px',
              border: '1px solid rgba(197, 160, 89, 0.2)'
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{cat}</span>
              <button 
                onClick={() => {
                  const newCats = data.appointmentCategories.filter((_: any, i: number) => i !== index);
                  updateField('appointmentCategories', newCats);
                }}
                style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', display: 'flex', padding: 0 }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input 
            id="new-cat-input"
            className="form-control" 
            placeholder="Yeni kategori adı..."
            style={{ flex: 1, minWidth: '200px', fontSize: '0.9rem' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = (e.currentTarget as HTMLInputElement).value;
                if (val) {
                  updateField('appointmentCategories', [...(data.appointmentCategories || []), val]);
                  (e.currentTarget as HTMLInputElement).value = '';
                }
              }
            }}
          />
          <button 
            type="button"
            className="btn-primary" 
            style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem', width: 'auto' }}
            onClick={() => {
              const input = document.getElementById('new-cat-input') as HTMLInputElement;
              if (input.value) {
                updateField('appointmentCategories', [...(data.appointmentCategories || []), input.value]);
                input.value = '';
              }
            }}
          >
            Ekle
          </button>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', opacity: 0.7 }}>
          İpucu: Enter tuşuyla da hızlıca kategori ekleyebilirsiniz.
        </p>
      </div>
    </div>
  );
};

export default ContactEditor;
