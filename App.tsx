import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Advice from './pages/Advice';
import AIChat from './pages/AIChat';
import About from './pages/About';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return <Home />;
      case Tab.ADVICE:
        return <Advice />;
      case Tab.AI:
        return <AIChat />;
      case Tab.ABOUT:
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="antialiased text-slate-900 font-sans h-full">
      {renderContent()}
      <BottomNav currentTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default App;