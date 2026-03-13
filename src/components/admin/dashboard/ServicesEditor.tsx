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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
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

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem' }}>Hizmet Listesi</h3>
          <button onClick={addItem} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={16} /> Yeni Ekle
          </button>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {data.items.map((item: any, index: number) => (
            <div key={index} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', position: 'relative' }}>
              <button 
                onClick={() => removeItem(index)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#ff4d4d', background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <Trash2 size={18} />
              </button>
              
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">İkon (Lucide)</label>
                  <input 
                    className="form-control" 
                    value={item.icon} 
                    onChange={(e) => updateItem(index, 'icon', e.target.value)}
                  />
                  <small style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.4rem' }}>
                    <Info size={12} /> Scale, Briefcase, etc.
                  </small>
                </div>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Hizmet Başlığı</label>
                    <input 
                      className="form-control" 
                      value={item.title} 
                      onChange={(e) => updateItem(index, 'title', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Açıklama</label>
                    <textarea 
                      className="form-control" 
                      rows={2}
                      value={item.desc} 
                      onChange={(e) => updateItem(index, 'desc', e.target.value)}
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
