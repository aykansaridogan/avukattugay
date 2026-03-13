import { Trash2, Plus } from 'lucide-react';

interface SectorsEditorProps {
  data: any;
  updateSection: (newData: any) => void;
}

const SectorsEditor = ({ data, updateSection }: SectorsEditorProps) => {
  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    updateSection({ ...data, items: newItems });
  };

  const addItem = () => {
    const newItem = { name: 'Yeni Sektör', icon: 'Construction' };
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
          <h3 style={{ fontSize: '1.2rem' }}>Sektör Listesi</h3>
          <button onClick={addItem} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={16} /> Yeni Sektör
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {data.items.map((item: any, index: number) => (
            <div key={index} className="glass" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', position: 'relative' }}>
              <button
                onClick={() => removeItem(index)}
                style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', color: '#ff4d4d', background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <Trash2 size={16} />
              </button>

              <div style={{ display: 'grid', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Sektör Adı</label>
                  <input
                    className="form-control"
                    value={item.name}
                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>İkon Kodu (Lucide)</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      className="form-control"
                      value={item.icon}
                      placeholder="Construction, Bank, Zap..."
                      onChange={(e) => updateItem(index, 'icon', e.target.value)}
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

export default SectorsEditor;
