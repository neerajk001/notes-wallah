// src/app/page.tsx
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

// Define type for a single note
export type Note = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  created_at: string;
};

// Revalidate every 60 seconds
export const revalidate = 60;

// Optional: Metadata for SEO
export const metadata = {
  title: "Notes Wallah",
  description: "A curated collection of concepts and notes, simplified for everyone.",
};

export default async function HomePage() {
  // Fetch notes from Supabase
  const { data: notes, error } = await supabase
    .from("notes")
    .select("id, title, slug, summary, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching notes:", error);
    return <p className="text-red-500 p-8">Error loading notes.</p>;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          Notes Wallah
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-400">
          A curated collection of concepts and notes, simplified for everyone.
        </p>
      </header>

      {/* Notes Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {notes?.length ? (
          notes.map((note) => (
            <Link href={`/notes/${note.slug}`} key={note.id} className="group block">
              <div
                className="h-full bg-neutral-900/80 p-6 rounded-xl border border-neutral-800 
                transition-all duration-300 ease-in-out
                group-hover:border-neutral-600 group-hover:-translate-y-1"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-100">{note.title}</h2>
                  <span
                    className="text-gray-500 transition-transform duration-300 
                    group-hover:text-gray-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
                <p className="mt-3 text-gray-400">{note.summary}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12 px-6 bg-neutral-900/80 rounded-xl border border-dashed border-neutral-800">
            <h3 className="text-xl font-medium text-gray-300">No notes yet</h3>
            <p className="mt-2 text-gray-500">
              Check back soon or add a new note in the dashboard.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

