interface AboutEditorProps {
  data: any;
  updateField: (field: string, value: any) => void;
}

const AboutEditor = ({ data, updateField }: AboutEditorProps) => {
  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <div className="form-group">
        <label className="form-label">Başlık</label>
        <input 
          className="form-control" 
          value={data.title} 
          onChange={(e) => updateField('title', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Paragraf 1</label>
        <textarea 
          className="form-control" 
          rows={4}
          value={data.p1} 
          onChange={(e) => updateField('p1', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Paragraf 2</label>
        <textarea 
          className="form-control" 
          rows={4}
          value={data.p2} 
          onChange={(e) => updateField('p2', e.target.value)}
        />
      </div>
    </div>
  );
};

export default AboutEditor;
