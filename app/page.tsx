import DashboardClient from "./dashboard-client";
import { getDashboardViewModel } from "./api";
import { createDashboardState } from "./dashboard-data";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const rawUserId = resolvedSearchParams.user;
  const userId = rawUserId === "u1" || rawUserId === "u2" ? rawUserId : "u2";
  const viewModel = await getDashboardViewModel(userId);
  const initialState = createDashboardState(viewModel);

  return <DashboardClient initialState={initialState} />;
}
