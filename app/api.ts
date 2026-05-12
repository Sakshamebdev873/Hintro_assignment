export type ApiUserId = "u1" | "u2";

export type UserProfile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  login_method: string;
  status: string;
  is_hintro_admin: boolean;
  createdAt: string;
  updatedAt: string;
};

export type DashboardResponse = {
  user: UserProfile;
  subscription: {
    plan: string;
    billing_cycle: string;
    status: string;
  } | null;
  usage: {
    kb_files: {
      used: number;
      limit: number;
      percentage: number;
    };
    vocab_terms: number;
    notes: number;
  };
};

export type StatsResponse = {
  totalSessions: number;
  averageDuration: number;
  totalAIInteractions: number;
  lastSession: string[];
};

export type CallSession = {
  _id: string;
  user_id: string;
  status: string;
  client: string;
  description: string;
  started_at: string;
  ended_at: string;
  total_duration_seconds: number;
  language: string[];
  auto_gen_ai_response: boolean;
  save_transcript: boolean;
  transcript: string | null;
  transcript_final: boolean;
  ai_interactions: number;
  call_framework_id: string | null;
  participants: Array<{
    name: string;
    isUser: boolean;
  }>;
  ended_reason: string;
  createdAt: string;
  updatedAt: string;
};

export type CallHistoryResponse = {
  callSessions: CallSession[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: false;
  };
};

export type DashboardViewModel = {
  userId: ApiUserId;
  profile: UserProfile;
  dashboard: DashboardResponse;
  stats: StatsResponse;
  callHistory: CallHistoryResponse;
};

async function apiFetch<T>(path: string, userId: ApiUserId): Promise<T> {
  const response = await fetch(`http://localhost:3000${path}`, {
    headers: {
      "x-user-id": userId,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed for ${path}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getDashboardViewModel(userId: ApiUserId): Promise<DashboardViewModel> {
  const [profile, dashboard, stats, callHistory] = await Promise.all([
    apiFetch<UserProfile>("/api/auth/profile", userId),
    apiFetch<DashboardResponse>("/api/auth/dashboard", userId),
    apiFetch<StatsResponse>("/api/call-sessions/stats", userId),
    apiFetch<CallHistoryResponse>("/api/call-sessions?limit=10", userId),
  ]);

  return {
    userId,
    profile,
    dashboard,
    stats,
    callHistory,
  };
}
