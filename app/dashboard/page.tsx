'use client';

import { useState } from 'react';
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import NotesList from "@/components/dashboard/NotesList";

export default function DashboardPage() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        setSelectedFolder={setSelectedFolder}
        setSelectedTag={setSelectedTag}
      />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 px-8 py-6 overflow-y-auto">
          <NotesList
            selectedFolder={selectedFolder}
            selectedTag={selectedTag}
          />
        </main>
      </div>
    </div>
  );
}