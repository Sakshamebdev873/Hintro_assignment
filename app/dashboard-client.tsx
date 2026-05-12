"use client";

import { useState } from "react";
import type { DashboardState } from "./dashboard-data";
import { HowItWorksSection } from "./components/how-it-works-section";
import { Sidebar, Topbar } from "./components/layout-pieces";
import { FeedbackHistoryModal, FeedbackModal, LogoutModal } from "./components/modals";
import { RecentCallsSection } from "./components/recent-calls-section";
import { StatsGrid } from "./components/stats-grid";
import { useFeedbackHistory } from "./components/use-feedback-history";

type DashboardClientProps = {
  initialState: DashboardState;
};

export default function DashboardClient({ initialState }: DashboardClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const {
    feedbackHistory,
    feedbackOpen,
    feedbackHistoryOpen,
    feedbackRating,
    feedbackMessage,
    setFeedbackOpen,
    setFeedbackHistoryOpen,
    setFeedbackRating,
    setFeedbackMessage,
    submitFeedback,
  } = useFeedbackHistory();

  return (
    <div className="dashboard-shell">
      <Sidebar
        currentState={initialState}
        mobileMenuOpen={mobileMenuOpen}
        showFooterExtras={logoutModalOpen}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
        onOpenFeedback={() => setFeedbackOpen(true)}
        onOpenFeedbackHistory={() => setFeedbackHistoryOpen(true)}
      />

      <div className="content-shell">
        <Topbar
          currentUserId={initialState.userId}
          profileMenuOpen={profileMenuOpen}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onToggleProfileMenu={() => setProfileMenuOpen((open) => !open)}
          onLogoutClick={() => {
            setProfileMenuOpen(false);
            setLogoutModalOpen(true);
          }}
        />

        <main className="dashboard-main">
          <section className="hero-row">
            <div>
              <h1 className="hero-title">Hi, {initialState.greetingName} 👋 Welcome to Hintro</h1>
              <p className="hero-subtitle">Ready to make your next call smarter ?</p>
            </div>
            <button className="primary-button">Start New Call</button>
          </section>

          <StatsGrid stats={initialState.stats} />
          {initialState.showHowItWorks ? <HowItWorksSection steps={initialState.steps} /> : null}
          <RecentCallsSection calls={initialState.calls} />
        </main>
      </div>

      {mobileMenuOpen ? <button className="overlay" aria-label="Close menu overlay" onClick={() => setMobileMenuOpen(false)} /> : null}

      <FeedbackModal
        feedbackOpen={feedbackOpen}
        feedbackRating={feedbackRating}
        feedbackMessage={feedbackMessage}
        onSetFeedbackRating={setFeedbackRating}
        onSetFeedbackMessage={setFeedbackMessage}
        onClose={() => setFeedbackOpen(false)}
        onSubmit={submitFeedback}
      />

      <FeedbackHistoryModal
        feedbackHistoryOpen={feedbackHistoryOpen}
        feedbackHistory={feedbackHistory}
        onClose={() => setFeedbackHistoryOpen(false)}
      />

      <LogoutModal logoutModalOpen={logoutModalOpen} onClose={() => setLogoutModalOpen(false)} />
    </div>
  );
}
