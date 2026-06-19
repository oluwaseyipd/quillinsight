# QuillInsight 🖋️✨

QuillInsight is a premium, AI-powered note-taking web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Supabase (PostgreSQL, Auth)**. 

Users can draft thoughts, structure notes inside custom folder hierarchies, label items with dynamic tags, and process texts in real-time to extract executive summaries, recommended tags, and key takeaway check-lists powered by OpenAI's `gpt-4o-mini` model.

---

## 🌟 Core Features

*   **Public Landing Page & Guest Sandbox:** Try note editing and test real-time AI summarization in a client-side playground sandbox before creating an account.
*   **Workspace Dashboard:** Sleek single-page interface for managing directories and files:
    *   **Folders CRUD:** Inline creation, rename input dialogues, and deletion cascade safety.
    *   **Notes CRUD:** Note duplication (cloning), directory transfers, and tag manager badges.
    *   **Note Editor:** Full markdown writing area with a **750ms debounced auto-save** trigger syncing directly with Supabase.
*   **AI Insights Drawer:** Collapsible side-panel containing:
    *   **Executive Summary:** Short paragraph analyzing note content.
    *   **Key Action Items:** Exactly three check-list takeaways or milestones.
    *   **Suggested Tags:** Clicking a recommended tag instantly appends it to the note's active tags.
*   **AI-Enhanced Reader View:** Distraction-free reading toggle formatting text, highlights, and summaries into a clean article layout.
*   **Theme Personalization:** Toggle between 5 custom workspace visual themes (Classic Light, Professional Dark, Modern Purple, Eco Green, and Minimalist Gray) updating localStorage and user profiles instantly.
*   **Secure Routing Proxy:** Uses Next.js 16 `proxy.ts` middleware structure to validate user auth tokens, redirecting unauthenticated users away from `/dashboard` and logged-in sessions away from `/login`.

---

## 🛠️ Technology Stack

*   **Core framework:** Next.js `16.2.9` (App Router / Turbopack) & React `19.2.4`
*   **Database & Auth:** Supabase (PostgreSQL, Supabase Auth)
*   **Styling:** Tailwind CSS `v4` & custom transition rules
*   **Icons:** Lucide React
*   **AI Model Client:** OpenAI SDK (`gpt-4o-mini` configuration)

---

## 🚀 Local Development Setup

### 1. Install Project Dependencies
Clone this repository to your system, enter the root directory, and run:
```bash
npm install
```

### 2. Configure Environment Keys
Copy [.env.local.example](file:///.env.local.example) to a new file named `.env.local` in the project root:
```bash
cp .env.local.example .env.local
```
Fill in the credentials:
*   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase cloud project URL (e.g. `https://xxxx.supabase.co`).
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase public Anon key (found in Settings -> API).
*   `SUPABASE_SERVICE_ROLE_KEY`: Service role secret key (keep private, used for database triggers).
*   `OPENROUTER_API_KEY`: Your OpenRouter developer API token. Can be generated for free.
*   `OPENROUTER_MODEL` (Optional): The model to query. Defaults to `openrouter/free`.

---

### 3. Database Schema Setup (Supabase SQL Editor)
Execute the following PostgreSQL script inside your **Supabase SQL Editor** to establish the profiles trigger, schema tables, RLS policies, and indexes:

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    username TEXT UNIQUE,
    avatar_url TEXT,
    theme_preference TEXT DEFAULT 'theme-classic-light' NOT NULL,
    CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Allow users to update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Create folders table
CREATE TABLE IF NOT EXISTS public.folders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT name_not_empty CHECK (char_length(name) >= 1)
);

-- Enable RLS on folders
ALTER TABLE public.folders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read their own folders" ON public.folders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow users to create their own folders" ON public.folders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own folders" ON public.folders
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Allow users to delete their own folders" ON public.folders
    FOR DELETE USING (auth.uid() = user_id);

-- Create notes table
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    folder_id UUID REFERENCES public.folders(id) ON DELETE SET NULL,
    title TEXT DEFAULT 'Untitled Note' NOT NULL,
    content TEXT DEFAULT '' NOT NULL,
    summary TEXT,
    tags TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    highlights TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on notes
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read their own notes" ON public.notes
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow users to create their own notes" ON public.notes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own notes" ON public.notes
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Allow users to delete their own notes" ON public.notes
    FOR DELETE USING (auth.uid() = user_id);

-- Create trigger function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url, theme_preference)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', 'user_' || substr(new.id::text, 1, 8)),
    new.raw_user_meta_data->>'avatar_url',
    'theme-classic-light'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create helper index for search & fast joins
CREATE INDEX IF NOT EXISTS notes_user_id_idx ON public.notes(user_id);
CREATE INDEX IF NOT EXISTS notes_folder_id_idx ON public.notes(folder_id);
CREATE INDEX IF NOT EXISTS notes_tags_idx ON public.notes USING gin(tags);
```

---

### 4. Run Development Server
Boot up the local Next.js environment:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser.

---

## 🩺 System Diagnostics Health Check
To verify your API connections and environment configuration, navigate to the following URL in your browser:
*   [http://localhost:3000/api/diagnostics](http://localhost:3000/api/diagnostics)

It runs a real-time validation test connecting to Supabase and query testing OpenRouter, responding with a clean JSON diagnostics report.

---

## 📦 Deployment Instructions

### 1. Supabase Cloud Configuration
1.  Verify the SQL schema scripts have been run in your project SQL Editor.
2.  Enable Email Auth or toggle redirect Callback URLs to point to your Vercel deployment inside the Supabase Auth Settings tab:
    *   `https://your-vercel-domain.vercel.app/api/auth/callback`

### 2. Vercel Frontend Deployment
1.  Deploy the Next.js repository using the Vercel dashboard.
2.  Bind your environment keys in Vercel's Project Settings page:
    *   `NEXT_PUBLIC_SUPABASE_URL`
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    *   `SUPABASE_SERVICE_ROLE_KEY`
    *   `OPENROUTER_API_KEY`
    *   `OPENROUTER_MODEL` (Optional)
3.  Deploy production builds cleanly!
