import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, useAuthProfile } from "@/components/AppShell";
import { DOMAIN_META, PROJECTS, type Domain } from "@/lib/hackathon";

export const Route = createFileRoute("/ideas")({
  component: Ideas,
  head: () => ({
    meta: [
      { title: "Explore Project Ideas · Hackathon Idea Expert" },
      {
        name: "description",
        content:
          "Browse hackathon project ideas across AI, Web, IoT, Cybersecurity, Cloud and Data Science.",
      },
      { property: "og:title", content: "Explore Hackathon Project Ideas" },
      {
        property: "og:description",
        content: "Curated hackathon project ideas with tech stack and difficulty for every domain.",
      },
    ],
  }),
});

const ORDER: Domain[] = ["AI", "Web", "IoT", "Cyber", "Cloud", "Data"];

function Ideas() {
  const { ready } = useAuthProfile();
  const [filter, setFilter] = useState<Domain | "All">("All");
  if (!ready) return null;

  const domains = filter === "All" ? ORDER : [filter];

  return (
    <AppShell>
      <h1 className="text-3xl font-bold">Explore Project Ideas</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {PROJECTS.length} hackathon-ready ideas organised by domain.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {(["All", ...ORDER] as const).map((d) => {
          const on = filter === d;
          return (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`rounded-full border px-4 py-2 text-sm transition-all ${
                on
                  ? "border-transparent btn-brand font-semibold"
                  : "border-border bg-secondary/40 text-muted-foreground hover:border-primary hover:text-foreground"
              }`}
            >
              {d === "All" ? "All Domains" : `${DOMAIN_META[d].icon} ${DOMAIN_META[d].label}`}
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-10">
        {domains.map((d) => {
          const list = PROJECTS.filter((p) => p.domain === d);
          if (!list.length) return null;
          return (
            <section key={d}>
              <h2 className="mb-4 text-xl font-semibold">
                {DOMAIN_META[d].icon} {DOMAIN_META[d].label}
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => (
                  <article key={p.id} className="glass card-hover flex flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold">{p.name}</h3>
                      <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                        {p.difficulty}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 4).map((t) => (
                        <span key={t} className="rounded-full bg-secondary/70 px-2.5 py-1 text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      to="/projects/$projectId"
                      params={{ projectId: p.id }}
                      className="mt-4 inline-block rounded-xl border border-border px-4 py-2 text-center text-sm hover:border-primary"
                    >
                      View Details
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
