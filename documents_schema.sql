-- Create Documents Table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_type TEXT,
  size BIGINT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  storage_path TEXT NOT NULL
);

-- Enable Row Level Security for the documents table
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for documents
CREATE POLICY "Users can view their own documents" ON documents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents" ON documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents" ON documents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents" ON documents
  FOR DELETE USING (auth.uid() = user_id);

-- Create a storage bucket for documents if it doesn't exist
-- Note: This part is usually done in the Supabase dashboard, but the policy is here for completeness.
-- Make sure to create a bucket named 'documents' in your Supabase project.

CREATE POLICY "Users can upload to the documents bucket" ON storage.objects
  FOR INSERT WITH CHECK ( bucket_id = 'documents' AND auth.uid() = owner );

CREATE POLICY "Users can view their own files in the documents bucket" ON storage.objects
  FOR SELECT USING ( bucket_id = 'documents' AND auth.uid() = owner );

CREATE POLICY "Users can delete their own files in the documents bucket" ON storage.objects
  FOR DELETE USING ( bucket_id = 'documents' AND auth.uid() = owner );
