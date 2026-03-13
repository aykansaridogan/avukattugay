import { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Briefcase, FileText, Mail, Globe, Share2, ShieldCheck, Lock, User, Calendar } from 'lucide-react';

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
import CalendarView from './dashboard/CalendarView';
import SecurityEditor from './dashboard/SecurityEditor';
import SectorsEditor from './dashboard/SectorsEditor';
import FAQEditor from './dashboard/FAQEditor';
import AnnouncementEditor from './dashboard/AnnouncementEditor';
import SEOEditor from './dashboard/SEOEditor';
import LegalEditor from './dashboard/LegalEditor';

const Dashboard = () => {
  const { content, setContent } = useContent();
  const [activeTab, setActiveTab] = useState('messages');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const updateField = (section: string, field: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const groups = [
    {
      title: 'YÖNETİM',
      items: [
        { id: 'messages', name: 'Gelen Talepler', icon: <Mail size={18} /> },
        { id: 'calendar', name: 'Takvim Görünümü', icon: <Calendar size={18} /> },
        { id: 'articles', name: 'Makale Yönetimi', icon: <FileText size={18} /> },
        { id: 'reviews', name: 'Değerlendirmeler', icon: <Share2 size={18} /> }
      ]
    },
    {
      title: 'SAYFA DÜZENLEME',
      items: [
        { id: 'hero', name: 'Hero (Giriş)', icon: <Layout size={18} /> },
        { id: 'about', name: 'Hakkımda', icon: <User size={18} /> },
        { id: 'services', name: 'Hizmetler', icon: <Briefcase size={18} /> },
        { id: 'sectors', name: 'Sektörler', icon: <Layout size={18} /> },
        { id: 'faq', name: 'Sıkça Sorulanlar', icon: <Globe size={18} /> },
        { id: 'announcement', name: 'Duyuru Panosu', icon: <Globe size={18} /> }
      ]
    },
    {
      title: 'SEO & İLETİŞİM',
      items: [
        { id: 'seo', name: 'SEO & Meta', icon: <Globe size={18} /> },
        { id: 'contact', name: 'İletişim Ayarları', icon: <Mail size={18} /> }
      ]
    },
    {
      title: 'SİSTEM & HUKUK',
      items: [
        { id: 'legal', name: 'Hukuki Metinler', icon: <ShieldCheck size={18} /> },
        { id: 'security', name: 'Güvenlik Ayarları', icon: <Lock size={18} /> }
      ]
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'messages': return <SubmissionsView />;
      case 'calendar': return <CalendarView />;
      case 'articles': return <ArticlesEditor data={content.articles} updateSection={(v) => updateField('articles', '', v)} />;
      case 'reviews': return <ReviewsEditor data={content.reviews} updateSection={(v) => updateField('reviews', '', v)} />;
      case 'hero': return <HeroEditor data={content.hero} updateField={(f, v) => updateField('hero', f, v)} />;
      case 'about': return <AboutEditor data={content.about} updateField={(f, v) => updateField('about', f, v)} />;
      case 'services': return <ServicesEditor data={content.services} updateSection={(v) => updateField('services', '', v)} />;
      case 'sectors': return <SectorsEditor data={content.sectors} updateSection={(v) => updateField('sectors', '', v)} />;
      case 'faq': return <FAQEditor data={content.faq} updateSection={(v) => updateField('faq', '', v)} />;
      case 'announcement': return <AnnouncementEditor data={content.announcement} updateSection={(v) => updateField('announcement', '', v)} />;
      case 'seo': return <SEOEditor data={content.seo} updateField={(f, v) => updateField('seo', f, v)} />;
      case 'contact': return <ContactEditor data={content.contact} updateField={(f, v) => updateField('contact', f, v)} />;
      case 'legal': return <LegalEditor data={content.legal} updateSection={(sec, f, v) => {
        setContent((prev: any) => ({
          ...prev,
          legal: { ...prev.legal, [sec]: { ...prev.legal[sec], [f]: v } }
        }));
      }} />;
      case 'security': return <SecurityEditor />;
      default: return <SubmissionsView />;
    }
  };

  const activeTabName = groups.flatMap(g => g.items).find(t => t.id === activeTab)?.name || '';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'white', display: 'flex' }}>
      <Sidebar 
        groups={groups} 
        activeTab={activeTab} 
        setActiveTab={(id) => {
          setActiveTab(id);
          setIsSidebarOpen(false);
        }} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div style={{ flex: 1, padding: 'clamp(1rem, 5vw, 3rem)', minWidth: 0, marginLeft: '280px' }} className="dashboard-content-wrapper">
        <Header 
          title={activeTabName} 
          onSave={() => alert('Otomatik Kaydedildi')}
          onToggleSidebar={() => setIsSidebarOpen(true)}
        />

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="glass"
            style={{ padding: 'clamp(1rem, 5vw, 3rem)', borderRadius: '16px' }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
