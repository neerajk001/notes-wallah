// src/app/creator/[id]/page.tsx
import Link from "next/link";
import { supabase } from "@/app/lib/supabaseClient";

export const revalidate = 30;

type Note = {
  title: string;
  slug: string;
  pdf_path: string;
  download_count: number | null;
};

async function getCreatorBySlug(slug: string) {
  return supabase.from("creators").select("name, slug").eq("slug", slug).maybeSingle();
}

async function getNotesByCreatorSlug(creatorSlug: string) {
  return supabase
    .from("notes")
    .select("title, slug, pdf_path, download_count")
    .eq("creator_slug", creatorSlug)
    .order("title");
}

// Helper: hardcode bucket name as "download" and trim whitespace from path
async function getPublicUrl(path: string) {
  // Trim any whitespace characters including \r\n
  const cleanPath = path.trim();
  const { data } = supabase.storage.from("download").getPublicUrl(cleanPath);
  return data.publicUrl;
}

export default async function CreatorNotesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params Promise in Next.js 15
  const { id } = await params;

  if (!id) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        <Link href="/creator" className="text-white/80 hover:text-white">← All Creators</Link>
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.06] p-6">
          <h2 className="text-xl font-semibold">Invalid route</h2>
          <p className="mt-2 text-white/70">Missing creator slug in the URL.</p>
        </div>
      </main>
    );
  }

  const [{ data: creator, error: cErr }, { data: notes, error: nErr }] =
    await Promise.all([getCreatorBySlug(id), getNotesByCreatorSlug(id)]);

  if (cErr) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        <Link href="/creator" className="text-white/80 hover:text-white">← All Creators</Link>
        <p className="mt-4 text-red-400">Error: {cErr.message}</p>
      </main>
    );
  }

  if (!creator) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        <Link href="/creator" className="text-white/80 hover:text-white">← All Creators</Link>
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.06] p-6">
          <h2 className="text-xl font-semibold">Creator not found</h2>
          <p className="mt-2 text-white/70">
            No creator exists with slug &ldquo;{id}&rdquo;. Check creators.slug values.
          </p>
        </div>
      </main>
    );
  }

  const safeNotes = notes ?? [];

  // Generate correct public URLs using hardcoded "download" bucket
  const notesWithUrls = await Promise.all(
    safeNotes.map(async (n) => {
      const pdfUrl = await getPublicUrl(n.pdf_path);
      return { ...n, pdfUrl };
    })
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background gradient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(50% 50% at 50% 50%, #7c3aed 0%, rgba(124,58,237,0) 70%)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(50% 50% at 50% 50%, #22d3ee 0%, rgba(34,211,238,0) 70%)" }}
        />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <header className="relative z-10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <Link href="/creator" className="text-white/80 hover:text-white">← All Creators</Link>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 via-sky-400 to-emerald-400 shadow-md" />
            <span className="text-lg font-semibold tracking-tight">Notes Wallah</span>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-2">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
            {creator.name} — Notes
          </span>
        </h1>

        {nErr && <p className="mb-4 text-red-400">Error loading notes: {nErr.message}</p>}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notesWithUrls.map((note: Note & { pdfUrl: string }) => {
            return (
              <div
                key={note.slug}
                className="group rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md transition hover:bg-white/[0.10]"
              >
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-semibold text-white">{note.title}</h2>
                  <div className="h-6 w-6 rounded-md bg-gradient-to-br from-indigo-400 via-sky-400 to-emerald-400 opacity-90" />
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <a
                    href={note.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    View PDF
                  </a>
                  <a
                    href={note.pdfUrl}
                    download
                    className="inline-flex items-center rounded-md bg-gray-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                  >
                    Download
                  </a>
                  {typeof note.download_count === "number" && (
                    <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70">
                      Downloads: {note.download_count}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!notesWithUrls.length && (
          <div className="mt-6 rounded-xl border border-dashed border-white/15 bg-white/[0.04] p-6 text-center text-white/70">
            No notes yet for this creator.
          </div>
        )}
      </section>
    </main>
  );
}
