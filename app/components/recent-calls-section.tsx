import type { CallItem } from "../dashboard-data";
import { CalendarMiniIcon, MoreIcon } from "./icons";

export function RecentCallsSection({ calls }: { calls: CallItem[] }) {
  const hasCalls = calls.length > 0;

  return (
    <section className="recent-calls-section">
      <h2 className="section-title">Recent calls</h2>
      {hasCalls ? <CallList calls={calls} /> : <EmptyState />}
    </section>
  );
}

function CallList({ calls }: { calls: CallItem[] }) {
  return (
    <div className="calls-list">
      {calls.map((call, index) => {
        const showDay = index === 0 || calls[index - 1]?.dayLabel !== call.dayLabel;
        return (
          <div key={call.id} className="call-group">
            {showDay ? <p className="call-day">{call.dayLabel}</p> : null}
            <article className="call-row">
              <div className="call-main">
                <div className="call-avatar">{call.initials}</div>
                <div>
                  <p className="call-title">{call.title}</p>
                  <div className="call-participants" aria-hidden="true">
                    {Array.from({ length: call.participants }).map((_, avatarIndex) => (
                      <span key={`${call.id}-${avatarIndex}`} className="participant-dot" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="call-side">
                <span className="call-time">{call.time}</span>
                <button className="icon-button" aria-label="Call options">
                  <MoreIcon />
                </button>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <CalendarMiniIcon />
      </div>
      <h3>No Recent Calls</h3>
      <p>Connect your Google Calendar to see upcoming meetings, get reminders, and join calls directly from Hintro.</p>
      <button className="secondary-button">Start a Call</button>
    </div>
  );
}
