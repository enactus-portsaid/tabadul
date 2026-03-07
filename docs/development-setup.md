# Tabadul — Development Setup

> **Status:** Approved  
> **Last Updated:** 2026-03-07  
> **SOP:** SOP-004 (Environment Setup)

---

## 1. Prerequisites

Install the following tools before proceeding:

| Tool             | Version    | Installation                                          | Purpose                                       |
| ---------------- | ---------- | ----------------------------------------------------- | --------------------------------------------- |
| **Node.js**      | ≥ 20.x LTS | [nodejs.org](https://nodejs.org/) or `nvm install 20` | JavaScript runtime                            |
| **pnpm**         | ≥ 9.x      | `npm install -g pnpm`                                 | Package manager (monorepo workspaces)         |
| **Docker**       | Latest     | [docker.com](https://www.docker.com/get-started/)     | Local Supabase stack                          |
| **Supabase CLI** | Latest     | `npm install -g supabase`                             | Local database, auth, storage, edge functions |
| **Expo CLI**     | via npx    | Bundled with Expo SDK (`npx expo`)                    | Mobile app development server                 |
| **Git**          | ≥ 2.x      | [git-scm.com](https://git-scm.com/)                   | Version control                               |

### Verify Installation

```bash
node --version     # ≥ 20.0.0
pnpm --version     # ≥ 9.0.0
docker --version   # Docker Engine
supabase --version # Supabase CLI
git --version      # ≥ 2.0.0
```

### Recommended VS Code Extensions

Open the project in VS Code and accept the recommended extensions prompt, or run:

```bash
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension bradlc.vscode-tailwindcss
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension mikestead.dotenv
code --install-extension ms-azuretools.vscode-docker
code --install-extension yoavbls.pretty-ts-errors
```

---

## 2. Quick Start

Get up and running in 4 commands:

```bash
# 1. Clone the repository
git clone https://github.com/enactus-portsaid/tabadul.git
cd tabadul

# 2. Install dependencies + create .env
pnpm setup

# 3. Start local Supabase (PostgreSQL, Auth, Storage, Realtime, Studio)
pnpm db:start

# 4. Start the web app
pnpm dev
```

Then:

- **Web app:** [http://localhost:3000](http://localhost:3000)
- **Supabase Studio:** [http://127.0.0.1:54323](http://127.0.0.1:54323)
- **Email inbox (dev):** [http://127.0.0.1:54324](http://127.0.0.1:54324)

---

## 3. Step-by-Step Setup

### 3.1 Clone & Install

```bash
git clone https://github.com/enactus-portsaid/tabadul.git
cd tabadul
pnpm install
```

### 3.2 Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and fill in the Supabase keys. For local development, the keys are printed when you run `supabase start` (Step 3.3).

See [/docs/environment-variables.md](environment-variables.md) for full variable documentation.

### 3.3 Start Local Supabase

```bash
supabase start
```

This spins up the full Supabase stack via Docker:

| Service                  | Local URL                                                 |
| ------------------------ | --------------------------------------------------------- |
| API                      | `http://127.0.0.1:54321`                                  |
| Studio (DB GUI)          | `http://127.0.0.1:54323`                                  |
| Inbucket (email testing) | `http://127.0.0.1:54324`                                  |
| PostgreSQL               | `postgresql://postgres:postgres@127.0.0.1:54322/postgres` |

Copy the `anon key` and `service_role key` from the CLI output into your `.env`:

```
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=<anon key from CLI>
SUPABASE_SERVICE_ROLE_KEY=<service_role key from CLI>
EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=<anon key from CLI>
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key from CLI>
```

### 3.4 Run Database Migrations (When Available)

```bash
pnpm db:migrate
```

### 3.5 Seed the Database (When Available)

```bash
pnpm db:seed
```

### 3.6 Start Development Servers

**Web app:**

```bash
pnpm dev
# or explicitly:
pnpm dev:web
```

**Mobile app:**

```bash
pnpm dev:mobile
```

This starts the Expo development server. Scan the QR code with the Expo Go app on your phone, or press `a` for Android emulator / `i` for iOS simulator.

---

## 4. Available Scripts

Run these from the project root:

| Script             | Description                                         |
| ------------------ | --------------------------------------------------- |
| `pnpm setup`       | Install dependencies + copy `.env.example` → `.env` |
| `pnpm dev`         | Start web app dev server                            |
| `pnpm dev:web`     | Start web app dev server                            |
| `pnpm dev:mobile`  | Start mobile app (Expo) dev server                  |
| `pnpm build`       | Production build (web)                              |
| `pnpm lint`        | Lint all workspaces                                 |
| `pnpm typecheck`   | TypeScript type-check all workspaces                |
| `pnpm test`        | Run tests across all workspaces                     |
| `pnpm db:start`    | Start local Supabase stack                          |
| `pnpm db:stop`     | Stop local Supabase stack                           |
| `pnpm db:reset`    | Reset database (drop + recreate + migrate + seed)   |
| `pnpm db:migrate`  | Run pending migrations                              |
| `pnpm db:seed`     | Re-seed the database                                |
| `pnpm db:diff`     | Generate migration from schema changes              |
| `pnpm db:push`     | Push migrations to remote Supabase                  |
| `pnpm db:studio`   | Open Supabase Studio (local)                        |
| `pnpm docker:up`   | Start Docker Compose services                       |
| `pnpm docker:down` | Stop Docker Compose services                        |
| `pnpm clean`       | Clear build caches (.next, .expo, etc.)             |

---

## 5. Project Structure

```
tabadul/
├── apps/
│   ├── mobile/              # React Native + Expo (SDK 52)
│   └── web/                 # Next.js 15 (App Router)
├── packages/
│   └── shared/              # Shared types, schemas, constants, translations
├── supabase/                # Edge Functions, migrations, seed data
├── docs/                    # Project documentation
├── tests/                   # Cross-app test suites
├── .env.example             # Environment variable template
├── docker-compose.yml       # Standalone PostgreSQL (fallback)
├── package.json             # Root workspace config + scripts
├── pnpm-workspace.yaml      # pnpm workspace definition
└── tsconfig.base.json       # Shared TypeScript config
```

For the full structure, see [/docs/architecture/project-structure.md](architecture/project-structure.md).

---

## 6. Working with Supabase Locally

### Start / Stop

```bash
supabase start    # Starts all services (first run downloads Docker images)
supabase stop     # Stops all services (preserves data)
supabase stop --no-backup  # Stops and removes all data
```

### Database Migrations

```bash
# Create a new migration
supabase migration new <migration_name>

# Apply pending migrations
supabase migration up

# Generate migration from manual Studio changes
supabase db diff --use-migra -f <migration_name>

# Reset database (drop + recreate + run all migrations + seed)
supabase db reset
```

### Edge Functions

```bash
# Create a new Edge Function
supabase functions new <function_name>

# Serve functions locally (hot reload)
supabase functions serve

# Deploy to production
supabase functions deploy <function_name>
```

### Testing Emails

Supabase local development uses [Inbucket](http://127.0.0.1:54324) as an email trap. All auth emails (confirmation, password reset, magic link) go there instead of being sent to real addresses.

---

## 7. Mobile Development Notes

### Running on Physical Device

1. Install **Expo Go** from the App Store / Google Play
2. Run `pnpm dev:mobile`
3. Scan the QR code with Expo Go

### Running on Emulator/Simulator

- **Android:** Install Android Studio → create an AVD → press `a` in the Expo CLI
- **iOS (macOS only):** Install Xcode → press `i` in the Expo CLI

### Connecting to Local Supabase from Mobile

When running on a physical device, `localhost` won't work. Use your machine's local IP:

```bash
# Find your local IP
# macOS: ipconfig getifaddr en0
# Linux: hostname -I | awk '{print $1}'
# Windows: ipconfig | findstr /i "IPv4"
```

Update `.env`:

```
EXPO_PUBLIC_SUPABASE_URL=http://<your-local-ip>:54321
```

---

## 8. Common Issues

### `supabase start` fails

- **Docker not running:** Ensure Docker Desktop is running
- **Port conflict:** Another service is using ports 54321–54324. Stop it or change ports in `supabase/config.toml`
- **First run is slow:** Docker images are downloaded (~2 GB). Subsequent starts are fast

### `pnpm install` fails

- **Node version:** Ensure Node.js ≥ 20 (`node --version`)
- **pnpm version:** Ensure pnpm ≥ 9 (`pnpm --version`)
- **Clear cache:** `pnpm store prune && rm -rf node_modules && pnpm install`

### Mobile app can't connect to Supabase

- Use your machine's LAN IP instead of `localhost` (see Section 7)
- Ensure your phone and dev machine are on the same Wi-Fi network
- Check that `supabase start` is running

### TypeScript errors after pulling changes

```bash
pnpm typecheck        # See all errors
pnpm clean && pnpm install  # Clear caches and reinstall
```

### Port 3000 already in use

```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
# Or use a different port
PORT=3001 pnpm dev
```
