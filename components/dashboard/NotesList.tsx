import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockNotes = [
  {
    id: 1,
    title: "Meeting Notes 2024-07-29",
    content: "Discussed Q3 roadmap and new feature prioritization. Key takeaways...",
    tags: ["work", "roadmap", "planning"],
    lastEdited: "2024-07-29T10:30:00Z",
  },
  {
    id: 2,
    title: "Brainstorming Ideas for Project Phoenix",
    content: "Initial thoughts on the new project. We could explore...",
    tags: ["project-phoenix", "ideas", "brainstorming"],
    lastEdited: "2024-07-28T15:00:00Z",
  },
  {
    id: 3,
    title: "Personal Journal Entry",
    content: "Today was a good day. I went for a walk in the park and...",
    tags: ["personal", "journal"],
    lastEdited: "2024-07-27T20:00:00Z",
  },
  {
    id: 4,
    title: "Recipe for Sourdough Bread",
    content: "Ingredients: 500g flour, 100g starter, 375g water, 10g salt...",
    tags: ["recipe", "baking", "sourdough"],
    lastEdited: "2024-07-26T12:00:00Z",
  },
];

export default function NotesList() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockNotes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text truncate">{note.content}</p>
              <div className="flex space-x-2 mt-4">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-accent text-background text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-text mt-4">
                Last edited: {new Date(note.lastEdited).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
