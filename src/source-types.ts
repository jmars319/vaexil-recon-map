// Source-review type contracts shared by the recon source-notes panel.
// These mirror the shapes each app defines under its own `data/recon/*` modules.
// Only the type definitions live here; the source data stays app-local and is
// passed into `ReconSourceNotes` via props (structural typing keeps them compatible).

export type ReconSourceReference = {
  label: string;
  url: string;
  note: string;
};

export type ReconPoiCandidate = {
  label: string;
  category: string;
  confidence: "approximate" | "verified" | "unverified";
  notes: string;
};

export type ReconSourcePacket = {
  mapId: string;
  gameId: string;
  status: string;
  lastReviewed: string;
  officialSources: ReconSourceReference[];
  referenceSources: ReconSourceReference[];
  verifiedNamedAreas: string[];
  approximateAreas: string[];
  poiCandidates: ReconPoiCandidate[];
  uncertaintyNotes: string[];
  avoidCopying: string[];
};

export type ReconSourceCrossCheckStatus =
  | "position_cross_checked"
  | "needs_manual_position_review"
  | "source_gap";

export type ReconVisualReviewStatus =
  | "visual_sources_compared"
  | "partial_visual_sources_compared"
  | "source_limited";

export type ReconSourceCrossCheckResultStatus =
  | "match"
  | "mismatch"
  | "scope_delta"
  | "pending"
  | "source_gap";

export type ReconSourceCrossCheckSource = {
  label: string;
  url: string;
  coverage: string;
  notes: string;
};

export type ReconSourceCrossCheckResult = {
  label: string;
  status: ReconSourceCrossCheckResultStatus;
  localValue: string;
  sourceValue: string;
  notes: string;
};

export type ReconVisualReview = {
  status: ReconVisualReviewStatus;
  lastCompared: string;
  summary: string;
  findings: string[];
  manualReviewFocus: string[];
};

export type ReconSourceCrossCheck = {
  mapId: string;
  gameId: string;
  status: ReconSourceCrossCheckStatus;
  lastReviewed: string;
  localMarkerCount: number;
  localWorkbenchCount: number;
  summary: string;
  sources: ReconSourceCrossCheckSource[];
  visualReview: ReconVisualReview;
  checks: ReconSourceCrossCheckResult[];
  warnings: string[];
  nextSteps: string[];
};
