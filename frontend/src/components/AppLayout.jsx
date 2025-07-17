import React, { useState } from "react";
import Promt from "./Promt";
import { Menu, X } from "lucide-react";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-50 md:relative bg-gray-900 text-white h-full w-64 p-4 transform transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <ul className="space-y-4">
          <li className="hover:text-blue-400 cursor-pointer">Chat History</li>
          <li className="hover:text-blue-400 cursor-pointer">Settings</li>
          <li className="hover:text-blue-400 cursor-pointer">Mode </li>
          <li className="hover:text-blue-400 cursor-pointer">Profile</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#1a1a1a] text-white overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-gray-800">
          <h1 className="text-xl font-semibold">DeepSeek</h1>
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Promt Component */}
        <div className="flex-1 overflow-y-auto">
          <Promt />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
