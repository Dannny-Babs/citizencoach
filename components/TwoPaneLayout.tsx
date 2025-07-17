"use client";

import React from 'react';

interface TwoPaneLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function TwoPaneLayout({ left, right }: TwoPaneLayoutProps) {
  return (
    <div className="h-screen p-4">
      <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-2  mx-auto">
        
        {/* Left Pane - Chat Interface */}
        <div className="flex flex-col bg-white rounded-2xl  border border-gray-100 overflow-hidden">
          {left}
        </div>
        
        {/* Right Pane - Study Dashboard */}
        <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
          {right}
        </div>
        
      </div>
    </div>
  );
} 