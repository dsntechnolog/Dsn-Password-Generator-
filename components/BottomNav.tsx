import React from 'react';
import { Home, ShieldCheck, Bot, Info } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const navItems = [
    { id: Tab.HOME, label: 'Home', icon: Home },
    { id: Tab.ADVICE, label: 'Ushauri', icon: ShieldCheck },
    { id: Tab.AI, label: 'AI', icon: Bot },
    { id: Tab.ABOUT, label: 'About', icon: Info },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe pt-2 px-6 pb-2 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center w-16 transition-all duration-300 ${
                isActive ? 'text-green-600 -translate-y-1' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <item.icon
                size={24}
                className={`mb-1 transition-all duration-300 ${isActive ? 'fill-green-100' : ''}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;