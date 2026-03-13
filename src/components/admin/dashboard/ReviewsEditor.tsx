import { Trash2, Plus } from 'lucide-react';

interface ReviewsEditorProps {
  data: any;
  updateSection: (newData: any) => void;
}

const ReviewsEditor = ({ data, updateSection }: ReviewsEditorProps) => {
  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    updateSection({ ...data, items: newItems });
  };

  const addItem = () => {
    const newItem = { 
      name: 'Yeni Müvekkil', 
      role: 'Müvekkil', 
      text: 'Yeni bir değerlendirme buraya gelecek.',
      rating: 5
    };
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
          <h3 style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', margin: 0 }}>Değerlendirmeler</h3>
          <button onClick={addItem} className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'auto' }}>
            <Plus size={16} /> <span className="desktop-only text-nowrap">Yeni Ekle</span><span className="mobile-only">Ekle</span>
          </button>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {data.items.map((review: any, index: number) => (
            <div key={index} style={{ 
              background: 'rgba(255,255,255,0.03)', 
              padding: 'clamp(1rem, 4vw, 1.5rem)', 
              borderRadius: '16px', 
              border: '1px solid var(--border)', 
              position: 'relative' 
            }}>
              <button 
                onClick={() => removeItem(index)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#ff4d4d', background: 'rgba(255,77,77,0.1)', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
              >
                <Trash2 size={16} />
              </button>
              
              <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ display: 'grid', gap: '1rem' }} className="grid-mobile-1">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-mobile-1">
                    <div className="form-group">
                      <label className="form-label">Ad Soyad</label>
                      <input 
                        className="form-control" 
                        value={review.name} 
                        onChange={(e) => updateItem(index, 'name', e.target.value)}
                        style={{ fontSize: '0.9rem' }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Unvan/Rol</label>
                      <input 
                        className="form-control" 
                        value={review.role} 
                        onChange={(e) => updateItem(index, 'role', e.target.value)}
                        style={{ fontSize: '0.9rem' }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Puan</label>
                    <select 
                      className="form-control" 
                      value={review.rating} 
                      onChange={(e) => updateItem(index, 'rating', parseInt(e.target.value))}
                      style={{ fontSize: '0.9rem' }}
                    >
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Yıldız</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Değerlendirme Metni</label>
                  <textarea 
                    className="form-control" 
                    rows={3}
                    value={review.text} 
                    onChange={(e) => updateItem(index, 'text', e.target.value)}
                    style={{ fontSize: '0.9rem', lineHeight: 1.5 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsEditor;
