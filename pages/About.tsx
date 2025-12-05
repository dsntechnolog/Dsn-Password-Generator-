import React from 'react';
import { Smartphone, Globe, Phone, Code2, BadgeCheck } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pb-24 pt-8 px-5 max-w-md mx-auto min-h-screen bg-slate-50">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-slate-900 rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-slate-300 mb-6 rotate-3">
          <Code2 size={40} className="text-green-400" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-2xl font-extrabold text-slate-800">Dsn Technology</h1>
          <BadgeCheck size={24} className="text-blue-500" fill="#dbeafe" />
        </div>
        <p className="text-slate-500 text-sm mt-2">Innovating for the Future</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/60 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
        <h2 className="text-lg font-bold text-slate-800 mb-3 relative z-10">Kuhusu Sisi</h2>
        <p className="text-slate-600 leading-relaxed text-sm relative z-10">
          Sisi ni Dsn Technology. Tunaunda suluhisho za kiteknolojia zenye nguvu na za kisasa. 
          Lengo letu ni kutoa huduma bora za kidijitali zinazorahisisha maisha na kuongeza usalama mtandaoni.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Wasiliana Nasi</h2>
        
        <div className="space-y-4">
          <a href="tel:0745720609" className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
            <div className="bg-green-100 p-2.5 rounded-full text-green-600 group-hover:scale-110 transition-transform">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Simu</p>
              <p className="text-slate-700 font-semibold">0745 720 609</p>
            </div>
          </a>

          <a href="https://dsntechnology.site" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
            <div className="bg-blue-100 p-2.5 rounded-full text-blue-600 group-hover:scale-110 transition-transform">
              <Globe size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Tovuti</p>
              <p className="text-slate-700 font-semibold">dsntechnology.site</p>
            </div>
          </a>

           <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
            <div className="bg-purple-100 p-2.5 rounded-full text-purple-600 group-hover:scale-110 transition-transform">
              <Smartphone size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Huduma</p>
              <p className="text-slate-700 font-semibold">App Development & IT</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-slate-400">© 2025 Dsn Technology. All rights reserved.</p>
      </div>
    </div>
  );
};

export default About;