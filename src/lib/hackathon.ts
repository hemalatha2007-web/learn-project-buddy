export type Domain = "AI" | "Web" | "IoT" | "Cyber" | "Cloud" | "Data";

export interface ProjectIdea {
  id: string;
  name: string;
  domain: Domain;
  description: string;
  tech: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  features: string[];
}

export const DOMAIN_META: Record<Domain, { icon: string; label: string }> = {
  AI: { icon: "🤖", label: "Artificial Intelligence" },
  Web: { icon: "🌐", label: "Web Development" },
  IoT: { icon: "📡", label: "IoT" },
  Cyber: { icon: "🔐", label: "Cybersecurity" },
  Cloud: { icon: "☁️", label: "Cloud" },
  Data: { icon: "📊", label: "Data Science" },
};

export const PROJECTS: ProjectIdea[] = [
  {
    id: "ai-chatbot",
    name: "AI Chatbot Project",
    domain: "AI",
    description: "A conversational assistant that answers student and college related questions.",
    tech: ["Python", "AI/ML", "NLP", "HTML", "CSS", "JavaScript"],
    difficulty: "Intermediate",
    features: [
      "Student FAQ chatbot",
      "College information",
      "Course information",
      "Event information",
      "AI-based question answering",
    ],
  },
  {
    id: "ai-study-assistant",
    name: "AI Study Assistant",
    domain: "AI",
    description: "Generates summaries, quizzes and study plans from your notes.",
    tech: ["Python", "NLP", "React", "AI/ML"],
    difficulty: "Intermediate",
    features: ["Note summarisation", "Quiz generation", "Daily study plan", "Progress tracking"],
  },
  {
    id: "performance-predictor",
    name: "Student Performance Predictor",
    domain: "AI",
    description: "Predicts academic outcomes using attendance and internal marks.",
    tech: ["Python", "scikit-learn", "Pandas", "Flask"],
    difficulty: "Advanced",
    features: ["Risk scoring", "Attendance analysis", "Mentor alerts", "Visual reports"],
  },
  {
    id: "college-management",
    name: "Smart College Management System",
    domain: "Web",
    description: "One portal for attendance, marks, circulars and department workflows.",
    tech: ["HTML/CSS", "JavaScript", "SQL", "Node.js"],
    difficulty: "Intermediate",
    features: ["Role based login", "Attendance module", "Marks entry", "Circular board", "Reports"],
  },
  {
    id: "event-management",
    name: "Online Event Management",
    domain: "Web",
    description: "Symposium and hackathon registration with QR check-in.",
    tech: ["JavaScript", "SQL", "React"],
    difficulty: "Beginner",
    features: ["Event listing", "Registration", "QR check-in", "Certificates"],
  },
  {
    id: "collab-portal",
    name: "Student Collaboration Portal",
    domain: "Web",
    description: "Find teammates, share resources and manage project tasks.",
    tech: ["React", "SQL", "JavaScript"],
    difficulty: "Intermediate",
    features: ["Team finder", "Task board", "Resource sharing", "Chat"],
  },
  {
    id: "campus-monitoring",
    name: "Smart Campus Monitoring System",
    domain: "IoT",
    description: "Sensor network that monitors campus environment and safety in real time.",
    tech: ["IoT", "Arduino", "Python", "MQTT"],
    difficulty: "Intermediate",
    features: ["Sensor dashboard", "Real time alerts", "Air quality tracking", "Historical charts"],
  },
  {
    id: "smart-classroom",
    name: "Smart Classroom",
    domain: "IoT",
    description: "Automates lights, fans and attendance based on occupancy.",
    tech: ["IoT", "ESP32", "Python"],
    difficulty: "Intermediate",
    features: ["Occupancy sensing", "Auto appliance control", "RFID attendance", "Usage stats"],
  },
  {
    id: "energy-monitoring",
    name: "Smart Energy Monitoring",
    domain: "IoT",
    description: "Tracks block-wise power consumption and flags wastage.",
    tech: ["IoT", "Sensors", "Cloud", "JavaScript"],
    difficulty: "Advanced",
    features: ["Live power meter", "Wastage alerts", "Monthly reports", "Cost estimation"],
  },
  {
    id: "cyber-awareness",
    name: "Cybersecurity Awareness System",
    domain: "Cyber",
    description: "Interactive training platform that teaches safe digital habits.",
    tech: ["JavaScript", "HTML/CSS", "Cybersecurity", "SQL"],
    difficulty: "Beginner",
    features: ["Awareness modules", "Quiz and scoring", "Threat simulations", "Certificates"],
  },
  {
    id: "phishing-platform",
    name: "Phishing Awareness Platform",
    domain: "Cyber",
    description: "Simulates phishing mails and trains students to spot them.",
    tech: ["Python", "Cybersecurity", "SQL"],
    difficulty: "Intermediate",
    features: ["Mock phishing campaigns", "Click analytics", "Learning tips", "Leaderboard"],
  },
  {
    id: "password-education",
    name: "Secure Password Education Platform",
    domain: "Cyber",
    description: "Teaches password hygiene with a live strength analyser.",
    tech: ["JavaScript", "Cybersecurity", "HTML/CSS"],
    difficulty: "Beginner",
    features: ["Strength meter", "Breach awareness", "Passphrase generator", "Practice quiz"],
  },
  {
    id: "cloud-files",
    name: "Cloud File Management System",
    domain: "Cloud",
    description: "Department-wise secure file storage with sharing controls.",
    tech: ["Cloud Computing", "Node.js", "SQL"],
    difficulty: "Intermediate",
    features: ["Upload/download", "Access control", "Version history", "Search"],
  },
  {
    id: "cloud-portal",
    name: "Cloud-Based Student Portal",
    domain: "Cloud",
    description: "Scalable student portal hosted fully on cloud services.",
    tech: ["Cloud Computing", "React", "SQL"],
    difficulty: "Intermediate",
    features: ["Single sign-on", "Marks & attendance", "Notifications", "Auto scaling"],
  },
  {
    id: "cloud-attendance",
    name: "Cloud Attendance System",
    domain: "Cloud",
    description: "Face or QR based attendance synced to the cloud instantly.",
    tech: ["Cloud Computing", "Python", "JavaScript"],
    difficulty: "Advanced",
    features: ["QR/face check-in", "Live sync", "Defaulter list", "Export reports"],
  },
  {
    id: "student-utility",
    name: "Student Utility Application",
    domain: "Data",
    description: "All-in-one helper app with timetable, CGPA calculator and notes.",
    tech: ["JavaScript", "HTML/CSS", "SQL"],
    difficulty: "Beginner",
    features: ["Timetable", "CGPA calculator", "Notes vault", "Reminders", "Expense tracker"],
  },
];

