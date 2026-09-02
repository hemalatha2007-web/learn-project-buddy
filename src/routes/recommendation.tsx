import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, useAuthProfile } from "@/components/AppShell";
import { DOMAIN_META, getProject, getRecommendation } from "@/lib/hackathon";

export const Route = createFileRoute("/recommendation")({
  component: RecommendationPage,
  head: () => ({
    meta: [
      { title: "My Recommendation · Hackathon Idea Expert" },
      {
        name: "description",
        content: "See the hackathon project the expert system matched to your skills.",
      },
      { property: "og:title", content: "My Recommended Hackathon Project" },
      {
        property: "og:description",
        content: "Your matched project with tech stack, difficulty and suggested features.",
      },
    ],
  }),
});

function RecommendationPage() {
  const { profile, ready } = useAuthProfile();
  if (!ready || !profile) return null;

  const rec = getRecommendation(profile.email);
  const project = rec ? getProject(rec.projectId) : undefined;

  if (!rec || !project) {
    return (
      <AppShell>
        <div className="glass mx-auto max-w-lg p-10 text-center">
          <div className="text-5xl">🤖</div>
          <h1 className="mt-4 text-2xl font-bold">No recommendation yet</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Take the six-question expert system questionnaire to get your match.
          </p>
          <Link to="/find" className="mt-6 inline-block rounded-xl btn-brand px-6 py-3 font-semibold">
            Find My Hackathon Project
          </Link>
        </div>
      </AppShell>
    );
  }

  const meta = DOMAIN_META[project.domain];

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-muted-foreground">🤖 Your Recommended Project</p>
        <h1 className="mt-1 text-4xl font-bold gradient-text">{project.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {meta.icon} {meta.label} · Generated {new Date(rec.at).toLocaleString()}
        </p>

        <section className="glass mt-6 p-6">
          <h2 className="text-lg font-semibold">Why this project?</h2>
          <p className="mt-2 text-muted-foreground">“{rec.reason}”</p>
        </section>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <section className="glass p-6">
            <h2 className="mb-3 text-lg font-semibold">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="rounded-full bg-secondary px-3 py-1.5 text-sm">
                  {t}
                </span>
              ))}
            </div>
          </section>
          <section className="glass p-6">
            <h2 className="mb-3 text-lg font-semibold">Difficulty</h2>
            <span className="rounded-full btn-brand px-4 py-2 text-sm font-semibold">
              {project.difficulty}
            </span>
            <p className="mt-3 text-sm text-muted-foreground">{project.description}</p>
          </section>
        </div>

        <section className="glass mt-4 p-6">
          <h2 className="mb-3 text-lg font-semibold">Suggested Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-primary">◆</span>
                {f}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/projects/$projectId"
            params={{ projectId: project.id }}
            className="rounded-xl btn-brand px-6 py-3 font-semibold"
          >
            View Project Details
          </Link>
          <Link
            to="/find"
            className="rounded-xl border border-border px-6 py-3 font-medium hover:border-primary"
          >
            Try Another Recommendation
          </Link>
          <Link
            to="/ideas"
            className="rounded-xl border border-border px-6 py-3 font-medium hover:border-primary"
          >
            Explore More Ideas
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
