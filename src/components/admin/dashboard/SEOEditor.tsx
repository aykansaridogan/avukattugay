import { Globe, Search, Share2 } from 'lucide-react';

interface SEOEditorProps {
  data: any;
  updateField: (field: string, value: any) => void;
}

const SEOEditor = ({ data, updateField }: SEOEditorProps) => {
  return (
    <div style={{ display: 'grid', gap: '2.5rem' }}>
      {/* Search Engine Optimization */}
      <div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '10px', borderRadius: '10px', color: '#4ade80' }}>
            <Search size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem' }}>Arama Motoru Ayarları (SEO)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sitenizin Google ve diğer arama motorlarında nasıl görüneceğini belirleyin.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Sayfa Başlığı (Title Tag)</label>
            <input
              className="form-control"
              value={data.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Örn: Av. Tugay Kayhan | İstanbul Hukuk Bürosu"
            />
            <small style={{ color: 'var(--text-muted)', marginTop: '0.5rem', display: 'block' }}>
              İdeal uzunluk: 50-60 karakter. Şu an: {data.title?.length || 0}
            </small>
          </div>

          <div className="form-group">
            <label className="form-label">Meta Açıklaması (Description)</label>
            <textarea
              className="form-control"
              rows={3}
              value={data.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Sitenizi özetleyen kısa bir metin yazın..."
            />
            <small style={{ color: 'var(--text-muted)', marginTop: '0.5rem', display: 'block' }}>
              İdeal uzunluk: 150-160 karakter. Şu an: {data.description?.length || 0}
            </small>
          </div>

          <div className="form-group">
            <label className="form-label">Anahtar Kelimeler (Keywords)</label>
            <input
              className="form-control"
              value={data.keywords}
              onChange={(e) => updateField('keywords', e.target.value)}
              placeholder="Örn: istanbul avukat, ceza hukuku, boşanma davası..."
            />
            <small style={{ color: 'var(--text-muted)', marginTop: '0.5rem', display: 'block' }}>
              Kelimeleri virgül ile ayırın.
            </small>
          </div>
        </div>
      </div>

      <div style={{ height: '1px', background: 'var(--border)' }}></div>

      {/* Social Media Sharing */}
      <div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(96, 165, 250, 0.1)', padding: '10px', borderRadius: '10px', color: '#60a5fa' }}>
            <Share2 size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem' }}>Sosyal Medya Görünümü (Open Graph)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>WhatsApp, Facebook veya Twitter'da paylaşıldığında görünecek bilgiler.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Paylaşım Görseli URL</label>
            <input
              className="form-control"
              value={data.ogImage}
              onChange={(e) => updateField('ogImage', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Yazar</label>
            <input
              className="form-control"
              value={data.author}
              onChange={(e) => updateField('author', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Previews Container */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Google Preview Simulation */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={14} /> Google Önizleme
          </h4>
          <div style={{ fontFamily: 'arial, sans-serif' }}>
            <div style={{ color: '#8ab4f8', fontSize: '18px', marginBottom: '4px', textDecoration: 'none', cursor: 'pointer', fontWeight: 400 }}>
              {data.title || 'Sitede Başlık Bulunamadı'}
            </div>
            <div style={{ color: '#bdc1c6', fontSize: '14px', lineHeight: '1.5', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
               {data.description || 'Sitede açıklama belirtilmemiş. Arama motorları sayfa içinden rastgele bir metini buraya çekecektir.'}
            </div>
          </div>
        </div>

        {/* Social Media Preview Simulation */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Share2 size={14} /> Sosyal Medya Önizleme (WhatsApp/FB)
          </h4>
          <div style={{ background: '#1e1e1e', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333', maxWidth: '500px' }}>
            <div style={{ height: '250px', background: `url(${data.ogImage}) center/contain no-repeat`, backgroundColor: '#fff' }}></div>
            <div style={{ padding: '12px', borderTop: '1px solid #333' }}>
              <div style={{ color: '#888', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                {window.location.hostname}
              </div>
              <div style={{ color: '#e4e6eb', fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
                {data.title}
              </div>
              <div style={{ color: '#b0b3b8', fontSize: '13px', lineHeight: '1.4', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {data.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOEditor;
