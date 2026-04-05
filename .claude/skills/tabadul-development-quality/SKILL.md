---
name: tabadul-development-quality
description: Core Git and Quality Orchestrator. Trigger this skill whenever you are about to execute a git commit or push, run pre-commit tests, manage CI workflows, or finalize an SOP phase. Ensures rigid alignment with code quality (TypeScript, ESLint, Prettier) and Git Conventional Commits logic.
---

# Tabadul Git & Quality Orchestrator

The Tabadul repository contains a stringent quality gate implemented through Husky hooks and explicit coding standard configurations. Before attempting any version control actions, adhere to these rules.

## Local Validation Rules

1. **Format Execution:** Do not commit non-formatted code. ALWAYS utilize Prettier Tailwind class sorting plugins. Use the command `pnpm format` to standardize `.mjs`, `.js`, `.ts`, and `.tsx` files.
2. **Linting Check:** Run `pnpm lint:fix` to resolve ESLint 9 Flat Config issues before declaring an arbitrary coding step complete. The system will reject your commits natively if you don't.
3. **Type Checking:** Run `pnpm type-check` constantly to verify that your cross-package typescript imports (`@tabadul/shared`) are unbroken.

## Git & Version Control Guidelines

### Atomicity & Branching

- **Commit After Each SOP:** Make a git commit upon completing each specific SOP step. Do not carry uncommitted code across various features or operations.
- **Branches:** NEVER push directly to `main`. Create context-sensitive branches (`feature/xxx`, `fix/xxx`, `chore/xxx`).

### Conventional Commits

Use standard generic commit formats, scoped explicitly to the SOP or Tabadul component package.

- **WIP Large SOPs:** If working on a massive SOP spanning multiple responses, use `wip(sop-XXX): {description}`.
- **Completion Commits:** When officially completing an SOP, use `feat(sop-XXX): {description}`, `fix:`, or `docs:`.
- **Merge/Cleanup:** Run `git branch -d <branch_name>` after merging via pull requests to maintain local hygiene.

## Examples

**Example 1: Preparing to Commit**
Input: I finished the UI implementation for SOP-302.
Output: Perfect. Let me run `pnpm format` and `pnpm lint:fix` first to format the TailWind class structures natively. After it passes, I will commit using `git commit -m "feat(sop-302): implement user flow wireframes"`.

**Example 2: Branching Strategy**
Input: We need to fix a critical bug in the authentication tokens.
Output: Let me branch off `main` to `fix/auth-tokens`. I'll execute my fix, run my local validations, and initiate a `git commit -m "fix(auth): correct token validation logic"`.
