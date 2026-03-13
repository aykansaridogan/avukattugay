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
          <h3 style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', margin: 0 }}>Makale Listesi</h3>
          <button onClick={addItem} className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'auto' }}>
            <Plus size={16} /> <span className="desktop-only text-nowrap">Yeni Makale</span><span className="mobile-only">Ekle</span>
          </button>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {data.items.map((item: any, index: number) => {
            const method = uploadMethods[index] || 'url';
            const isExpanded = expandedIndex === index;
            
            return (
              <div key={index} style={{ background: 'rgba(255,255,255,0.03)', padding: 'clamp(1rem, 4vw, 1.5rem)', borderRadius: '12px', border: '1px solid var(--border)', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <button 
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    style={{ background: 'rgba(197, 160, 89, 0.1)', color: 'var(--primary)', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600 }}
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    <span>{isExpanded ? 'Düzenlemeyi Kapat' : 'İçeriği Düzenle'}</span>
                  </button>
                  <button 
                    onClick={() => removeItem(index)}
                    style={{ color: '#ff4d4d', background: 'rgba(255,77,77,0.1)', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div style={{ display: 'grid', gap: '2rem' }} className="grid-mobile-1">
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 250px) 1fr', gap: 'clamp(1rem, 5vw, 2rem)' }} className="grid-mobile-1">
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      <div style={{ width: '100%', height: '160px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', background: '#000' }}>
                        <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      
                      <div style={{ display: 'flex', background: 'var(--bg-dark)', borderRadius: '8px', padding: '4px', gap: '4px' }}>
                        <button 
                          onClick={() => toggleMethod(index, 'url')}
                          style={{ 
                            flex: 1, padding: '8px', borderRadius: '6px', fontSize: '0.7rem', 
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
                            flex: 1, padding: '8px', borderRadius: '6px', fontSize: '0.7rem',
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
                            placeholder="Resim URL"
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
                            <button className="btn-secondary" style={{ width: '100%', fontSize: '0.75rem', padding: '10px' }}>
                              <Upload size={14} style={{ marginRight: '8px', display: 'inline' }} />
                              Seç
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gap: '1.25rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
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

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isExpanded ? 'var(--primary)' : 'var(--text-muted)', fontSize: '0.8rem' }}>
                          <FileText size={16} />
                          <span>{item.content?.length || 0} Blok</span>
                        </div>
                        
                        <button 
                          onClick={() => updateItem(index, 'status', item.status === 'published' ? 'draft' : 'published')}
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem', 
                            padding: '6px 14px', 
                            borderRadius: '20px', 
                            fontSize: '0.65rem', 
                            fontWeight: 800,
                            border: '1px solid',
                            borderColor: item.status === 'published' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                            cursor: 'pointer',
                            background: item.status === 'published' ? 'rgba(74, 222, 128, 0.05)' : 'transparent',
                            color: item.status === 'published' ? '#4ade80' : 'var(--text-muted)'
                          }}
                        >
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.status === 'published' ? '#4ade80' : 'var(--text-muted)' }}></div>
                          {item.status === 'published' ? 'YAYINDA' : 'TASLAK'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                      <ArticleContentEditor 
                        blocks={item.content || []} 
                        onChange={(newBlocks) => updateItem(index, 'content', newBlocks)}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArticlesEditor;