export const SKILLS = [
  "Python",
  "C++",
  "Java",
  "JavaScript",
  "HTML/CSS",
  "SQL",
  "AI/ML",
  "IoT",
  "Cybersecurity",
  "Cloud Computing",
];

export const INTERESTS = [
  "Artificial Intelligence",
  "Web Development",
  "Mobile Development",
  "IoT",
  "Cybersecurity",
  "Cloud Computing",
  "Data Science",
];

export interface StoredUser {
  fullName: string;
  email: string;
  password: string;
  college: string;
  department: string;
  year: string;
}

export interface Profile {
  fullName: string;
  email: string;
  college: string;
  department: string;
  year: string;
  avatar: string;
  skills: string[];
  interests: string[];
}

export const QUESTIONS = [
  { id: "ai", text: "Are you interested in Artificial Intelligence?" },
  { id: "python", text: "Do you know Python programming?" },
  { id: "web", text: "Are you interested in Web Development?" },
  { id: "db", text: "Do you like working with databases?" },
  { id: "iot", text: "Are you interested in IoT and automation?" },
  { id: "cyber", text: "Are you interested in Cybersecurity?" },
] as const;

export type Answers = Partial<Record<(typeof QUESTIONS)[number]["id"], boolean>>;

export interface Recommendation {
  projectId: string;
  reason: string;
  at: number;
}

export function runExpertSystem(a: Answers): Recommendation {
  const at = Date.now();
  if (a.ai && a.python)
    return {
      projectId: "ai-chatbot",
      reason:
        "You are interested in Artificial Intelligence and have Python knowledge, so an AI chatbot is a suitable project for your skill set.",
      at,
    };
  if (a.web && a.db)
    return {
      projectId: "college-management",
      reason:
        "You enjoy web development and working with databases, so a data-driven college management system fits you perfectly.",
      at,
    };
  if (a.iot)
    return {
      projectId: "campus-monitoring",
      reason:
        "Your interest in IoT and automation makes a sensor-driven smart campus monitoring system an ideal hackathon build.",
      at,
    };
  if (a.cyber)
    return {
      projectId: "cyber-awareness",
      reason:
        "You are interested in Cybersecurity, so an awareness and training platform lets you showcase security knowledge.",
      at,
    };
  return {
    projectId: "student-utility",
    reason:
      "Based on your answers, a broad and practical student utility application is the best starting point for your hackathon.",
    at,
  };
}

/* ---------------- localStorage helpers ---------------- */

const K = {
  users: "hie_users",
  session: "hie_session",
  profile: (email: string) => `hie_profile_${email}`,
  answers: (email: string) => `hie_answers_${email}`,
  rec: (email: string) => `hie_rec_${email}`,
};

const safe = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const put = (key: string, value: unknown) => {
  if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(value));
};

export const getUsers = () => safe<StoredUser[]>(K.users, []);
export const saveUser = (u: StoredUser) => {
  const users = getUsers().filter((x) => x.email.toLowerCase() !== u.email.toLowerCase());
  users.push(u);
  put(K.users, users);
};
export const findUser = (id: string) =>
  getUsers().find(
    (u) =>
      u.email.toLowerCase() === id.toLowerCase() ||
      u.fullName.toLowerCase() === id.toLowerCase(),
  );

export const getSession = () => safe<string | null>(K.session, null);
export const setSession = (email: string) => put(K.session, email);
export const clearSession = () => {
  if (typeof window !== "undefined") localStorage.removeItem(K.session);
};

export const getProfile = (email: string) => safe<Profile | null>(K.profile(email), null);
export const saveProfile = (p: Profile) => put(K.profile(p.email), p);

export const getAnswers = (email: string) => safe<Answers>(K.answers(email), {});
export const saveAnswers = (email: string, a: Answers) => put(K.answers(email), a);

export const getRecommendation = (email: string) =>
  safe<Recommendation | null>(K.rec(email), null);
export const saveRecommendation = (email: string, r: Recommendation) => put(K.rec(email), r);

export const profileCompletion = (p: Profile | null) => {
  if (!p) return 0;
  const checks = [
    !!p.fullName,
    !!p.email,
    !!p.college,
    !!p.department,
    !!p.year,
    !!p.avatar,
    p.skills.length > 0,
    p.interests.length > 0,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
};

export const getProject = (id: string) => PROJECTS.find((p) => p.id === id);
