import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { UtilityBar } from './components/layout/UtilityBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { LandAiChatbot } from './components/chat/LandAiChatbot';
import { InheritanceCalculatorModal } from './components/common/InheritanceCalculatorModal';
import { LandLawsModal } from './components/common/LandLawsModal';

// Pages
import { HomePage } from './pages/HomePage';
import { VerifyPage } from './pages/VerifyPage';
import { MyLandPage } from './pages/MyLandPage';
import { OwnershipHistoryPage } from './pages/OwnershipHistoryPage';
import { ProtectionPage } from './pages/ProtectionPage';
import { AuditPage } from './pages/AuditPage';
import { OfficerPage } from './pages/OfficerPage';
import { ReportsPage } from './pages/ReportsPage';
import { ServicesPage } from './pages/ServicesPage';
import { GuidePage } from './pages/GuidePage';
import { AboutPage } from './pages/AboutPage';
import { HelpPage } from './pages/HelpPage';

const AppContent: React.FC = () => {
  const {
    currentRoute,
    isCalculatorOpen,
    setIsCalculatorOpen,
    isLawsOpen,
    setIsLawsOpen
  } = useApp();

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/':
        return <HomePage />;
      case '/verify':
        return <VerifyPage />;
      case '/my-land':
        return <MyLandPage />;
      case '/ownership-history':
        return <OwnershipHistoryPage />;
      case '/protection':
        return <ProtectionPage />;
      case '/audit':
        return <AuditPage />;
      case '/officer':
        return <OfficerPage />;
      case '/reports':
        return <ReportsPage />;
      case '/services':
        return <ServicesPage />;
      case '/guide':
        return <GuidePage />;
      case '/about':
        return <AboutPage />;
      case '/help':
        return <HelpPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#061A14] text-white selection:bg-[#00A86B] selection:text-white">
      <UtilityBar />
      <Header />
      <main className="flex-1 bg-[#061A14]">
        {renderCurrentPage()}
      </main>
      <Footer />
      <ToastContainer />
      <LandAiChatbot />

      {/* Official land.gov.bd Signature Modals */}
      <InheritanceCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
      <LandLawsModal
        isOpen={isLawsOpen}
        onClose={() => setIsLawsOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
