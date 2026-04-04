---
name: tabadul-product-requirements
description: Essential tool for translating product requirements into technical architecture. Use this skill when conducting Phase 0 SOPs, planning new features, writing the Execution Brief, or extracting data models, UI wireframes, and business logic from the business requirements.
---

# Tabadul Product Requirements Analyzer

Accurately interpreting and translating Tabadul's business logic is paramount to preventing context drift. You are bridging the human-readable product vision with rigid backend implementations.

## Key Rules

1. **Information Extraction:** When executing `SOP-101` (Schema Design) or `SOP-202` (API Design), do not hallucinate tables or endpoints. ALWAYS extract exact entities directly from the User Stories found in `/docs/requirements.md`. Look for nouns like "Profile", "WasteCategory", "Bid", etc.
2. **The Execution Brief:** To prevent parsing a massive requirements document continually, your primary asset post-Phase 0 is the `/docs/execution-brief.md`. Rely on it to provide dynamic placeholder resolutions (e.g., mapping generic `[Entity]` syntax natively into the context of 'Listing' or 'Message').
3. **Traceability:** Every technical component you plan or implement MUST trace back to a specific requirement. Maintain proper mapping: Requirement ID -> Design Document -> Code Element. If a user asks for a feature not listed in MVP requirements (`MoSCoW` priority check), flag it as Scope Creep and seek strict human approval before altering the DB schema or frontend routes.

## Creating the Execution Brief

When instructed to create the execution brief (`/docs/execution-brief.md`) after Phase 0, ensure it contains the following:

- **Entity Map:** Explicitly enumerate each DB Entity, its relationships, and matching SOP workflow scopes.
- **Tech Stack Adaptations:** Highlight how Tabadul's tools augment standard SOPs (e.g., using Supabase DB migrations instead of generic Prisma).
- **Placeholder Resolution:** The lookup table defining what generic SOP terms mean in Tabadul's explicit domain.

## Examples

**Example 1:**
_Task:_ Write the Service Layer for the Chat component.
_How to Use Skill:_ First parse `requirements.md` or `execution-brief.md` to identify the data structure. You'll notice chatting involves `ChatThread` and `Message` entities. Do not define them as `Conversations` or `ChatLogs`. Keep the nomenclature synchronized with the documentation.
