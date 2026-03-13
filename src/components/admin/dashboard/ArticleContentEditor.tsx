import { Trash2, ChevronUp, ChevronDown } from 'lucide-react';

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
    <div style={{ 
      marginTop: '1rem', 
      padding: '0.75rem', 
      background: 'rgba(0,0,0,0.3)', 
      borderRadius: '12px', 
      border: '1px solid var(--border)',
      width: '100%'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1rem',
        gap: '0.5rem'
      }}>
        <h4 style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, margin: 0 }}>İçerik Blokları</h4>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button onClick={() => addBlock('heading')} className="btn-secondary" style={{ padding: '5px 8px', fontSize: '0.65rem', background: 'var(--primary)', color: 'var(--bg-dark)', border: 'none', borderRadius: '4px', fontWeight: 800 }}>+ BAŞLIK</button>
          <button onClick={() => addBlock('paragraph')} className="btn-secondary" style={{ padding: '5px 8px', fontSize: '0.65rem', background: 'var(--primary)', color: 'var(--bg-dark)', border: 'none', borderRadius: '4px', fontWeight: 800 }}>+ METİN</button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {blocks.map((block, index) => (
          <div key={index} style={{ 
            background: 'rgba(255,255,255,0.02)', 
            padding: '0.75rem', 
            borderRadius: '10px', 
            border: '1px solid rgba(255,255,255,0.1)',
            width: '100%'
          }}>
            {/* Minimal Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '4px 8px', borderRadius: '6px' }}>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button onClick={() => moveBlock(index, 'up')} disabled={index === 0} style={{ padding: '4px', background: 'transparent', border: 'none', color: 'var(--primary)', opacity: index === 0 ? 0.2 : 1 }}><ChevronUp size={16} /></button>
                <button onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1} style={{ padding: '4px', background: 'transparent', border: 'none', color: 'var(--primary)', opacity: index === blocks.length - 1 ? 0.2 : 1 }}><ChevronDown size={16} /></button>
              </div>
              <button 
                onClick={() => removeBlock(index)} 
                style={{ padding: '4px', color: '#ff4d4d', background: 'transparent', border: 'none' }}
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Full Width Input Area */}
            {block.type === 'heading' && (
              <input 
                className="form-control" 
                placeholder="Başlık..." 
                style={{ fontSize: '0.9rem', padding: '10px', width: '100%' }}
                value={block.value}
                onChange={(e) => updateBlock(index, e.target.value)}
              />
            )}
            {block.type === 'paragraph' && (
              <textarea 
                className="form-control" 
                rows={4} 
                placeholder="Metin..." 
                style={{ fontSize: '0.85rem', padding: '10px', width: '100%', lineHeight: 1.5 }}
                value={block.value}
                onChange={(e) => updateBlock(index, e.target.value)}
              />
            )}
            {block.type === 'image' && (
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <input 
                  className="form-control" 
                  placeholder="Görsel URL..." 
                  style={{ fontSize: '0.85rem', padding: '10px', width: '100%' }}
                  value={block.value}
                  onChange={(e) => updateBlock(index, e.target.value)}
                />
                {block.value && (
                  <img src={block.value} alt="" style={{ width: '100%', borderRadius: '8px' }} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {blocks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Henüz içerik bloğu eklenmemiş. Yukarıdaki butonlarla içerik eklemeye başlayın.
        </div>
      )}
    </div>
  );
};

export default ArticleContentEditor;
