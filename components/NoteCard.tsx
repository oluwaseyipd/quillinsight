quillinsight/components/NoteCard.tsx
// NoteCard.tsx
// Placeholder for a reusable component to display a note summary in a card format.

import React from "react";

/**
 * NoteCard
 * Displays a summary of a note, including title, tags, and a preview.
 * To be used in note lists (e.g., dashboard).
 */
const NoteCard: React.FC = () => {
  // TODO: Accept props for note data (title, tags, preview, etc.)
  // TODO: Add shadcn/ui Card styling and interactivity

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      {/* Placeholder content */}
      <h3 className="font-semibold text-lg mb-2">Note Title</h3>
      <div className="text-sm text-gray-500 mb-2">#tag1 #tag2</div>
      <p className="text-gray-700">This is a preview of the note content...</p>
    </div>
  );
};

export default NoteCard;
