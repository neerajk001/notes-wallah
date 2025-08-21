// src/app/creator/page.tsx
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

export const revalidate = 30;

type Creator = { name: string; slug: string | null };

export default async function CreatorListPage() {
  const { data: creators, error } = await supabase
    .from("creators")
    .select("name, slug") // must include slug
    .order("name", { ascending: true });

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-5xl p-6">
          <h1 className="text-2xl font-bold mb-4">Creators</h1>
          <p className="text-red-400">Error: {error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* header elided for brevity */}

      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-16 pt-4">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
            Creators
          </span>
        </h1>

        <div className="space-y-3">
          {creators?.map((c: Creator, idx: number) => {
            const slug = c.slug?.trim() || null;
            const card = (
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.10]">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-400 via-sky-400 to-emerald-400 opacity-90" />
                  <span className="text-white font-medium tracking-tight">
                    {c.name}
                  </span>
                </div>
                <span className="text-white/60 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            );

            if (!slug) {
              // No slug: render a disabled-looking card and avoid linking to /creator/null
              return (
                <div
                  key={`creator-${idx}`}
                  className="group block cursor-not-allowed opacity-60"
                  title="Missing slug for this creator"
                >
                  {card}
                </div>
              );
            }

            return (
              <Link key={slug} href={`/creator/${slug}`} className="group block">
                {card}
              </Link>
            );
          })}

          {!creators?.length && (
            <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.04] p-6 text-center text-white/70">
              No creators yet. Add one in the database.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
