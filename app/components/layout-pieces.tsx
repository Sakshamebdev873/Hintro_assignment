import Link from "next/link";
import type { DashboardState } from "../dashboard-data";
import { ArchiveIcon, ChevronDownIcon, CloseIcon, DashboardIcon, DocumentIcon, DownloadIcon, GiftIcon, InfoIcon, MenuIcon, PhoneIcon, PlayIcon, SettingsIcon, ChatIcon, AvatarIcon, LogoutIcon } from "./icons";

const navItems = [
  { label: "Dashboard", icon: DashboardIcon, active: true, info: false },
  { label: "Call Insights", icon: PhoneIcon, active: false, info: false },
  { label: "Knowledge Base", icon: DocumentIcon, active: false, info: true },
  { label: "Prompts", icon: ChatIcon, active: false, info: true },
  { label: "Boxy Controls", icon: SettingsIcon, active: false, info: true },
];

type SidebarProps = {
  currentState: DashboardState;
  mobileMenuOpen: boolean;
  showFooterExtras: boolean;
  onCloseMobileMenu: () => void;
  onOpenFeedback: () => void;
  onOpenFeedbackHistory: () => void;
};

type TopbarProps = {
  currentUserId: DashboardState["userId"];
  profileMenuOpen: boolean;
  onOpenMobileMenu: () => void;
  onToggleProfileMenu: () => void;
  onLogoutClick: () => void;
};

export function Sidebar({ currentState, mobileMenuOpen, showFooterExtras, onCloseMobileMenu, onOpenFeedback, onOpenFeedbackHistory }: SidebarProps) {
  const usageParts = currentState.hoursUsedText.match(/^(\d+) of (\d+) hours used$/);

  return (
    <aside className={`sidebar ${mobileMenuOpen ? "sidebar-open" : ""}`}>
      <div>
        <div className="brand-row">
          <span className="brand-text">Hintro</span>
          <button className="mobile-close" onClick={onCloseMobileMenu} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <nav className="nav-list" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button key={item.label} className={`nav-item ${item.active ? "nav-item-active" : ""}`}>
              <span className="nav-item-main">
                <item.icon />
                <span>{item.label}</span>
              </span>
              {item.info ? <InfoIcon /> : null}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="nav-list nav-list-footer">
          {showFooterExtras ? (
            <button className="nav-item nav-item-detail">
              <span className="nav-item-main">
                <DownloadIcon />
                <span className="nav-item-label">Download Desktop App</span>
              </span>
            </button>
          ) : null}
          <button className="nav-item nav-item-detail" onClick={onOpenFeedbackHistory}>
            <span className="nav-item-main">
              <ArchiveIcon />
              <span className="nav-item-label">Feedback History</span>
            </span>
          </button>
          <button className="nav-item nav-item-detail" onClick={onOpenFeedback}>
            <span className="nav-item-main">
              <GiftIcon />
              <span className="nav-item-label">Feedback</span>
            </span>
          </button>
        </div>
        <div className="usage-card">
          <span className="usage-title">Usage overview</span>
          {usageParts ? (
            <div className="usage-summary">
              <span className="usage-value">{usageParts[1]}</span>
              <span className="usage-meta">of {usageParts[2]} hours used</span>
            </div>
          ) : (
            <span>{currentState.hoursUsedText}</span>
          )}
          <div className="usage-bar" aria-hidden="true">
            <span style={{ width: `${currentState.usagePercentage}%` }} />
          </div>
          <button className="upgrade-button">Upgrade</button>
        </div>
        {showFooterExtras ? <p className="sidebar-legal">© 2025 Hintro. Made in India 🇮🇳</p> : null}
      </div>
    </aside>
  );
}

export function Topbar({ currentUserId, profileMenuOpen, onOpenMobileMenu, onToggleProfileMenu, onLogoutClick }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar-primary-row">
        <div className="topbar-left">
          <button className="mobile-menu" onClick={onOpenMobileMenu} aria-label="Open menu">
            <MenuIcon />
          </button>
          <span className="topbar-title">Dashboard</span>
        </div>
        <div className="topbar-actions-fixed">
          <button className="tutorial-button">
            <PlayIcon />
            <span>Watch Tutorial</span>
          </button>
          <div className="profile-area">
            <button className="profile-button" onClick={onToggleProfileMenu} aria-haspopup="menu" aria-expanded={profileMenuOpen}>
              <AvatarIcon />
              <ChevronDownIcon />
            </button>
            {profileMenuOpen ? (
              <div className="profile-menu" role="menu">
                <button className="profile-menu-item" onClick={onLogoutClick}>
                  <span className="profile-menu-icon-wrap">
                    <LogoutIcon />
                  </span>
                  <span className="profile-menu-copy">
                    <span className="profile-menu-label">Log out</span>
                  </span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="topbar-actions topbar-actions-secondary">
        <div className="user-switcher" aria-label="Choose mock user">
          <Link href="/?user=u1" className={currentUserId === "u1" ? "user-chip user-chip-active" : "user-chip"}>u1</Link>
          <Link href="/?user=u2" className={currentUserId === "u2" ? "user-chip user-chip-active" : "user-chip"}>u2</Link>
        </div>
      </div>
    </header>
  );
}
