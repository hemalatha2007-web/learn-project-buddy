import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { clearSession, getProfile, getSession, type Profile } from "@/lib/hackathon";

const NAV = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/profile", label: "My Profile" },
  { to: "/find", label: "Find Project" },
  { to: "/ideas", label: "Project Ideas" },
  { to: "/recommendation", label: "My Recommendation" },
] as const;

export function useAuthProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const email = getSession();
    if (!email) {
      navigate({ to: "/" });
      return;
    }
    setProfile(getProfile(email));
    setReady(true);
  }, [navigate]);

  return { profile, setProfile, ready };
}

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const logout = () => {
    clearSession();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="grid size-9 place-items-center rounded-xl btn-brand text-lg">⚡</span>
            <span className="gradient-text text-lg">Hackathon Idea Expert</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-3 py-2 text-sm transition-colors ${
                  pathname === item.to
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={logout}
              className="ml-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
            >
              Logout
            </button>
          </nav>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-border px-3 py-2 text-sm md:hidden"
          >
            ☰
          </button>
        </div>

        {open && (
          <nav className="flex flex-col gap-1 border-t border-border px-4 pb-4 pt-2 md:hidden">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={logout}
              className="rounded-lg px-3 py-2 text-left text-sm text-destructive"
            >
              Logout
            </button>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 animate-rise">{children}</main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        Hackathon Project Idea Recommendation Expert System · Demo build
      </footer>
    </div>
  );
}
