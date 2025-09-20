"use client";

import { useState, createContext, useContext } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

// Create context for dashboard state
type DashboardContextType = {
  selectedFolder: string | null;
  selectedTag: string | null;
  setSelectedFolder: (folder: string | null) => void;
  setSelectedTag: (tag: string | null) => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardLayout");
  }
  return context;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <DashboardContext.Provider
      value={{ selectedFolder, selectedTag, setSelectedFolder, setSelectedTag }}
    >
      <div className="h-screen flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          setSelectedFolder={setSelectedFolder}
          setSelectedTag={setSelectedTag}
        />

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Topbar */}
          <Topbar />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </DashboardContext.Provider>
  );
}
