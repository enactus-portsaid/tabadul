# Contributing to Tabadul (تبادل)

Thank you for contributing! This guide explains how to get started.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/tabadul.git`
3. Create a branch: `git checkout -b feature/your-feature`
4. Make changes and write tests
5. Commit using conventional commits (see below)
6. Push and open a Pull Request

## Development Setup

See [README.md](README.md#-getting-started) for full setup instructions.

## Branching Strategy

We use **GitHub Flow**:

- **`main`** — Production-ready code. Always deployable.
- **`feature/xxx`** — New features (e.g., `feature/chat-ui`)
- **`fix/xxx`** — Bug fixes (e.g., `fix/rtl-alignment`)
- **`chore/xxx`** — Maintenance tasks (e.g., `chore/update-deps`)

All changes go through Pull Requests against `main`. Direct pushes to `main` are not allowed.

## Code Style

- Follow the project ESLint and Prettier configuration
- Run `pnpm lint` before committing
- Pre-commit hooks enforce formatting automatically (once configured)

## Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

### Types

| Type       | Description                      |
| ---------- | -------------------------------- |
| `feat`     | New feature                      |
| `fix`      | Bug fix                          |
| `docs`     | Documentation only               |
| `style`    | Formatting (no logic change)     |
| `refactor` | Code restructuring               |
| `test`     | Adding/updating tests            |
| `chore`    | Build, config, tooling           |

### Scopes

Use the app or module name as scope: `mobile`, `web`, `shared`, `supabase`, `api`, `auth`, `chat`, `listings`, etc.

### Examples

```
feat(mobile): add waste listing creation screen
fix(web): correct RTL alignment on marketplace page
docs: update API endpoint table in README
chore(shared): upgrade zod to 3.24
refactor(supabase): simplify matching edge function
```

## Pull Request Process

1. Fill out the PR template completely
2. Update documentation if needed
3. Ensure all tests pass (`pnpm test`)
4. Ensure lint passes (`pnpm lint`)
5. Request review from at least one team member
6. Squash and merge after approval

## Reporting Issues

- Use GitHub Issues
- Include: steps to reproduce, expected behavior, actual behavior, screenshots if UI-related
- Label appropriately (`bug`, `enhancement`, `question`)

## Code of Conduct

Be respectful, inclusive, and constructive.
