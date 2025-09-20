"use client";

import NotesList from "@/components/dashboard/NotesList";
import { useDashboard } from "./layout";

export default function DashboardPage() {
  const { selectedFolder, selectedTag } = useDashboard();

  return (
    <div className="px-8 py-6">
      <NotesList selectedFolder={selectedFolder} selectedTag={selectedTag} />
    </div>
  );
}
