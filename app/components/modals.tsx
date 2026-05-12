import type { FeedbackEntry } from "../dashboard-data";

type FeedbackModalProps = {
  feedbackOpen: boolean;
  feedbackRating: "good" | "bad";
  feedbackMessage: string;
  onSetFeedbackRating: (rating: "good" | "bad") => void;
  onSetFeedbackMessage: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

type FeedbackHistoryModalProps = {
  feedbackHistoryOpen: boolean;
  feedbackHistory: FeedbackEntry[];
  onClose: () => void;
};

type LogoutModalProps = {
  logoutModalOpen: boolean;
  onClose: () => void;
};

export function FeedbackModal({
  feedbackOpen,
  feedbackRating,
  feedbackMessage,
  onSetFeedbackRating,
  onSetFeedbackMessage,
  onClose,
  onSubmit,
}: FeedbackModalProps) {
  if (!feedbackOpen) {
    return null;
  }

  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
      <div className="modal-card modal-card-wide">
        <h3 id="feedback-title">Share feedback</h3>
        <div className="modal-divider" />
        <div className="feedback-rating-row">
          <button className={feedbackRating === "good" ? "rating-pill rating-pill-active" : "rating-pill"} onClick={() => onSetFeedbackRating("good")}>Good</button>
          <button className={feedbackRating === "bad" ? "rating-pill rating-pill-active" : "rating-pill"} onClick={() => onSetFeedbackRating("bad")}>Bad</button>
        </div>
        <textarea
          className="feedback-input"
          placeholder="Tell us what worked or what can be improved"
          value={feedbackMessage}
          onChange={(event) => onSetFeedbackMessage(event.target.value)}
          rows={5}
        />
        <div className="modal-actions feedback-actions">
          <button className="secondary-button" onClick={onClose}>Cancel</button>
          <button className="primary-button modal-primary" onClick={onSubmit}>Save Feedback</button>
        </div>
      </div>
    </div>
  );
}

export function FeedbackHistoryModal({ feedbackHistoryOpen, feedbackHistory, onClose }: FeedbackHistoryModalProps) {
  if (!feedbackHistoryOpen) {
    return null;
  }

  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-labelledby="feedback-history-title">
      <div className="modal-card modal-card-wide">
        <h3 id="feedback-history-title">Feedback history</h3>
        <div className="modal-divider" />
        <div className="feedback-history-list">
          {feedbackHistory.length === 0 ? (
            <p className="feedback-empty">No feedback stored yet.</p>
          ) : (
            feedbackHistory.map((entry) => (
              <article key={entry.id} className="feedback-history-item">
                <div className="feedback-history-meta">
                  <span className={`feedback-badge feedback-badge-${entry.rating}`}>{entry.rating}</span>
                  <span>{new Date(entry.createdAt).toLocaleString()}</span>
                </div>
                <p>{entry.message}</p>
              </article>
            ))
          )}
        </div>
        <div className="modal-actions feedback-actions">
          <button className="secondary-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export function LogoutModal({ logoutModalOpen, onClose }: LogoutModalProps) {
  if (!logoutModalOpen) {
    return null;
  }

  return (
    <div className="modal-layer modal-layer-dark" role="dialog" aria-modal="true" aria-labelledby="logout-title">
      <div className="modal-card logout-modal-card">
        <h3 id="logout-title">Leaving already?</h3>
        <div className="modal-divider" />
        <p>You can log back in anytime to continue your meetings with Hintro.</p>
        <div className="modal-actions logout-actions">
          <button className="secondary-button logout-cancel" onClick={onClose}>Cancel</button>
          <button className="primary-button modal-primary" onClick={onClose}>Log out</button>
        </div>
      </div>
    </div>
  );
}
