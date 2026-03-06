# AI Agent Guide for SOP-Driven Development

> This document explains how to use the SOP framework with AI coding agents.
> The SOPs are a **single source of truth** for both human developers and AI agents.

---

## AI Agent Responsibilities

| Responsibility         | When             | What to Update                                                      |
| ---------------------- | ---------------- | ------------------------------------------------------------------- |
| **Initialize session** | First prompt     | Fill Project Overview, Goals from user description                  |
| **Track progress**     | After each SOP   | Update Progress Tracker status and outputs                          |
| **Update checklist**   | After each SOP   | Check off completed items in `.sops/templates/project-checklist.md` |
| **Commit changes**     | After each SOP   | Git commit with conventional message (see Version Control)          |
| **Run checkpoint**     | After each phase | Verify alignment with requirements (see Checkpoint System)          |
| **Maintain context**   | After each SOP   | Update Current Session, Context Cache, Session Prompt Template      |
| **Log sessions**       | End of session   | Add entry to Session Log                                            |
| **Resume context**     | New session      | Read AI-SESSION.md, continue from last SOP                          |

**The human only provides:** initial project name/description, answers to questions, approval/feedback.

---

## Version Control Guidelines

### When to Commit

| Trigger                                   | Commit Type  | Message Pattern                | Example                              |
| ----------------------------------------- | ------------ | ------------------------------ | ------------------------------------ |
| **After completing an SOP**               | Final        | `feat(sop-XXX): {description}` | `feat(sop-101): add database schema` |
| **Significant progress within large SOP** | Intermediate | `wip(sop-XXX): {description}`  | `wip(sop-200): add user endpoints`   |
| **Bug fix during development**            | Fix          | `fix: {description}`           | `fix: correct validation logic`      |
| **Documentation updates**                 | Docs         | `docs: {description}`          | `docs: update API reference`         |

### Key Rules

1. **Commit after each SOP** — one atomic commit per SOP
2. **Large SOPs may have multiple commits** — use `wip:` for intermediate, `feat:` for final
3. **Always commit before switching SOPs** — never carry uncommitted changes across SOPs
4. **Commit before ending a session** — ensure no work is lost

