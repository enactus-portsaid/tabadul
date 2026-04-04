---
name: tabadul-sop-navigator
description: Core Tabadul project navigation protocol. Use this skill WHENEVER the user asks you to start a session, resume work, execute a specific phase/SOP, or when you join an active project. It dictates how you interact with the Tabadul Standard Operating Procedures (SOPs) and Session tracking.
---

# Tabadul SOP Navigator Instructions

The **Standard Operating Procedures (SOPs)** framework is the single source of truth for Tabadul development. You MUST use it to guide your actions.

## Key Rules

1. **AI Guide First:** Before you do anything else on this project, ALWAYS read `.prompts/AI-GUIDE.md`. It explains your roles and responsibilities in the SOP workflow, version control instructions, and checkpoint systems.
2. **Session Alignment:** Maintain and read `.prompts/AI-SESSION.md` constantly. It holds the active state of the project. Your job is to fill this out and update the Progress Tracker as you move through SOPs.
3. **Patience with SOPs:** Follow the predefined template when executing an SOP phase. Look inside the `.sops` folder to read the specific procedure (e.g. `.sops/phase-0-initialization/SOP-000-requirements-gathering.md`) before attempting it. Do not guess what an SOP requires.
4. **Checkpoint Triggers:** At the end of every Phase, you MUST execute a Checkpoint as defined in the `.prompts/AI-GUIDE.md`. You must systematically trace Layer 0 (Requirements) -> Layer 1 (Design Docs) -> Layer 2 (Code implementation) and wait for human approval before proceeding.
5. **No Monolithic Leaps:** If an SOP is iterative (like SOP-200 for Services, SOP-305 for Pages), create a manifest first, implement one vertical slice at a time with check-ins, and DO NOT output them all at once in one giant prompt.

## Dealing with Context Drift

You must always align your implementation with the Level 0 / 1 / 2 hierarchy.

- **Level 0 (Source of Truth):** `/docs/requirements.md` and `/docs/tech-stack.md`. Never contradict these.
- **Level 1 (Design Decisions):** Found in `/docs/...`. Must conform to Level 0.
- **Level 2 (Implementation):** The code itself. Must conform to Level 1.
  If you notice drift, stop, flag it to the user, and ask for permission to rectify or update the documentation.

## Examples

**Example 1:**
Input: Let's continue working on SOP-200.
Output: Use the `view_file` tool to read `.prompts/AI-SESSION.md` to find context on SOP-200. Proceed to read `.sops/phase-2-backend/SOP-200-service-layer.md`.

**Example 2:**
Input: Start working on the frontend pages phase.
Output: First read `.prompts/AI-GUIDE.md` to set up context. Read the AI session data. Notice that frontend is Phase 3. Find the `SOP-305-page-implementation.md` guide and propose the page manifest before writing any Next.js code.
