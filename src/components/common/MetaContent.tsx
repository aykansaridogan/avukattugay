import { Helmet } from 'react-helmet-async';
import { useContent } from '../../context/ContentContext';

const MetaContent = () => {
  const { content } = useContent();
  const { seo } = content;

  if (!seo) return null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={seo.author} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.ogType || 'website'} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:url" content={window.location.href} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.ogImage} />

      {/* Language Meta */}
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
};

export default MetaContent;
