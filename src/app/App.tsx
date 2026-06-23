import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { FloatingButtons } from './components/FloatingButtons';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { AariPage } from './components/pages/AariPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { StoresPage } from './components/pages/StoresPage';
import { PatentsPage } from './components/pages/PatentsPage';
import { ContactPage } from './components/pages/ContactPage';
import { RecruitPage } from './components/pages/RecruitPage';

type PageId = 'home' | 'about' | 'aari' | 'projects' | 'stores' | 'patents' | 'contact' | 'recruit';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':    return <HomePage onNavigate={handleNavigate} />;
      case 'about':   return <AboutPage />;
      case 'aari':    return <AariPage />;
      case 'projects': return <ProjectsPage />;
      case 'stores':  return <StoresPage />;
      case 'patents': return <PatentsPage />;
      case 'contact': return <ContactPage />;
      case 'recruit': return <RecruitPage />;
      default:        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#FDFBF7',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
      color: '#2C2C2C',
    }}>
      {/* Global styles */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; overflow-x: hidden; }

        button { font-family: inherit; }
        a { text-decoration: none; color: inherit; }

        /* Responsive grid breakpoints */
        @media (max-width: 1024px) {
          .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
          .grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .grid-4 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 28px !important; }
          .section-pad { padding: 60px 20px !important; }
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #f5f5f5; }
        ::-webkit-scrollbar-thumb { background: rgba(197,168,122,0.5); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(197,168,122,0.8); }

        /* Page fade-in animation */
        @keyframes pageEnter {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .page-enter {
          animation: pageEnter 0.5s ease forwards;
        }
      `}</style>

      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      <main key={currentPage} className="page-enter" style={{ flex: 1 }}>
        {renderPage()}
      </main>

      <Footer onNavigate={handleNavigate} />
      <FloatingButtons />
    </div>
  );
}
