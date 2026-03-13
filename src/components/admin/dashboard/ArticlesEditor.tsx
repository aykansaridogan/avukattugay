import { Trash2, Plus, Link as LinkIcon, Upload, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { useState } from 'react';
import ArticleContentEditor from './ArticleContentEditor';

interface ArticlesEditorProps {
  data: any;
  updateSection: (newData: any) => void;
}

const ArticlesEditor = ({ data, updateSection }: ArticlesEditorProps) => {
  const [uploadMethods, setUploadMethods] = useState<Record<number, 'url' | 'file'>>({});
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    updateSection({ ...data, items: newItems });
  };

  const addItem = () => {
    const newItem = { 
      title: 'Yeni Makale Başlığı', 
      category: 'Hukuk', 
      date: new Date().toLocaleDateString('tr-TR'),
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
      status: 'published',
      content: []
    };
    updateSection({ ...data, items: [newItem, ...data.items] });
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_: any, i: number) => i !== index);
    updateSection({ ...data, items: newItems });
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Resim boyutu 2MB\'dan küçük olmalıdır.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateItem(index, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleMethod = (index: number, method: 'url' | 'file') => {
    setUploadMethods(prev => ({ ...prev, [index]: method }));
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
          <h3 style={{ fontSize: '1.2rem' }}>Makale Listesi</h3>
          <button onClick={addItem} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={16} /> Yeni Makale
          </button>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {data.items.map((item: any, index: number) => {
            const method = uploadMethods[index] || 'url';
            const isExpanded = expandedIndex === index;
            
            return (
              <div key={index} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    style={{ background: 'rgba(255,215,0,0.1)', color: 'var(--primary)', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600 }}
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    {isExpanded ? 'Kapat' : 'İçeriği Düzenle'}
                  </button>
                  <button 
                    onClick={() => removeItem(index)}
                    style={{ color: '#ff4d4d', background: 'rgba(255,77,77,0.1)', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{ width: '100%', height: '140px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', background: '#000' }}>
                      <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    
                    <div style={{ display: 'flex', background: 'var(--bg-dark)', borderRadius: '8px', padding: '4px', gap: '4px' }}>
                      <button 
                        onClick={() => toggleMethod(index, 'url')}
                        style={{ 
                          flex: 1, padding: '6px', borderRadius: '6px', fontSize: '0.75rem', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                          background: method === 'url' ? 'var(--primary)' : 'transparent',
                          color: method === 'url' ? 'var(--bg-dark)' : 'white',
                          border: 'none', cursor: 'pointer'
                        }}
                      >
                        <LinkIcon size={14} /> URL
                      </button>
                      <button 
                        onClick={() => toggleMethod(index, 'file')}
                        style={{ 
                          flex: 1, padding: '6px', borderRadius: '6px', fontSize: '0.75rem',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                          background: method === 'file' ? 'var(--primary)' : 'transparent',
                          color: method === 'file' ? 'var(--bg-dark)' : 'white',
                          border: 'none', cursor: 'pointer'
                        }}
                      >
                        <Upload size={14} /> Dosya
                      </button>
                    </div>

                    <div className="form-group">
                      {method === 'url' ? (
                        <input 
                          className="form-control" 
                          placeholder="https://..."
                          style={{ fontSize: '0.8rem' }}
                          value={item.image.startsWith('data:') ? '' : item.image} 
                          onChange={(e) => updateItem(index, 'image', e.target.value)}
                        />
                      ) : (
                        <div style={{ position: 'relative' }}>
                          <input 
                            type="file" 
                            accept="image/*"
                            style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer', zIndex: 1 }}
                            onChange={(e) => handleFileChange(index, e)}
                          />
                          <button className="btn-secondary" style={{ width: '100%', fontSize: '0.8rem', padding: '8px' }}>
                            Resim Seç
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Kategori</label>
                        <input 
                          className="form-control" 
                          value={item.category} 
                          onChange={(e) => updateItem(index, 'category', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Tarih</label>
                        <input 
                          className="form-control" 
                          value={item.date} 
                          onChange={(e) => updateItem(index, 'date', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Makale Başlığı</label>
                      <input 
                        className="form-control" 
                        value={item.title} 
                        onChange={(e) => updateItem(index, 'title', e.target.value)}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isExpanded ? 'var(--primary)' : 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <FileText size={16} />
                        <span>{item.content?.length || 0} İçerik Bloğu</span>
                      </div>
                      
                      <button 
                        onClick={() => updateItem(index, 'status', item.status === 'published' ? 'draft' : 'published')}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.5rem', 
                          padding: '4px 12px', 
                          borderRadius: '20px', 
                          fontSize: '0.75rem', 
                          fontWeight: 700,
                          border: 'none',
                          cursor: 'pointer',
                          background: item.status === 'published' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                          color: item.status === 'published' ? '#4ade80' : 'var(--text-muted)'
                        }}
                      >
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.status === 'published' ? '#4ade80' : 'var(--text-muted)' }}></div>
                        {item.status === 'published' ? 'YAYINDA' : 'TASLAK'}
                      </button>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <ArticleContentEditor 
                    blocks={item.content || []} 
                    onChange={(newBlocks) => updateItem(index, 'content', newBlocks)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArticlesEditor;
