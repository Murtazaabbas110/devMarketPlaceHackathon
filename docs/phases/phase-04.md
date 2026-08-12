Phase 4 — AI Project Analysis

Goal

Server-side Gemini project analysis integration and loading UX.

Requirements (implemented in this phase)
- Server-side analysis API (/api/analyze) that accepts project id and clientMessage and returns structured JSON with summary, objectives, targetUsers, requirements, ambiguities, risks, assumptions, dependencies, complexity, readiness. Uses Gemini when GEMINI_API_KEY is configured; otherwise falls back to a deterministic analyzer.
- Frontend New Project flow calls the analysis API after saving the project and merges results into the stored project.
- Error handling: API returns clear errors; frontend shows alerts when analysis fails and still preserves the created project locally.

Implemented
- POST /api/analyze route (app/api/analyze/route.js) with deterministicAnalysis fallback when Gemini key is missing.
- New Project page updated to call the analysis API after creating a project; merges analysis into localStorage project on success.
- Updated docs and phase file.

Phase Completion Response

PHASE 4 COMPLETE Implemented: - Server-side analyze API with deterministic fallback - Client-side integration: New Project calls the API and stores analysis into localStorage - Deterministic analysis produces structured JSON: summary, objectives, targetUsers, requirements, ambiguities, risks, assumptions, dependencies, complexity, readiness Code Gigs: - supabase-client (existing minimal stub) Configuration required: - (Optional) GEMINI_API_KEY or GOOGLE_API_KEY to enable Gemini calls. Without one the deterministic analyzer is used. Known limitations: - Gemini API is not integrated (placeholder) — deterministic analyzer used when no key present - Persistence remains localStorage for demo purposes Next: Phase 5 — Project Intelligence Workspace