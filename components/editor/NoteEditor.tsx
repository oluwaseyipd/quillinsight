"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

const NoteEditor = ({ content, onUpdate }) => {
  console.log("🔧 NoteEditor - Props received:", {
    hasContent: !!content,
    contentLength: content?.length,
    contentPreview: content?.substring(0, 100),
  });
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      const plainText = editor.getText();
      console.log("🔄 NoteEditor - Content updated:", {
        htmlLength: newContent.length,
        plainTextLength: plainText.length,
        htmlPreview: newContent.substring(0, 100),
        plainTextPreview: plainText.substring(0, 100),
        isFromPaste: editor.view.composing,
        transaction: editor.state.doc.content.size,
      });
      onUpdate(newContent);
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
      handlePaste: (view, event, slice) => {
        console.log("📋 NoteEditor - Paste event detected:", {
          clipboardDataLength:
            event.clipboardData?.getData("text/plain")?.length || 0,
          clipboardPreview:
            event.clipboardData?.getData("text/plain")?.substring(0, 100) ||
            "No text data",
          sliceSize: slice.content.size,
        });
        // Return false to use default paste behavior
        return false;
      },
      handleDrop: (view, event, slice, moved) => {
        console.log("🎯 NoteEditor - Drop event detected");
        return false;
      },
    },
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      console.log("📝 NoteEditor - Editor created:", {
        hasContent: editor.getHTML().length > 0,
        contentLength: editor.getHTML().length,
      });
    },
    onSelectionUpdate: ({ editor }) => {
      console.log("👆 NoteEditor - Selection changed:", {
        from: editor.state.selection.from,
        to: editor.state.selection.to,
        currentContent: editor.getHTML().length,
      });
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md">
      <div className="flex items-center p-2 border-b">
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          variant={
            editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"
          }
          size="icon"
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          variant={
            editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"
          }
          size="icon"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          variant={
            editor.isActive("heading", { level: 3 }) ? "secondary" : "ghost"
          }
          size="icon"
        >
          <Heading3 className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "secondary" : "ghost"}
          size="icon"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive("italic") ? "secondary" : "ghost"}
          size="icon"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          variant={editor.isActive("underline") ? "secondary" : "ghost"}
          size="icon"
        >
          <UnderlineIcon className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
          size="icon"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
          size="icon"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
          size="icon"
        >
          <Quote className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          variant={editor.isActive("codeBlock") ? "secondary" : "ghost"}
          size="icon"
        >
          <Code className="w-4 h-4" />
        </Button>
        <Button
          onClick={setLink}
          variant={editor.isActive("link") ? "secondary" : "ghost"}
          size="icon"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default NoteEditor;
