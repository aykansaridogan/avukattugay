interface HeroEditorProps {
  data: any;
  updateField: (field: string, value: any) => void;
}

const HeroEditor = ({ data, updateField }: HeroEditorProps) => {
  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <div className="form-group">
        <label className="form-label">Üst Rozet (Badge)</label>
        <input 
          className="form-control" 
          value={data.badge} 
          onChange={(e) => updateField('badge', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Başlık</label>
        <input 
          className="form-control" 
          value={data.title} 
          onChange={(e) => updateField('title', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Açıklama</label>
        <textarea 
          className="form-control" 
          rows={4}
          value={data.description} 
          onChange={(e) => updateField('description', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Arka Plan Resim URL</label>
        <input 
          className="form-control" 
          value={data.bgImage} 
          onChange={(e) => updateField('bgImage', e.target.value)}
        />
      </div>
    </div>
  );
};

export default HeroEditor;
