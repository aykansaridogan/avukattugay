import { Trash2, Plus, Info } from 'lucide-react';

interface ServicesEditorProps {
  data: any;
  updateSection: (newData: any) => void;
}

const ServicesEditor = ({ data, updateSection }: ServicesEditorProps) => {
  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    updateSection({ ...data, items: newItems });
  };

  const addItem = () => {
    const newItem = { icon: 'Scale', title: 'Yeni Hizmet', desc: 'Hizmet açıklaması buraya gelecek.' };
    updateSection({ ...data, items: [...data.items, newItem] });
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_: any, i: number) => i !== index);
    updateSection({ ...data, items: newItems });
  };

  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <div style={{ display: 'grid', gap: '1rem' }} className="grid-mobile-1">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Bölüm Rozeti</label>
            <input 
              className="form-control" 
              value={data.badge} 
              onChange={(e) => updateSection({ ...data, badge: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Ana Başlık</label>
            <input 
              className="form-control" 
              value={data.title} 
              onChange={(e) => updateSection({ ...data, title: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', margin: 0 }}>Hizmet Listesi</h3>
          <button onClick={addItem} className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'auto' }}>
            <Plus size={16} /> <span className="desktop-only text-nowrap">Yeni Ekle</span><span className="mobile-only">Ekle</span>
          </button>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {data.items.map((item: any, index: number) => (
            <div key={index} style={{ 
              background: 'rgba(255,255,255,0.03)', 
              padding: 'clamp(1rem, 4vw, 1.5rem)', 
              borderRadius: '16px', 
              border: '1px solid var(--border)', 
              position: 'relative',
              overflow: 'hidden'
            }}>
              <button 
                onClick={() => removeItem(index)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#ff4d4d', background: 'rgba(255,77,77,0.1)', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', zIndex: 1 }}
              >
                <Trash2 size={16} />
              </button>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 150px) 1fr', gap: 'clamp(1rem, 5vw, 2rem)', marginTop: '0.5rem' }} className="grid-mobile-1">
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">İkon (Lucide)</label>
                    <input 
                      className="form-control" 
                      value={item.icon} 
                      onChange={(e) => updateItem(index, 'icon', e.target.value)}
                      style={{ fontSize: '0.9rem' }}
                    />
                    <small style={{ color: 'var(--text-muted)', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem', opacity: 0.8 }}>
                      <Info size={12} /> Scale, Briefcase...
                    </small>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label">Hizmet Başlığı</label>
                    <input 
                      className="form-control" 
                      value={item.title} 
                      onChange={(e) => updateItem(index, 'title', e.target.value)}
                      style={{ fontSize: '0.95rem', fontWeight: 600 }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Açıklama</label>
                    <textarea 
                      className="form-control" 
                      rows={3}
                      value={item.desc} 
                      onChange={(e) => updateItem(index, 'desc', e.target.value)}
                      style={{ fontSize: '0.9rem', lineHeight: 1.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesEditor;
