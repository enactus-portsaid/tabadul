---
description: Bootstrap a new AI session automatically by loading and executing the pending Tabadul SOP prompt template.
---

# Tabadul Session Starter

## Procedure

1. **Context Recovery**
   Silently read `.prompts/AI-SESSION.md` and the foundational architectural rules in `CLAUDE.md`. Understand the currently active SOP phase and any constraints or cached decisions listed.

2. **Template Execution**
   Locate the "Session Prompt Template" inside `.prompts/AI-SESSION.md`. Execute the instructions contained within it verbatim.

3. **Status Declaration**
   Generate a brief summary message to the human stating which SOP you are executing, what you are preparing to build, and that your context is fully aligned and ready. Do not begin writing major code implementations until this summary is provided, to ensure human alignment.
