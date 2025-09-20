//quillinsight / lib / ai.ts;
// lib/ai.ts
// Encapsulates all AI-related logic for QuillInsight.
// This module will handle features such as note summarization, auto-tagging, and highlight extraction.
// Integrate with external AI APIs or local models as needed.

// Placeholder functions for upcoming AI features

/**
 * Generates a title for a note based on its content.
 * @param noteContent - The raw content of the note (HTML or plain text).
 * @returns A suggested title string.
 */
export async function generateTitle(noteContent: string): Promise<string> {
  if (!noteContent || noteContent.trim().length === 0) {
    return "Untitled Note";
  }

  try {
    // Strip HTML tags and get plain text
    const plainText = noteContent.replace(/<[^>]*>/g, "").trim();

    if (plainText.length === 0) {
      return "Untitled Note";
    }

    // For now, use a simple heuristic: take first meaningful sentence or phrase
    // This can be replaced with OpenAI API integration later
    const sentences = plainText
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0);

    if (sentences.length > 0) {
      let title = sentences[0].trim();

      // Limit title length
      if (title.length > 60) {
        title = title.substring(0, 57) + "...";
      }

      // Capitalize first letter
      title = title.charAt(0).toUpperCase() + title.slice(1);

      return title;
    }

    // Fallback to first few words
    const words = plainText.split(/\s+/).slice(0, 8).join(" ");
    return words.length > 60 ? words.substring(0, 57) + "..." : words;
  } catch (error) {
    console.error("Error generating title:", error);
    return "Untitled Note";
  }
}

/**
 * Generates a summary for a given note.
 * @param noteContent - The raw content of the note.
 * @returns A summary string.
 */
export async function generateSummary(noteContent: string): Promise<string> {
  if (!noteContent || noteContent.trim().length === 0) {
    return "No content to summarize.";
  }

  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        textContent: noteContent,
        type: "summarize",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from AI API (summarize):", errorData);
      return "Failed to generate summary.";
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error calling AI API for summary:", error);
    return "Failed to generate summary due to an internal error.";
  }
}

/**
 * Extracts highlights from a given note.
 * @param noteContent - The raw content of the note.
 * @returns An array of highlighted strings.
 */
export async function extractHighlights(
  noteContent: string,
): Promise<string[]> {
  if (!noteContent || noteContent.trim().length === 0) {
    return [];
  }

  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        textContent: noteContent,
        type: "insights", // Using 'insights' type for highlight extraction
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from AI API (highlights):", errorData);
      return ["Failed to extract highlights."];
    }

    const data = await response.json();
    // Assuming the AI returns a single string with highlights, we might need to parse it.
    // For now, we'll return it as a single item in an array.
    return [data.result];
  } catch (error) {
    console.error("Error calling AI API for highlights:", error);
    return ["Failed to extract highlights due to an internal error."];
  }
}

/**
 * Auto-tags a note based on its content.
 * @param noteContent - The raw content of the note.
 * @returns An array of tags.
 */
export async function autoTag(noteContent: string): Promise<string[]> {
  if (!noteContent || noteContent.trim().length === 0) {
    return [];
  }

  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        textContent: noteContent,
        type: "insights", // Using 'insights' type for auto-tagging as well
        query: "Extract relevant keywords or tags from the content.",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from AI API (auto-tag):", errorData);
      return ["failed-to-tag"];
    }

    const data = await response.json();
    // Assuming the AI returns a comma-separated string of tags, we'll parse it.
    return data.result
      .split(",")
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag.length > 0);
  } catch (error) {
    console.error("Error calling AI API for auto-tagging:", error);
    return ["failed-to-tag-internal-error"];
  }
}
