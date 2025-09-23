import NotesList from "@/components/dashboard/NotesList";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { useDashboard } from "./layout";

export default async function DashboardPage() {
  const supabase = createClient();

  // Get the current session (user)
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If not authenticated, redirect to login
  if (!session?.user) {
    redirect("/auth/login");
  }

  // You may need to refactor useDashboard logic for server-side, or pass props to a client component
  // For now, just render the NotesList as before
  // If useDashboard must be client-side, move it into NotesList or a wrapper client component

  return (
    <div className="px-8 py-6">
      <NotesList />
    </div>
  );
}
