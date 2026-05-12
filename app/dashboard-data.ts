import type { ApiUserId, CallSession, DashboardViewModel } from "./api";

export type StatCard = {
  icon: "sessions" | "duration" | "ai" | "calendar";
  label: string;
  value: string;
};

export type CallItem = {
  id: string;
  dayLabel: string;
  title: string;
  time: string;
  initials: string;
  participants: number;
};

export type StepCard = {
  step: string;
  title: string;
  description: string;
  buttonLabel: string;
};

export type FeedbackEntry = {
  id: string;
  rating: "good" | "bad";
  message: string;
  createdAt: string;
};

export type DashboardVariant = "withCalls" | "empty" | "howItWorks";

export type DashboardState = {
  userId: ApiUserId;
  greetingName: string;
  stats: StatCard[];
  calls: CallItem[];
  hoursUsedText: string;
  variant: DashboardVariant;
  showHowItWorks: boolean;
  usagePercentage: number;
  steps: StepCard[];
};

const defaultSteps: StepCard[] = [
  {
    step: "STEP 1",
    title: "Upload Knowledge",
    description: "Add files and links to train your meeting memory.",
    buttonLabel: "Upload Files",
  },
  {
    step: "STEP 2",
    title: "Start Calling",
    description: "Join or start calls directly from Hintro with AI assistance.",
    buttonLabel: "Start a Call",
  },
  {
    step: "STEP 3",
    title: "View Insights",
    description: "Review notes and action items after the call.",
    buttonLabel: "View Insights",
  },
];

export function createDashboardState(viewModel: DashboardViewModel): DashboardState {
  const { userId, profile, dashboard, stats, callHistory } = viewModel;
  const greetingName = profile.firstName;
  const lastSessionIso = stats.lastSession[0];
  const hasCalls = callHistory.callSessions.length > 0;
  const variant: DashboardVariant = hasCalls ? "withCalls" : userId === "u1" ? "empty" : "howItWorks";
  const usagePercentage = dashboard.usage.kb_files.limit > 0
    ? Math.min(100, Math.round((dashboard.usage.kb_files.used / dashboard.usage.kb_files.limit) * 100))
    : 0;

  return {
    userId,
    greetingName,
    hoursUsedText: `${dashboard.usage.kb_files.used} of ${dashboard.usage.kb_files.limit} hours used`,
    usagePercentage,
    variant,
    showHowItWorks: userId === "u2" && !hasCalls,
    steps: defaultSteps,
    stats: [
      { icon: "sessions", label: "Total Sessions", value: `${stats.totalSessions}` },
      { icon: "duration", label: "Average Duration", value: formatDuration(stats.averageDuration) },
      { icon: "ai", label: "AI Used", value: formatAIInteractions(stats.totalAIInteractions) },
      { icon: "calendar", label: "Last Session", value: formatRelativeSession(lastSessionIso) },
    ],
    calls: callHistory.callSessions.map((call) => mapCallSession(call)),
  };
}

function mapCallSession(call: CallSession): CallItem {
  const startedAt = new Date(call.started_at);
  return {
    id: call._id,
    dayLabel: formatDayLabel(startedAt),
    title: call.description || `${call.client} Call`,
    time: formatTime(startedAt),
    initials: getInitials(call.client),
    participants: Math.max(1, call.participants.length),
  };
}

export function formatDuration(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds <= 0) {
    return "0";
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}sec`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}sec`;
  }

  return `${seconds}sec`;
}

export function formatAIInteractions(total: number): string {
  if (total === 1) {
    return "1 time";
  }
  return `${total} times`;
}

export function formatRelativeSession(lastSessionIso?: string): string {
  if (!lastSessionIso) {
    return "-";
  }

  const lastSessionDate = new Date(lastSessionIso);
  const now = new Date();
  const diffInMs = now.getTime() - lastSessionDate.getTime();
  const diffInDays = Math.max(0, Math.floor(diffInMs / (1000 * 60 * 60 * 24)));

  if (diffInDays === 0) {
    return "today";
  }

  if (diffInDays === 1) {
    return "1 day ago";
  }

  return `${diffInDays} days ago`;
}

function formatDayLabel(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toLowerCase();
}

function getInitials(value: string): string {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "H";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 1).toUpperCase();
  }

  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}
