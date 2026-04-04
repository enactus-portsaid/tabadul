---
description: Tabadul Quality Verification & Commit Workflow
---

# Tabadul Quality & Commit

Whenever an SOP phase is complete or you are wrapping up a piece of work, use this procedure to strictly enforce Tabadul's code style and version control requirements.

## Procedure

1. **Prettier Format**
   // turbo
   Execute the monorepo formatting task. Standardizes Tailwind CSS and NativeWind class definitions.

```bash
pnpm format
```

2. **Lint Fix**
   // turbo
   Execute the ESLint 9 Flat Config validations.

```bash
pnpm lint:fix
```

3. **TypeScript Integrity**
   // turbo
   Verify cross-package dependencies between applications and `@tabadul/shared`.

```bash
pnpm type-check
```

4. **Prepare Commit Message**
   Determine the exact boundaries of the work accomplished by reviewing your recent file edits. Propose a single **Conventional Commit** adhering to one of these formats:

- `feat(sop-XXX): {short description}`
- `fix(sop-XXX): {short description}`
- `wip(sop-XXX): {short description}`

5. **Commit**
   Execute the Git commit with the proposed message. Wait for the user to approve this final execution.

```bash
git add .
git commit -m "your_generated_message_here"
```
