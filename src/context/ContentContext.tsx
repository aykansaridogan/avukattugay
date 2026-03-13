import { createContext, useContext, useState, type ReactNode } from 'react';
import { initialContent } from '../data/siteContent';

const ContentContext = createContext<any>(null);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('siteContent');
    const savedData = saved ? JSON.parse(saved) : {};
    
    // Deep merge initialContent with savedData
    const finalContent = {
      ...initialContent,
      ...savedData,
      contact: {
        ...initialContent.contact,
        ...(savedData.contact || {})
      },
      seo: {
        ...initialContent.seo,
        ...(savedData.seo || {})
      },
      articles: {
        ...initialContent.articles,
        ...(savedData.articles || {}),
        items: (savedData.articles?.items || initialContent.articles.items).map((item: any, idx: number) => {
          const initialItem = initialContent.articles.items[idx];
          return {
            ...initialItem, // Get all new fields like 'content'
            ...item // Override with saved user changes if they exist
          };
        })
      }
    };
    return finalContent;
  });

  const updateContent = (newContent: any) => {
    setContent(newContent);
    localStorage.setItem('siteContent', JSON.stringify(newContent));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
