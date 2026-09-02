import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, useAuthProfile } from "@/components/AppShell";
import {
  INTERESTS,
  SKILLS,
  profileCompletion,
  saveProfile,
  type Profile,
} from "@/lib/hackathon";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [
      { title: "Student Profile · Hackathon Idea Expert" },
      {
        name: "description",
        content: "Manage your student details, technical skills and areas of interest.",
      },
      { property: "og:title", content: "Student Profile · Hackathon Idea Expert" },
      {
        property: "og:description",
        content: "Keep your skills and interests updated for sharper project recommendations.",
      },
    ],
  }),
});

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

function ProfilePage() {
  const { profile, setProfile, ready } = useAuthProfile();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(true);
  const [saved, setSaved] = useState(false);

  if (!ready || !profile) return null;

  const update = (patch: Partial<Profile>) => {
    setProfile({ ...profile, ...patch });
    setSaved(false);
  };

  const toggle = (key: "skills" | "interests", value: string) => {
    const list = profile[key];
    update({
      [key]: list.includes(value) ? list.filter((x) => x !== value) : [...list, value],
    } as Partial<Profile>);
  };

  const onSave = () => {
    saveProfile(profile);
    setSaved(true);
    setEditing(false);
  };

  const pct = profileCompletion(profile);
  const field =
    "w-full rounded-xl border border-input bg-secondary/40 px-4 py-2.5 text-sm outline-none focus:border-primary disabled:opacity-70";

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Student Profile</h1>
          <p className="text-sm text-muted-foreground">
            Profile completion: <span className="text-primary">{pct}%</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setEditing((v) => !v)}
            className="rounded-xl border border-border px-4 py-2.5 text-sm hover:border-primary"
          >
            {editing ? "Cancel Edit" : "Edit Profile"}
          </button>
          <button onClick={onSave} className="rounded-xl btn-brand px-5 py-2.5 text-sm font-semibold">
            Save Profile
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <section className="glass p-6">
          <h2 className="mb-4 text-lg font-semibold">Personal Information</h2>
          <div className="flex flex-col items-center gap-3">
            <div className="grid size-24 place-items-center overflow-hidden rounded-full btn-brand text-3xl font-bold">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile" className="size-full object-cover" />
              ) : (
                (profile.fullName || "S").charAt(0).toUpperCase()
              )}
            </div>
            {editing && (
              <label className="cursor-pointer text-xs text-primary hover:underline">
                Upload profile picture
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => update({ avatar: String(reader.result) });
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
            )}
          </div>

          <div className="mt-5 space-y-3">
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Full Name</label>
              <input
                disabled={!editing}
                value={profile.fullName}
                onChange={(e) => update({ fullName: e.target.value })}
                className={field}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Email</label>
              <input disabled value={profile.email} className={field} />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">College Name</label>
              <input
                disabled={!editing}
                value={profile.college}
                onChange={(e) => update({ college: e.target.value })}
                className={field}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Department</label>
              <input
                disabled={!editing}
                value={profile.department}
                onChange={(e) => update({ department: e.target.value })}
                className={field}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Year of Study</label>
              <select
                disabled={!editing}
                value={profile.year}
                onChange={(e) => update({ year: e.target.value })}
                className={field}
              >
                {YEARS.map((y) => (
                  <option key={y} value={y} className="bg-card">
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <section className="glass p-6">
            <h2 className="mb-1 text-lg font-semibold">Technical Skills</h2>
            <p className="mb-4 text-sm text-muted-foreground">Select everything you can work with.</p>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s) => {
                const on = profile.skills.includes(s);
                return (
                  <button
                    key={s}
                    disabled={!editing}
                    onClick={() => toggle("skills", s)}
                    className={`rounded-full border px-4 py-2 text-sm transition-all ${
                      on
                        ? "border-transparent btn-brand font-medium"
                        : "border-border bg-secondary/40 text-muted-foreground hover:border-primary hover:text-foreground"
                    } disabled:opacity-70`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="glass p-6">
            <h2 className="mb-1 text-lg font-semibold">Areas of Interest</h2>
            <p className="mb-4 text-sm text-muted-foreground">Multiple selections allowed.</p>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((s) => {
                const on = profile.interests.includes(s);
                return (
                  <button
                    key={s}
                    disabled={!editing}
                    onClick={() => toggle("interests", s)}
                    className={`rounded-full border px-4 py-2 text-sm transition-all ${
                      on
                        ? "border-transparent btn-brand font-medium"
                        : "border-border bg-secondary/40 text-muted-foreground hover:border-primary hover:text-foreground"
                    } disabled:opacity-70`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </section>

          <div className="flex flex-wrap items-center gap-3">
            {saved && <span className="text-sm text-success">Profile saved successfully ✓</span>}
            <button
              onClick={() => {
                saveProfile(profile);
                navigate({ to: "/dashboard" });
              }}
              className="rounded-xl btn-brand px-6 py-3 font-semibold"
            >
              Continue to Dashboard →
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
