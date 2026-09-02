import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { findUser, setSession } from "@/lib/hackathon";
import heroImg from "@/assets/hero-ai.jpg";

export const Route = createFileRoute("/")({
  component: Login,
  head: () => ({
    meta: [
      { title: "Login · Hackathon Idea Expert" },
      {
        name: "description",
        content:
          "Sign in to the Hackathon Project Idea Recommendation Expert System and find the right project for your skills.",
      },
      { property: "og:title", content: "Hackathon Idea Expert · Login" },
      {
        property: "og:description",
        content: "Find the right hackathon project for your skills and interests.",
      },
    ],
  }),
});

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [hint, setHint] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("hie_remember");
    if (saved) setId(saved);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const user = findUser(id.trim());
    if (!user || user.password !== password) {
      setError("Invalid credentials. Please check your details or create an account.");
      return;
    }
    if (remember) localStorage.setItem("hie_remember", user.email);
    else localStorage.removeItem("hie_remember");
    setSession(user.email);
    navigate({ to: "/profile" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md animate-rise">
          <div className="mb-8 flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl btn-brand text-2xl">⚡</span>
            <div>
              <h1 className="gradient-text text-2xl font-bold tracking-tight">
                HACKATHON IDEA EXPERT
              </h1>
              <p className="text-sm text-muted-foreground">
                Find the right project for your skills and interests.
              </p>
            </div>
          </div>

          <form onSubmit={submit} className="glass space-y-4 p-6">
            <div>
              <label className="mb-1.5 block text-sm text-muted-foreground">Email / Username</label>
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                className="w-full rounded-xl border border-input bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary"
                placeholder="you@college.edu"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-muted-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-input bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="size-4 accent-[var(--primary)]"
                />
                Remember Me
              </label>
              <button
                type="button"
                onClick={() =>
                  setHint("Password recovery is not available in this demo. Please register again.")
                }
                className="text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
            {hint && <p className="text-sm text-warning">{hint}</p>}

            <button type="submit" className="w-full rounded-xl btn-brand py-3 font-semibold">
              Login
            </button>
            <Link
              to="/register"
              className="block rounded-xl border border-border py-3 text-center text-sm font-medium hover:border-primary"
            >
              Create Account
            </Link>
            <p className="text-center text-sm text-muted-foreground">
              New here?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Register as a student
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="relative hidden items-center justify-center overflow-hidden lg:flex">
        <img
          src={heroImg}
          alt="Illustration of an AI assistant recommending hackathon project ideas to students"
          className="absolute inset-0 size-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-background/45" />
        <div className="glass relative m-10 max-w-sm p-6">
          <h2 className="text-xl font-semibold">Rule-based expert system</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Answer six quick questions and the engine matches your skills and interests to a
            hackathon-ready project, complete with tech stack and feature list.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {["🤖 AI", "🌐 Web", "📡 IoT", "🔐 Cyber", "☁️ Cloud"].map((t) => (
              <span key={t} className="rounded-full bg-secondary px-3 py-1">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
