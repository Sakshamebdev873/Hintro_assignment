"use client";

import { useState } from "react";
import type { FeedbackEntry } from "../dashboard-data";

const FEEDBACK_STORAGE_KEY = "hintro-feedback-history";

export function useFeedbackHistory() {
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackEntry[]>(() => readFeedbackHistory());
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackHistoryOpen, setFeedbackHistoryOpen] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<"good" | "bad">("good");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  function submitFeedback() {
    if (!feedbackMessage.trim()) {
      return;
    }

    const nextEntry: FeedbackEntry = {
      id: crypto.randomUUID(),
      rating: feedbackRating,
      message: feedbackMessage.trim(),
      createdAt: new Date().toISOString(),
    };

    const nextHistory = [nextEntry, ...feedbackHistory];
    setFeedbackHistory(nextHistory);
    window.localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(nextHistory));
    setFeedbackMessage("");
    setFeedbackRating("good");
    setFeedbackOpen(false);
    setFeedbackHistoryOpen(true);
  }

  return {
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
  };
}

function readFeedbackHistory(): FeedbackEntry[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(FEEDBACK_STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as FeedbackEntry[];
  } catch {
    window.localStorage.removeItem(FEEDBACK_STORAGE_KEY);
    return [];
  }
}
