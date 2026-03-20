"use client";
import { useState, useEffect, useCallback } from "react";

interface WeeklyTrend {
  thisWeek: number;
  lastWeek: number;
}

interface RecentSignup {
  email: string;
  phone: string | null;
  created: string;
}

interface DashboardStats {
  totalSubscribers: number;
  smsSubscribers: number;
  weeklyTrend: WeeklyTrend;
  recentSignups: RecentSignup[];
  errors: string[];
}

function TrendBadge({ thisWeek, lastWeek }: WeeklyTrend) {
  if (lastWeek === 0 && thisWeek === 0) return <span className="text-sm text-white/40">No data yet</span>;
  if (lastWeek === 0) return <span className="text-sm text-lime">New signups this week</span>;
  const pct = Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
  const up = pct >= 0;
  return (
    <span className={`text-sm font-semibold ${up ? "text-lime" : "text-pink"}`}>
      {up ? "+" : ""}{pct}% vs last week
    </span>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/[0.06] border border-white/[0.08] p-6 flex flex-col gap-2">
      <p className="text-sm font-medium text-white/50 uppercase tracking-wider">{label}</p>
      <p className="text-4xl font-bold text-white font-sans">{value}</p>
      {sub && <div className="mt-1">{sub}</div>}
    </div>
  );
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const show = Math.min(3, local.length);
  return local.slice(0, show) + "***@" + domain;
}

