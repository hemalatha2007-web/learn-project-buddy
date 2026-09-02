import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { findUser, getProfile, saveProfile, saveUser, setSession } from "@/lib/hackathon";

export const Route = createFileRoute("/register")({
  component: Register,
  head: () => ({
    meta: [
      { title: "Create Account · Hackathon Idea Expert" },
      {
        name: "description",
        content: "Register as a student to get personalised hackathon project recommendations.",
      },
      { property: "og:title", content: "Student Registration · Hackathon Idea Expert" },
      {
        property: "og:description",
        content: "Create your student account and unlock the project recommendation engine.",
      },
    ],
  }),
});

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
    college: "",
    department: "",
    year: "1st Year",
  });
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    if (findUser(form.email.trim())) return setError("An account with this email already exists.");

    const email = form.email.trim();
    saveUser({
      fullName: form.fullName.trim(),
      email,
      password: form.password,
      college: form.college.trim(),
      department: form.department.trim(),
      year: form.year,
    });
    if (!getProfile(email)) {
      saveProfile({
        fullName: form.fullName.trim(),
        email,
        college: form.college.trim(),
        department: form.department.trim(),
        year: form.year,
        avatar: "",
        skills: [],
        interests: [],
      });
    }
    setSession(email);
    navigate({ to: "/profile" });
  };

  const field = "w-full rounded-xl border border-input bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary";

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl animate-rise">
        <div className="mb-6 text-center">
          <h1 className="gradient-text text-3xl font-bold">Student Registration</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A few details and the expert system is ready for you.
          </p>
        </div>

        <form onSubmit={submit} className="glass grid gap-4 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm text-muted-foreground">Full Name</label>
            <input required value={form.fullName} onChange={set("fullName")} className={field} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm text-muted-foreground">Email</label>
            <input required type="email" value={form.email} onChange={set("email")} className={field} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">Password</label>
            <input required type="password" value={form.password} onChange={set("password")} className={field} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">Confirm Password</label>
            <input required type="password" value={form.confirm} onChange={set("confirm")} className={field} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">College Name</label>
            <input required value={form.college} onChange={set("college")} className={field} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">Department</label>
            <input required value={form.department} onChange={set("department")} className={field} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm text-muted-foreground">Year of Study</label>
            <select value={form.year} onChange={set("year")} className={field}>
              {YEARS.map((y) => (
                <option key={y} value={y} className="bg-card">
                  {y}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="sm:col-span-2 text-sm text-destructive">{error}</p>}

          <button type="submit" className="sm:col-span-2 rounded-xl btn-brand py-3 font-semibold">
            Create Account
          </button>
          <p className="sm:col-span-2 text-center text-sm text-muted-foreground">
            Already registered?{" "}
            <Link to="/" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
