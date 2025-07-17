import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Promt from './Promt';
import { Menu } from 'lucide-react';

function Home() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-white relative">
      
      {/* Sidebar - hidden on mobile, shown on desktop OR when toggled on mobile */}
      <div
        className={`bg-[#232327] w-64 fixed md:relative md:block h-full z-50 transition-transform duration-300 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Close button only on mobile */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setShowSidebar(false)}
            className="text-white text-xl"
          >
            ✖
          </button>
        </div>
        <Sidebar />
      </div>

      {/* Overlay on mobile when sidebar is open */}
      {showSidebar && (
        <div
          className="fixed inset-0 text-slate-200 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full overflow-y-auto ml-0 md:ml-64">

        {/* Top bar with menu icon (only on mobile) */}
        <div className="md:hidden p-4 flex items-center">
          <button onClick={() => setShowSidebar(true)} className="text-white">
            <Menu size={24} />
          </button>
          <span className="text-white text-2xl font-bold ml-3">DeepSeek</span>
        </div>

        {/* Prompt content */}
        <div className="flex-1 flex items-center justify-center px-6">
          <Promt />
        </div>
      </div>
    </div>
  );
}

export default Home;