export default function Dashboard() {
  const [authed, setAuthed] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Check auth from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("key") === "shroome2026") {
      setAuthed(true);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/dashboard/stats?key=shroome2026");
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();
      setStats(data);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchStats();
  }, [authed, fetchStats]);

  // ─── Auth gate ────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#1B1F3B" }}>
        <div className="text-center">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "#FDF4EE", fontFamily: "'Syne', system-ui, sans-serif" }}
          >
            shroom&eacute; dashboard
          </h1>
          <p className="text-white/40 text-sm mb-8">
            Add <code className="bg-white/10 px-2 py-0.5 rounded text-xs">?key=shroome2026</code> to the URL to access.
          </p>
          <div className="w-8 h-0.5 mx-auto rounded" style={{ background: "#C8FF3A" }} />
        </div>
      </div>
    );
  }

  // ─── Dashboard ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: "#1B1F3B", fontFamily: "'Syne', system-ui, sans-serif" }}>
      {/* Header */}
      <header className="border-b border-white/[0.08] px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ background: "#C8FF3A" }}
          />
          <h1 className="text-xl font-bold text-white tracking-tight">
            shroom&eacute; <span className="text-white/30 font-normal">/ dashboard</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {lastRefresh && (
            <span className="text-xs text-white/30">
              Updated {lastRefresh.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={fetchStats}
            disabled={loading}
            className="text-sm px-4 py-2 rounded-lg font-medium transition-all"
            style={{
              background: loading ? "rgba(255,255,255,0.05)" : "rgba(200,255,58,0.12)",
              color: loading ? "rgba(255,255,255,0.3)" : "#C8FF3A",
              border: "1px solid rgba(200,255,58,0.15)",
            }}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {error && (
          <div className="rounded-xl p-4 text-sm" style={{ background: "rgba(255,112,67,0.12)", color: "#FF7043", border: "1px solid rgba(255,112,67,0.2)" }}>
            {error}
          </div>
        )}

        {/* ── Waitlist Stats ── */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#FFB7D1" }}>
            Waitlist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              label="Total Subscribers"
              value={stats?.totalSubscribers ?? "--"}
              sub={
                stats?.weeklyTrend ? (
                  <TrendBadge {...stats.weeklyTrend} />
                ) : null
              }
            />
            <StatCard
              label="SMS Opt-ins"
              value={stats?.smsSubscribers ?? "--"}
              sub={
                stats && stats.totalSubscribers > 0 ? (
                  <span className="text-sm text-white/40">
                    {Math.round((stats.smsSubscribers / stats.totalSubscribers) * 100)}% of subscribers
                  </span>
                ) : null
              }
            />
            <StatCard
              label="This Week"
              value={stats?.weeklyTrend?.thisWeek ?? "--"}
              sub={
                <span className="text-sm text-white/40">
                  Last week: {stats?.weeklyTrend?.lastWeek ?? "--"}
                </span>
              }
            />
          </div>
        </section>

        {/* ── Recent Signups ── */}
        {stats?.recentSignups && stats.recentSignups.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#FFB7D1" }}>
              Recent Signups
            </h2>
            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] overflow-hidden">
              <div className="divide-y divide-white/[0.06]">
                {stats.recentSignups.map((s, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          background: s.phone ? "rgba(200,255,58,0.15)" : "rgba(255,183,209,0.12)",
                          color: s.phone ? "#C8FF3A" : "#FFB7D1",
                        }}
                      >
                        {s.phone ? "SMS" : "E"}
                      </div>
                      <div>
                        <p className="text-sm text-white/80 font-medium">{maskEmail(s.email)}</p>
                        {s.phone && (
                          <p className="text-xs text-white/30">+ phone</p>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-white/30">{timeAgo(s.created)}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Traffic Overview ── */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#FFB7D1" }}>
            Traffic
          </h2>
          <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-6">
            <p className="text-white/50 text-sm mb-4">
              Google Analytics is tracking all page views, scroll depth, section visibility, and signup funnel events.
            </p>
            <a
              href="https://analytics.google.com/analytics/web/#/p/G-60FPK4E1PF"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: "#C8FF3A" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#d4ff6a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#C8FF3A")}
            >
              View full analytics in Google Analytics
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 2.625H2.625V11.375H11.375V8.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.75 2.625H11.375V5.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.375 2.625L6.125 7.875" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4">
                <p className="text-xs text-white/40 mb-1">Events tracked</p>
                <ul className="text-xs text-white/60 space-y-1">
                  <li>waitlist_email_submit</li>
                  <li>waitlist_phone_submit</li>
                  <li>section_view (hero, benefits, etc.)</li>
                  <li>scroll_depth (25/50/75/100%)</li>
                </ul>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4">
                <p className="text-xs text-white/40 mb-1">Conversion funnel</p>
                <ul className="text-xs text-white/60 space-y-1">
                  <li>Page load</li>
                  <li>Scroll to form</li>
                  <li>Email entered</li>
                  <li>Phone added (bonus)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Quick Actions ── */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#FFB7D1" }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickAction
              title="Preview Welcome Email"
              desc="See the email new subscribers receive"
              href="/api/preview-email?type=welcome"
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M2 6l8 5 8-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              }
            />
            <QuickAction
              title="Preview Sachet Email"
              desc="See the sachet education email"
              href="/api/preview-email?type=sachet"
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="5" y="2" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M8 7h4M8 10h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              }
            />
            <QuickAction
              title="View in Klaviyo"
              desc="Manage subscribers & flows"
              href="https://www.klaviyo.com/lists"
              external
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.3"/><path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              }
            />
          </div>
        </section>

        {/* ── Errors (if any) ── */}
        {stats?.errors && stats.errors.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#FF7043" }}>
              Warnings
            </h2>
            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5 space-y-2">
              {stats.errors.map((err, i) => (
                <p key={i} className="text-xs text-white/40 font-mono">{err}</p>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="pt-6 pb-10 border-t border-white/[0.06] flex items-center justify-between">
          <p className="text-xs text-white/20">
            shroom&eacute; founder dashboard
          </p>
          <a
            href="/"
            className="text-xs text-white/20 hover:text-white/40 transition-colors"
          >
            Back to site
          </a>
        </footer>
      </main>
    </div>
  );
}

function QuickAction({
  title,
  desc,
  href,
  icon,
  external,
}: {
  title: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : undefined}
      className="group rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5 flex flex-col gap-3 transition-all hover:bg-white/[0.07] hover:border-white/[0.12]"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center"
        style={{ background: "rgba(200,255,58,0.1)", color: "#C8FF3A" }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-white group-hover:text-white/90 flex items-center gap-1.5">
          {title}
          {external && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-40">
              <path d="M3.75 1.875H1.875V8.125H8.125V6.25" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.25 1.875H8.125V3.75" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.125 1.875L4.375 5.625" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </p>
        <p className="text-xs text-white/35 mt-0.5">{desc}</p>
      </div>
    </a>
  );
}
