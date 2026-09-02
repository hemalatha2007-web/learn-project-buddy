import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, useAuthProfile } from "@/components/AppShell";
import {
  PROJECTS,
  getAnswers,
  getRecommendation,
  getProject,
  profileCompletion,
} from "@/lib/hackathon";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard · Hackathon Idea Expert" },
      {
        name: "description",
        content: "Track your profile completion, skills and hackathon project recommendations.",
      },
      { property: "og:title", content: "Dashboard · Hackathon Idea Expert" },
      {
        property: "og:description",
        content: "Your personalised hackathon readiness overview.",
      },
    ],
  }),
});

function Dashboard() {
  const { profile, ready } = useAuthProfile();
  if (!ready || !profile) return null;

  const pct = profileCompletion(profile);
  const rec = getRecommendation(profile.email);
  const answered = Object.keys(getAnswers(profile.email)).length;
  const recommended = rec ? getProject(rec.projectId) : undefined;

  const stats = [
    { icon: "🎯", label: "Skills Selected", value: profile.skills.length },
    { icon: "💡", label: "Project Ideas", value: PROJECTS.length },
    { icon: "🤖", label: "Recommendations", value: rec ? 1 : 0 },
    { icon: "🏆", label: "Hackathon Ready", value: `${Math.min(100, Math.round((pct + (rec ? 100 : 0)) / 2))}%` },
  ];

  return (
    <AppShell>
      <section className="glass mb-6 p-7">
        <p className="text-sm text-muted-foreground">
          {profile.department} · {profile.year} · {profile.college}
        </p>
        <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
          Welcome, <span className="gradient-text">{profile.fullName || "Student"}</span> 👋
        </h1>

        <div className="mt-6 max-w-xl">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Profile Completion</span>
            <span className="font-semibold text-primary">{pct}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full btn-brand transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          {pct < 100 && (
            <Link to="/profile" className="mt-2 inline-block text-xs text-primary hover:underline">
              Complete your profile →
            </Link>
          )}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/find" className="rounded-xl btn-brand px-6 py-3 font-semibold">
            Find My Hackathon Project
          </Link>
          <Link
            to="/ideas"
            className="rounded-xl border border-border px-6 py-3 font-medium hover:border-primary"
          >
            Explore Project Ideas
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass card-hover p-5">
            <div className="text-2xl">{s.icon}</div>
            <div className="mt-3 text-3xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="glass p-6">
          <h2 className="text-lg font-semibold">Expert System Status</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {answered > 0
              ? `${answered} of 6 questions answered.`
              : "You haven't taken the questionnaire yet."}
          </p>
          <Link to="/find" className="mt-4 inline-block text-sm text-primary hover:underline">
            {answered > 0 ? "Review answers →" : "Start questionnaire →"}
          </Link>
        </div>

        <div className="glass p-6">
          <h2 className="text-lg font-semibold">Latest Recommendation</h2>
          {recommended ? (
            <>
              <p className="mt-2 text-xl font-semibold gradient-text">{recommended.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{recommended.description}</p>
              <Link
                to="/recommendation"
                className="mt-4 inline-block text-sm text-primary hover:underline"
              >
                View recommendation →
              </Link>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Run the expert system to get your matched project.
            </p>
          )}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold">Your interests</h2>
        <div className="flex flex-wrap gap-2">
          {profile.interests.length ? (
            profile.interests.map((i) => (
              <span key={i} className="rounded-full bg-secondary px-4 py-2 text-sm">
                {i}
              </span>
            ))
          ) : (
            <Link to="/profile" className="text-sm text-primary hover:underline">
              Add your areas of interest →
            </Link>
          )}
        </div>
      </section>
    </AppShell>
  );
}
