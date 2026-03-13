import { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Type, Briefcase, FileText, Star, Mail, Grip, MessageCircle, Bell, Globe } from 'lucide-react';

// Sub-components
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';
import HeroEditor from './dashboard/HeroEditor';
import AboutEditor from './dashboard/AboutEditor';
import ServicesEditor from './dashboard/ServicesEditor';
import ArticlesEditor from './dashboard/ArticlesEditor';
import ReviewsEditor from './dashboard/ReviewsEditor';
import ContactEditor from './dashboard/ContactEditor';
import SubmissionsView from './dashboard/SubmissionsView';
import SecurityEditor from './dashboard/SecurityEditor';
import SectorsEditor from './dashboard/SectorsEditor';
import FAQEditor from './dashboard/FAQEditor';
import AnnouncementEditor from './dashboard/AnnouncementEditor';
import SEOEditor from './dashboard/SEOEditor';


const Dashboard = () => {
  const { content, updateContent } = useContent();
  const [tempContent, setTempContent] = useState(content);
  const [activeTab, setActiveTab] = useState('hero');
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    const subs = JSON.parse(localStorage.getItem('form_submissions') || '[]');
    setSubmissionCount(subs.length);
  }, [activeTab]);

  const handleSave = () => {
    updateContent(tempContent);
    alert('İçerik başarıyla güncellendi!');
  };

  const updateField = (section: string, field: string, value: any) => {
    setTempContent({
      ...tempContent,
      [section]: {
        ...tempContent[section],
        [field]: value
      }
    });
  };

  const groups = [
    {
      title: 'SİTE İÇERİĞİ',
      items: [
        { id: 'hero', name: 'Giriş (Hero)', icon: <Layout size={18} /> },
        { id: 'about', name: 'Hakkımda', icon: <Type size={18} /> },
        { id: 'services', name: 'Çalışma Alanları', icon: <Briefcase size={18} /> },
        { id: 'sectors', name: 'Sektörler', icon: <Grip size={18} /> },
        { id: 'faq', name: 'Sıkça Sorulanlar', icon: <MessageCircle size={18} /> },
      ]
    },
    {
      title: 'PAYLAŞIMLAR',
      items: [
        { id: 'articles', name: 'Makaleler', icon: <FileText size={18} /> },
        { id: 'reviews', name: 'Değerlendirmeler', icon: <Star size={18} /> },
        { id: 'announcement', name: 'Duyuru Panosu', icon: <Bell size={18} /> },
      ]
    },
    {
      title: 'YÖNETİM',
      items: [
        { id: 'messages', name: 'Gelen Talepler', icon: <Mail size={18} />, badge: submissionCount },
        { id: 'contact', name: 'İletişim Ayarları', icon: <Mail size={18} /> },
        { id: 'seo', name: 'SEO & Meta Ayarları', icon: <Globe size={18} /> },
        { id: 'security', name: 'Güvenlik Ayarları', icon: <Briefcase size={18} /> },
      ]
    }
  ];

  const activeTabName = groups.flatMap(g => g.items).find(t => t.id === activeTab)?.name || '';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'white' }}>
      <Sidebar 
        groups={groups} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <div style={{ marginLeft: '280px', padding: '3rem' }}>
        <Header 
          title={activeTabName} 
          onSave={handleSave} 
        />

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass"
            style={{ padding: '3rem', borderRadius: '16px' }}
          >
            {activeTab === 'hero' && (
              <HeroEditor 
                data={tempContent.hero} 
                updateField={(field, val) => updateField('hero', field, val)} 
              />
            )}

            {activeTab === 'about' && (
              <AboutEditor 
                data={tempContent.about} 
                updateField={(field, val) => updateField('about', field, val)} 
              />
            )}

            {activeTab === 'services' && (
              <ServicesEditor 
                data={tempContent.services} 
                updateSection={(newData) => setTempContent({ ...tempContent, services: newData })}
              />
            )}

            {activeTab === 'articles' && (
              <ArticlesEditor 
                data={tempContent.articles} 
                updateSection={(newData) => setTempContent({ ...tempContent, articles: newData })}
              />
            )}

            {activeTab === 'reviews' && (
              <ReviewsEditor 
                data={tempContent.reviews} 
                updateSection={(newData) => setTempContent({ ...tempContent, reviews: newData })}
              />
            )}

            {activeTab === 'contact' && (
              <ContactEditor 
                data={tempContent.contact} 
                updateField={(field, val) => updateField('contact', field, val)}
              />
            )}

            {activeTab === 'messages' && (
              <SubmissionsView />
            )}

            {activeTab === 'security' && (
              <SecurityEditor />
            )}

            {activeTab === 'sectors' && (
              <SectorsEditor data={tempContent.sectors} updateSection={(ext) => setTempContent({...tempContent, sectors: ext})} />
            )}

            {activeTab === 'faq' && (
              <FAQEditor data={tempContent.faq} updateSection={(ext) => setTempContent({...tempContent, faq: ext})} />
            )}

            {activeTab === 'announcement' && (
              <AnnouncementEditor data={tempContent.announcement} updateSection={(ext) => setTempContent({...tempContent, announcement: ext})} />
            )}

            {activeTab === 'seo' && (
              <SEOEditor 
                data={tempContent.seo} 
                updateField={(field, val) => updateField('seo', field, val)} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;

