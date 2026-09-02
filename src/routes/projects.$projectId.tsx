import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AppShell, useAuthProfile } from "@/components/AppShell";
import { DOMAIN_META, PROJECTS, getProject } from "@/lib/hackathon";

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectDetails,
  head: () => ({
    meta: [
      { title: "Project Details · Hackathon Idea Expert" },
      {
        name: "description",
        content: "Full breakdown of a hackathon project: tech stack, difficulty and feature list.",
      },
      { property: "og:title", content: "Project Details · Hackathon Idea Expert" },
      {
        property: "og:description",
        content: "Everything you need to start building this hackathon project.",
      },
    ],
  }),
});

function ProjectDetails() {
  const { projectId } = useParams({ from: "/projects/$projectId" });
  const { ready } = useAuthProfile();
  if (!ready) return null;

  const project = getProject(projectId);

  if (!project) {
    return (
      <AppShell>
        <div className="glass mx-auto max-w-lg p-10 text-center">
          <h1 className="text-2xl font-bold">Project not found</h1>
          <Link to="/ideas" className="mt-6 inline-block rounded-xl btn-brand px-6 py-3 font-semibold">
            Back to Project Ideas
          </Link>
        </div>
      </AppShell>
    );
  }

  const meta = DOMAIN_META[project.domain];
  const related = PROJECTS.filter((p) => p.domain === project.domain && p.id !== project.id);

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <Link to="/ideas" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to all ideas
        </Link>

        <div className="glass mt-4 p-7">
          <p className="text-sm text-muted-foreground">
            {meta.icon} {meta.label}
          </p>
          <h1 className="mt-1 text-3xl font-bold gradient-text">{project.name}</h1>
          <p className="mt-3 text-muted-foreground">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full btn-brand px-4 py-2 text-sm font-semibold">
              {project.difficulty}
            </span>
            {project.tech.map((t) => (
              <span key={t} className="rounded-full bg-secondary px-3 py-2 text-sm">
                {t}
              </span>
            ))}
          </div>
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

        <section className="glass mt-4 p-6">
          <h2 className="mb-3 text-lg font-semibold">Suggested build plan</h2>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>1. Define the problem statement and target users on campus.</li>
            <li>2. Design the data model and core screens.</li>
            <li>3. Build the primary feature end to end first.</li>
            <li>4. Layer the remaining features and polish the UI.</li>
            <li>5. Prepare a 3-minute demo with a clear before/after story.</li>
          </ol>
        </section>

        {related.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-lg font-semibold">More in {meta.label}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to="/projects/$projectId"
                  params={{ projectId: p.id }}
                  className="glass card-hover block p-5"
                >
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
