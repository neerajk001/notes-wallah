// src/app/page.tsx
import Link from "next/link";

// Revalidate every 60 seconds
export const revalidate = 60;

// Metadata for SEO
export const metadata = {
  title: "Notes Wallah",
  description: "A curated collection of handwritten student notes for quick revision.",
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background gradient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, #7c3aed 0%, rgba(124,58,237,0) 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, #22d3ee 0%, rgba(34,211,238,0) 70%)",
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[680px] w-[680px] rounded-full blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, #f59e0b 0%, rgba(245,158,11,0) 70%)",
          }}
        />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 via-sky-400 to-emerald-400 shadow-md" />
          <span className="text-lg font-semibold tracking-tight">Notes Wallah</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/creator"
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 backdrop-blur-md transition hover:bg-white/10"
          >
            Browse Notes
          </Link>
          <a
            href="#features"
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/70 hover:text-white transition"
          >
            Features
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-8 pb-20 sm:pt-14 md:pt-20">
        {/* Glass card */}
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]">
          <h1 className="text-center text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              Notes Wallah
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/70 md:text-xl">
            A premium hub for handwritten, student-made notes — perfect for quick revision before class, quizzes, and exams.
          </p>

          {/* CTA */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/creator"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 px-6 py-3 font-semibold text-black shadow-lg transition hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.7)]"
            >
              Get All Notes
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          {/* Quick badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
              Handwritten & Concise
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
              Class-tested
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
              Fast Revision
            </span>
          </div>
        </div>

        {/* Feature Cards */}
        <div id="features" className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md transition hover:bg-white/[0.09]">
            <div className="mb-3 h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600" />
            <h3 className="text-lg font-semibold">Curated by Students</h3>
            <p className="mt-1 text-sm text-white/70">Real class notes refined for clarity, accuracy, and speed.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md transition hover:bg-white/[0.09]">
            <div className="mb-3 h-10 w-10 rounded-lg bg-gradient-to-br from-sky-400 to-cyan-400" />
            <h3 className="text-lg font-semibold">Quick Revision First</h3>
            <p className="mt-1 text-sm text-white/70">Bite-sized summaries and diagrams that save time.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md transition hover:bg-white/[0.09]">
            <div className="mb-3 h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500" />
            <h3 className="text-lg font-semibold">Download & Go</h3>
            <p className="mt-1 text-sm text-white/70">PDFs and Markdown for offline access and Notion.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-sm text-white/60">
          <span>© {new Date().getFullYear()} Notes Wallah</span>
          <div className="flex items-center gap-4">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <Link href="/note" className="hover:text-white">
              Browse Notes
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
