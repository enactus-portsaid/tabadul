---
description: Execute a rigorous SOP validation checkpoint across the Level 0 / 1 / 2 hierarchy.
---

# Tabadul SOP Checkpoint Validator

Trigger this workflow at the end of every SOP Phase. This automated procedure guarantees the Tabadul architecture does not drift from its core MVP definitions.

## Procedure

1. **Information Ingestion:** Read both `/docs/requirements.md` (Level 0) and `.prompts/AI-SESSION.md`. Take note of the current phase you are validating.
2. **Level 0 (Requirements) to Level 1 (Design Docs):**
   - For each requirement relevant to this phase, identify where it was documented in the Design phase outputs (e.g., `/docs/api/endpoints.md`).
   - Note any requirements that are entirely missing.
3. **Level 1 (Design Docs) to Level 2 (Implementation):**
   - For each design decision, view the physical code files (`src/app/`, `src/components/`, `supabase/migrations/`) and verify the exact implementation matches the architectural standard.
4. **Draft the Compliance Report:**
   - Report the `| Design Decision | Expected | Actual Code | Compliant? | File:Line |` statistics directly in the `.prompts/AI-SESSION.md` Checkpoint Tracker.
5. **Set the Status:**
   - If everything passes, update the session status to `✅ Passed`.
   - If missing functionalities or hallucinations are detected, update the session status to `⚠️ Issues Found` and halt progress until the User dictates a correction strategy.
