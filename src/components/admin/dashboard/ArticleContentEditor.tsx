import { Trash2, Plus, GripVertical, Type, Heading1, Image as ImageIcon } from 'lucide-react';

interface ContentBlock {
  type: 'paragraph' | 'heading' | 'image';
  value: string;
}

interface ArticleContentEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

const ArticleContentEditor = ({ blocks = [], onChange }: ArticleContentEditorProps) => {
  const addBlock = (type: 'paragraph' | 'heading' | 'image') => {
    const newBlocks = [...blocks, { type, value: '' }];
    onChange(newBlocks);
  };

  const removeBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    onChange(newBlocks);
  };

  const updateBlock = (index: number, value: string) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], value };
    onChange(newBlocks);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < blocks.length) {
      [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
      onChange(newBlocks);
    }
  };

  return (
    <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px dashed var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '1rem', color: 'var(--primary)' }}>Makale Detay İçeriği</h4>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => addBlock('heading')} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--primary)', color: 'var(--bg-dark)' }}>
            <Heading1 size={14} /> Başlık Ekle
          </button>
          <button onClick={() => addBlock('paragraph')} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--primary)', color: 'var(--bg-dark)' }}>
            <Type size={14} /> Paragraf Ekle
          </button>
          <button onClick={() => addBlock('image')} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--primary)', color: 'var(--bg-dark)' }}>
            <ImageIcon size={14} /> Görsel Ekle
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {blocks.map((block, index) => (
          <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingTop: '8px' }}>
              <button onClick={() => moveBlock(index, 'up')} disabled={index === 0} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.3 : 1 }}>
                <Plus size={14} style={{ transform: 'rotate(45deg)' }} />
              </button>
              <GripVertical size={16} style={{ color: 'var(--border)' }} />
              <button onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: index === blocks.length - 1 ? 'default' : 'pointer', opacity: index === blocks.length - 1 ? 0.3 : 1 }}>
                <Plus size={14} />
              </button>
            </div>

            <div style={{ flex: 1 }}>
              {block.type === 'heading' && (
                <input 
                  className="form-control" 
                  placeholder="Alt Başlık Yazın..." 
                  style={{ fontWeight: 700, fontSize: '1.1rem' }}
                  value={block.value}
                  onChange={(e) => updateBlock(index, e.target.value)}
                />
              )}
              {block.type === 'paragraph' && (
                <textarea 
                  className="form-control" 
                  rows={3} 
                  placeholder="Paragraf metni yazın..." 
                  value={block.value}
                  onChange={(e) => updateBlock(index, e.target.value)}
                />
              )}
              {block.type === 'image' && (
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <input 
                    className="form-control" 
                    placeholder="Görsel URL'si yapıştırın..." 
                    value={block.value}
                    onChange={(e) => updateBlock(index, e.target.value)}
                  />
                  {block.value && (
                    <img src={block.value} alt="" style={{ height: '100px', width: 'auto', borderRadius: '4px', objectFit: 'contain' }} />
                  )}
                </div>
              )}
            </div>

            <button onClick={() => removeBlock(index)} style={{ padding: '8px', color: '#ff4d4d', background: 'transparent', border: 'none', cursor: 'pointer', marginTop: '4px' }}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
      
      {blocks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Henüz içerik bloğu eklenmemiş. Yukarıdaki butonlarla içerik eklemeye başlayın.
        </div>
      )}
    </div>
  );
};

export default ArticleContentEditor;
