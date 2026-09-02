import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, useAuthProfile } from "@/components/AppShell";
import {
  QUESTIONS,
  getAnswers,
  runExpertSystem,
  saveAnswers,
  saveRecommendation,
  type Answers,
} from "@/lib/hackathon";

export const Route = createFileRoute("/find")({
  component: FindProject,
  head: () => ({
    meta: [
      { title: "Expert System Questionnaire · Hackathon Idea Expert" },
      {
        name: "description",
        content: "Answer six questions and let the rule-based expert system match your project.",
      },
      { property: "og:title", content: "Find My Hackathon Project" },
      {
        property: "og:description",
        content: "A six-question expert system that recommends your ideal hackathon project.",
      },
    ],
  }),
});

function FindProject() {
  const { profile, ready } = useAuthProfile();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Answers>({});
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile) setAnswers(getAnswers(profile.email));
  }, [profile]);

  if (!ready || !profile) return null;

  const answeredCount = QUESTIONS.filter((q) => answers[q.id] !== undefined).length;
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

  const pick = (id: (typeof QUESTIONS)[number]["id"], value: boolean) => {
    setError("");
    setAnswers((a) => ({ ...a, [id]: value }));
  };

  const submit = () => {
    if (answeredCount < QUESTIONS.length) {
      setError("Please answer all questions before running the expert system.");
      return;
    }
    setAnalyzing(true);
    saveAnswers(profile.email, answers);
    const rec = runExpertSystem(answers);
    saveRecommendation(profile.email, rec);
    setTimeout(() => navigate({ to: "/recommendation" }), 1200);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Expert System Questionnaire</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Answer honestly — the rule engine uses these facts to infer your best project.
        </p>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full btn-brand transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {answeredCount} / {QUESTIONS.length} answered
        </p>

        <div className="mt-6 space-y-4">
          {QUESTIONS.map((q, i) => (
            <div key={q.id} className="glass card-hover flex flex-wrap items-center justify-between gap-4 p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-sm">
                  {i + 1}
                </span>
                <p className="font-medium">{q.text}</p>
              </div>
              <div className="flex gap-2">
                {[true, false].map((val) => {
                  const on = answers[q.id] === val;
                  return (
                    <button
                      key={String(val)}
                      onClick={() => pick(q.id, val)}
                      className={`min-w-20 rounded-xl border px-4 py-2 text-sm transition-all ${
                        on
                          ? "border-transparent btn-brand font-semibold"
                          : "border-border bg-secondary/40 text-muted-foreground hover:border-primary hover:text-foreground"
                      }`}
                    >
                      {val ? "Yes" : "No"}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        <button
          onClick={submit}
          disabled={analyzing}
          className="mt-6 w-full rounded-xl btn-brand py-4 text-lg font-semibold disabled:opacity-70"
        >
          {analyzing ? "🤖 Analyzing your profile..." : "Get My Recommendation"}
        </button>

        {analyzing && (
          <p className="mt-3 animate-pulse text-center text-sm text-muted-foreground">
            Matching facts against expert rules…
          </p>
        )}
      </div>
    </AppShell>
  );
}
