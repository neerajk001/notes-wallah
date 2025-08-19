// src/app/notes/[slug]/page.tsx
import { supabase } from "@/app/lib/supabaseClient";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

// Type for a single note
export type Note = {
  id: string;
  title: string;
  content: string;
  youtube_url: string;
  reference_url: string;
  slug: string;
};

// Pre-build static pages for all notes
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { data: notes, error } = await supabase.from("notes").select("slug");

  if (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }

  return notes?.map((n: { slug: string }) => ({ slug: n.slug })) || [];
}

// Fetch a single note
async function getNote(slug: string): Promise<Note | null> {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching note:", error);
    return null;
  }
  return data;
}

// Helper to embed YouTube
function getYoutubeEmbedUrl(url: string) {
  if (!url) return "";
  const videoIdMatch = url.match(/(?:watch\?v=|\/embed\/|\/)([\w-]{11})(?:\S+)?$/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
}

// Page Component
export default async function NotePage({ params }: { params: { slug: string } }) {
  const note = await getNote(params.slug);

  if (!note) {
    return (
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold">Note not found.</h1>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Return to Homepage
        </Link>
      </div>
    );
  }

  const embedUrl = getYoutubeEmbedUrl(note.youtube_url);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const pdfUrl = `${supabaseUrl}/storage/v1/object/public/download/${params.slug}.pdf`;
  const markdownUrl = `${supabaseUrl}/storage/v1/object/public/download/${params.slug}.md`;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <Link href="/" className="text-blue-400 hover:underline mb-6 inline-block">
        &larr; Back to all notes
      </Link>

      <article className="prose prose-invert lg:prose-xl max-w-none">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
          {note.title}
        </h1>
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </article>

      {embedUrl && (
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Watch the Video</h2>
          <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src={embedUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}

      <div className="mt-12 p-6 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-xl font-bold mb-4 text-white">Downloads & Resources</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={pdfUrl}
            download
            className="flex-1 text-center bg-blue-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Download as PDF
          </a>
          <a
            href={markdownUrl}
            download
            className="flex-1 text-center bg-gray-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Download for Notion (.md)
          </a>
          <a
            href={note.reference_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-green-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-green-700 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
