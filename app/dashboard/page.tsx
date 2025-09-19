//quillinsight/app/dashboard/page.tsx
// Dashboard Page Route
// This page will display the list of notes for the authenticated user.
// Future features: filtering, searching, sorting, and quick actions.

import React from "react";

export default function DashboardPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Notes</h1>
      {/* TODO: Render NoteCard components for each note */}
      <div className="grid gap-4">
        {/* Placeholder for notes list */}
        <div className="text-muted-foreground">
          No notes yet. Start by creating a new note!
        </div>
      </div>
    </main>
  );
}