Format: [Conventional Commits](https://www.conventionalcommits.org/) — `<type>(scope): <description>`
Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `wip`
Scope: usually SOP number (e.g., `sop-101`) or component name

---

## Checkpoint System (Drift Prevention)

### Validation Hierarchy

- **Level 0 (Source of Truth):** `requirements.md`, `tech-stack.md` — human-approved, never contradicted
- **Level 1 (Design Decisions):** Schema docs, API specs, component architecture — must conform to Level 0
- **Level 2 (Implementation):** Actual code — must conform to Level 1

Validation flows downward: Level 0 → Level 1 → Level 2.

### Phase-Specific Validation

| Phase       | Level 1 (Design Docs)                                     | Level 2 (Code)                        |
| ----------- | --------------------------------------------------------- | ------------------------------------- |
| **Phase 1** | `/docs/database/schema.md`, `/docs/database/decisions.md` | `prisma/schema.prisma`, seed files    |
| **Phase 2** | `/docs/api/endpoints.md`, `/docs/api/openapi.yaml`        | `src/app/api/**`, route handlers      |
| **Phase 3** | `/docs/frontend/components.md`, `/docs/frontend/state.md` | `src/components/**`, pages            |
| **Phase 4** | `/docs/ai/feasibility.md`, `/docs/ai/prompts.md`          | AI integration code, prompt templates |
| **Phase 5** | Test strategy in docs                                     | `__tests__/**`, test files            |
| **Phase 6** | `/docs/deployment/`, runbooks                             | `.github/workflows/**`, Dockerfiles   |

### When to Run Checkpoints

| Checkpoint | Trigger       | Validation Focus                                  |
| ---------- | ------------- | ------------------------------------------------- |
| **CP-1**   | After Phase 1 | Requirements → Database design → Schema code      |
| **CP-2**   | After Phase 2 | Requirements → API design → Route implementations |
| **CP-3**   | After Phase 3 | User stories → Component design → UI code         |
| **CP-4**   | After Phase 5 | Full stack validation before deployment           |

### Checkpoint Procedure

> Read the Checkpoint Tracker in `AI-SESSION.md` for pre-filled document locations.

1. **Layer 0 → 1 (Design Alignment):** Re-read Source of Truth docs. For each requirement, verify it's addressed in the design doc. Report: `| Requirement | Design Doc | Addressed? | Drift Notes |`
2. **Layer 1 → 2 (Implementation Alignment):** For each design decision, verify code implements it. Report: `| Design Decision | Expected | Actual Code | Compliant? | File:Line |`
3. **Summary:** Calculate compliance %. List critical issues (block proceeding), warnings (track), and recommendations.
4. **Update AI-SESSION.md:** Set checkpoint status, record date and issues.
5. **⏸️ STOP:** Await human approval before proceeding to next phase.

### Quick Checkpoint (Mid-SOP)

1. What did I just implement? (List last 3 items)
2. For each, trace back to design doc (Level 1) and requirement (Level 0)
3. Flag anything that doesn't trace back; flag any requirement that should have been addressed but wasn't

### Recovery from Drift

1. **Stop current work** — don't compound drift
2. **Identify type:** scope creep (remove or get approval), deviation (refactor or update spec), gap (implement missing piece)
3. **Update tracking:** log in AI-SESSION.md, update design docs if change approved
4. **Re-run checkpoint** after fixes; get approval before proceeding

---

## SOP Adaptation (Project Execution Brief)

After Phase 0, generate `/docs/execution-brief.md` — a document that specializes all remaining SOPs to the actual project.

### Required Sections

| Section                    | Source                           | Purpose                                                                    |
| -------------------------- | -------------------------------- | -------------------------------------------------------------------------- |
| **Entity Map**             | `/docs/requirements.md`          | Table: Entity, Relationships, Used in SOPs                                 |
| **Tech Stack Adaptations** | `/docs/tech-stack.md`            | Table: SOP Area, Generic SOP Says, This Project Uses, Adaptation           |
| **Pattern Overrides**      | `/docs/architecture/patterns.md` | Table: Pattern, SOP Default, This Project, Reason                          |
| **Feature Scope (MVP)**    | `/docs/requirements.md`          | Table: Feature, Priority, Relevant SOPs, Pages, API Resources              |
| **Phase Relevance**        | All Phase 0 outputs              | Mark each SOP: ✅ Execute / ⏭️ Skip, with reason                           |
| **Constraints**            | User input                       | Bullet list of project-specific constraints                                |
| **Placeholder Resolution** | Entity Map                       | Per-entity card mapping `[Entity]`→actual name, `[entity]`→lowercase, etc. |

### Agent Rules

1. **Before starting any SOP from Phase 1 onward**, read `/docs/execution-brief.md`
2. **Resolve placeholders per entity** — look up the matching entity card
3. **Apply tech adaptations** — use the correct tools/patterns for this project
4. **Check phase relevance** — skip SOPs marked ⏭️
5. **Scope to MVP features** — don't implement post-MVP features

> If the Execution Brief contradicts a generic SOP, the Brief takes precedence. SOPs define the _method_; the Brief defines the _subject_.
>
> **Placeholder Rule:** Never guess what `[Entity]` or `[Related]` means. Always look up the matching entity card. If no card exists, stop and ask the human.

---

## Iterative SOP Execution

Some SOPs implement multiple work units (services, pages, API groups). These must NOT be done in a single prompt.

### Which SOPs Are Iterative

| SOP     | Work Unit      | Iterate Over            |
| ------- | -------------- | ----------------------- |
| SOP-200 | Service        | Each service class      |
| SOP-201 | Repository     | Each repository class   |
| SOP-202 | Resource Group | Each API resource group |
| SOP-305 | Page           | Each user-facing page   |

### Execution Steps

1. **Build Manifest** — list ALL work units from Execution Brief + upstream docs. Present to human for approval.
2. **Implement One Unit** — complete full vertical slice. Cross-reference Execution Brief. Verify against design doc.
3. **Checkpoint** — present completed unit (what was built, files changed, requirement mapping). Await approval.
4. **Repeat** steps 2–3 for each remaining unit.
5. **Coverage Verification** — cross-reference manifest against outputs. Report X/Y units complete. Final approval.

### Rules

1. Never skip the manifest step
2. One unit at a time — don't start next until current is checkpointed
3. Full vertical slice per unit (e.g., server + client + API + loading + error)
4. Use the Execution Brief — don't guess entity names
5. Update AI-SESSION.md after each unit
6. Coverage check is mandatory before marking SOP complete

---

## Prompt Patterns

| #   | Pattern                   | When to Use               | Template                                                                                                                             |
| --- | ------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Execute Single SOP**    | Non-iterative SOP         | `Execute SOP-{XXX}. Read .prompts/AI-SESSION.md for context, follow the procedure, update tracker.`                                  |
| 2   | **Continue Session**      | Resuming work             | `Continuing this project. Read .prompts/AI-SESSION.md and proceed with the next incomplete SOP.`                                     |
| 3   | **Execute Multiple SOPs** | Related SOPs in sequence  | `Execute SOPs {list} in order. Update .prompts/AI-SESSION.md after each one.`                                                        |
| 4   | **Review & Verify**       | After SOP completion      | `Verify outputs against SOP-{XXX}'s Review Checklist. Report ✅/❌ per item with fixes.`                                             |
| 5   | **Recover Context**       | New session, need summary | `Read .prompts/AI-SESSION.md. Summarize: completed, next, issues. Await instructions.`                                               |
| 6   | **Iterative SOP**         | SOPs 200/201/202/305      | `Execute SOP-{XXX} iteratively. Step 1: build manifest. Step 2: one unit at a time with checkpoints. Step 3: coverage verification.` |
