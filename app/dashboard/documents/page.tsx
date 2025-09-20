"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Upload,
  FileText,
  Trash2,
  Download,
  File,
  FileType,
  Calendar,
  HardDrive,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type Document = {
  id: string;
  file_name: string;
  file_type: string;
  size: number;
  created_at: string;
  storage_path: string;
};

export default function DocumentsPage() {
  const supabase = createClient();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const fetchDocuments = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching documents:", error);
        setError("Could not fetch documents. Please try again.");
      } else {
        setDocuments(data || []);
      }
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf"))
      return <FileType className="h-5 w-5 text-red-500" />;
    if (fileType.includes("word"))
      return <FileText className="h-5 w-5 text-blue-500" />;
    if (fileType.includes("text"))
      return <File className="h-5 w-5 text-gray-500" />;
    return <FileText className="h-5 w-5 text-gray-400" />;
  };

  const getFileTypeLabel = (fileType: string) => {
    if (fileType.includes("pdf")) return "PDF";
    if (fileType.includes("word")) return "DOCX";
    if (fileType.includes("text")) return "TXT";
    return "Unknown";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      validateAndSetFile(event.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(selectedFile.type)) {
      setError(
        "Invalid file type. Please upload PDF, DOCX, or TXT files only.",
      );
      setFile(null);
      return;
    }

    if (selectedFile.size > maxSize) {
      setError("File size too large. Maximum size allowed is 5MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError(null);
    setSuccess(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(null);
    setUploadProgress(0);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("You must be logged in to upload files.");
      setUploading(false);
      return;
    }

    const filePath = `${user.id}/${Date.now()}-${file.name}`;

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => Math.min(prev + 10, 90));
    }, 200);

    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, file);

    clearInterval(progressInterval);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      setError("Failed to upload file. Please try again.");
      setUploading(false);
      setUploadProgress(0);
      return;
    }

    setUploadProgress(95);

    const { error: dbError } = await supabase.from("documents").insert({
      file_name: file.name,
      file_type: file.type,
      size: file.size,
      user_id: user.id,
      storage_path: filePath,
    });

    if (dbError) {
      console.error("Error saving document metadata:", dbError);
      setError("Failed to save document details. Please try again.");
    } else {
      setUploadProgress(100);
      setSuccess(`Successfully uploaded "${file.name}"`);
      setFile(null);
      fetchDocuments();
    }

    setTimeout(() => {
      setUploading(false);
      setUploadProgress(0);
    }, 500);
  };

  const handleDelete = async (
    documentId: string,
    storagePath: string,
    fileName: string,
  ) => {
    const { error: deleteStorageError } = await supabase.storage
      .from("documents")
      .remove([storagePath]);

    if (deleteStorageError) {
      console.error("Error deleting file from storage:", deleteStorageError);
      setError("Failed to delete file from storage.");
      return;
    }

    const { error: deleteDbError } = await supabase
      .from("documents")
      .delete()
      .eq("id", documentId);

    if (deleteDbError) {
      console.error("Error deleting document from db:", deleteDbError);
      setError("Failed to delete document.");
    } else {
      setSuccess(`Successfully deleted "${fileName}"`);
      fetchDocuments();
    }
  };

  const handleDownload = async (storagePath: string, fileName: string) => {
    const { data, error } = await supabase.storage
      .from("documents")
      .download(storagePath);
    if (error) {
      console.error("Error downloading file:", error);
      setError("Failed to download file.");
      return;
    }

    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    setSuccess(`Downloaded "${fileName}"`);
  };

  return (
    <div className="p-6 bg-background">
      {/* Header */}
      <div className="bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text">
                Document Library
              </h1>
              <p className="text-text/70 mt-1">
                Upload and manage your documents
              </p>
            </div>
            <Badge
              variant="secondary"
              className="bg-accent/10 text-accent border-accent/20"
            >
              {documents.length}{" "}
              {documents.length === 1 ? "Document" : "Documents"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mx-auto py-6 space-y-8">
        {/* Status Messages */}
        {error && (
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {/* Upload Section */}
        <Card className="border-2 border-dashed border-accent/20 bg-accent/5">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-heading text-accent">
              Upload Documents
            </CardTitle>
            <p className="text-text/60 text-sm">
              Drag and drop files or click to browse. Supports PDF, DOCX, and
              TXT files up to 5MB.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Drag & Drop Area */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 ${
                dragActive
                  ? "border-accent bg-accent/10"
                  : "border-accent/30 hover:border-accent/50 hover:bg-accent/5"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Upload className="h-8 w-8 text-accent" />
                </div>

                <div>
                  <p className="text-lg font-medium text-text">
                    Drop files here or click to browse
                  </p>
                  <p className="text-sm text-text/60 mt-1">
                    PDF, DOCX, TXT • Max 5MB per file
                  </p>
                </div>

                <Input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.txt"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Selected File Preview */}
            {file && (
              <div className="bg-surface rounded-lg p-4 border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <div>
                      <p className="font-medium text-text">{file.name}</p>
                      <div className="flex items-center gap-2 text-sm text-text/60">
                        <Badge variant="outline" className="text-xs">
                          {getFileTypeLabel(file.type)}
                        </Badge>
                        <span>•</span>
                        <span>{formatFileSize(file.size)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFile(null);
                        setError(null);
                      }}
                    >
                      Remove
                    </Button>
                    <Button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="bg-accent hover:bg-accent/90 text-white"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {uploading && uploadProgress > 0 && (
                  <div className="mt-4">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-text/60 mt-1 text-center">
                      {uploadProgress}% complete
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-heading flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-accent" />
              My Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            {documents.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-accent/60" />
                </div>
                <h3 className="text-lg font-medium text-text mb-2">
                  No documents yet
                </h3>
                <p className="text-text/60">
                  Upload your first document to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="group flex items-center justify-between p-4 bg-surface/50 hover:bg-surface rounded-lg border border-transparent hover:border-accent/20 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        {getFileIcon(doc.file_type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-text truncate">
                            {doc.file_name}
                          </p>
                          <Badge
                            variant="outline"
                            className="text-xs flex-shrink-0"
                          >
                            {getFileTypeLabel(doc.file_type)}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-text/60">
                          <div className="flex items-center gap-1">
                            <HardDrive className="h-3 w-3" />
                            {formatFileSize(doc.size)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(doc.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleDownload(doc.storage_path, doc.file_name)
                        }
                        className="hover:bg-accent/10 hover:text-accent"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleDelete(doc.id, doc.storage_path, doc.file_name)
                        }
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
