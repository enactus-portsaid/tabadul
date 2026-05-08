# Authentication & Profile — UI Design

> **SOP:** SOP-302 · **Input Mode:** Detailed (v0 prototype)
> **User Stories:** US-001–005
> **Reference Screens:** `09-profile.png`, `10-profile-scroll.png`, `11-home-seller-toggle.png`
> **Updated:** 2026-05-08

---

## 1. User Flows (Step 3)

### Flow 1: New User Registration (US-001)

```
[Landing / Login Page] → Click "Create Account"
    → [Registration Page]
        → Fill: factory name, email, password, confirm password
        → Click "Create Account"
            ├── Validation fail → Inline field errors (Zod schema)
            └── Pass → API call (loading state)
                ├── Success → [Email Verification Notice Page]
                │   → User checks email → clicks verify link
                │       → [Login Page] with success banner
                └── Error (email exists) → Inline error "Account already exists"
```

### Flow 2: User Login (US-002)

```
[Login Page]
    → Enter email + password
    → Click "Log In"
        ├── Validation fail → Inline errors
        └── Pass → API call (loading state)
            ├── Success → Redirect to [Dashboard Home]
            ├── Wrong credentials → Error banner "Invalid email or password"
            └── Unverified → Error "Please verify your email first"

[Login Page] → Click "Forgot Password?"
    → [Forgot Password Page]
        → Enter email → Click "Send Reset Link"
            ├── Success → Confirmation message (always shown to prevent enumeration)
            └── Error → Generic error message
```

### Flow 3: Factory Profile Setup (US-003)

```
[First Login - No Profile]
    → Redirect to [Profile Setup Page]
        → Fill: factory name, location (city dropdown), industry sector
        → Optional: description, phone
        → Click "Complete Setup"
            ├── Validation fail → Inline errors
            └── Success → Redirect to [Dashboard Home] with welcome toast
```

### Flow 4: View & Edit Profile (US-005)

```
[Sidebar] → Click "Profile" / "My Account"
    → [Profile Page]
        → View: profile card, stats, settings menu
        → Click "Account Info"
            → [Edit Profile Page]
                → Modify fields → "Save Changes"
                    ├── Success → Toast "Profile updated" + return
                    └── Error → Inline errors
        → Click "Location & Address"
            → [Edit Location Page] → Same pattern
        → Click "Notifications"
            → [Notification Preferences Page]
        → Click "Settings"
            → [App Settings Page] (theme, language)
```

### Flow 5: Buying/Selling Mode Switch (US-004)

```
[Dashboard Home] → Toggle "Buying" ↔ "Selling"
    → Immediate content switch (no page navigation)
    → Buying: shows match cards, marketplace CTA, recent transactions
    → Selling: shows stat cards, create listing CTA, my listings
    → Mode persisted in Zustand store
```

---

## 2. Text-Based Wireframes (Step 4)

### 2.1 Login Page

**Desktop (≥1024px):**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                        ┌────────────────────────┐                  │
│                        │                        │                  │
│                        │   🌿 Tabadul (تبادل)   │                  │
│                        │   ─────────────────     │                  │
│                        │                        │                  │
│                        │   Email                │                  │
│                        │   [                  ] │                  │
│                        │                        │                  │
│                        │   Password             │                  │
│                        │   [              ] [👁] │                  │
│                        │                        │                  │
│                        │   [Forgot Password?  ] │                  │
│                        │                        │                  │
│                        │   [   Log In        ]  │  ← Primary CTA  │
│                        │                        │                  │
│                        │   ─── or ───           │                  │
│                        │                        │                  │
│                        │   Don't have an        │                  │
│                        │   account?             │                  │
│                        │   [Create Account]     │  ← Link          │
│                        │                        │                  │
│                        └────────────────────────┘                  │
│                                                                     │
│               bg-background (warm cream)                            │
└─────────────────────────────────────────────────────────────────────┘
```

**Mobile (<640px):**

```
┌──────────────────────────┐
│                          │
│    🌿 Tabadul (تبادل)    │
│                          │
│  ┌────────────────────┐  │
│  │                    │  │
│  │ Email              │  │
│  │ [                ] │  │
│  │                    │  │
│  │ Password           │  │
│  │ [            ] [👁] │  │
│  │                    │  │
│  │ Forgot Password?   │  │
│  │                    │  │
│  │ [   Log In      ]  │  │
│  │                    │  │
│  │ ─── or ───        │  │
│  │ Don't have an     │  │
│  │ account?          │  │
│  │ [Create Account]  │  │
│  │                    │  │
│  └────────────────────┘  │
│                          │
└──────────────────────────┘
```

### 2.2 Registration Page

**Desktop (≥1024px):**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                        ┌────────────────────────┐                  │
│                        │                        │                  │
│                        │   🌿 Create Account     │                  │
│                        │   ─────────────────     │                  │
│                        │                        │                  │
│                        │   Factory Name *        │                  │
│                        │   [                  ] │                  │
│                        │                        │                  │
│                        │   Email *               │                  │
│                        │   [                  ] │                  │
│                        │                        │                  │
│                        │   Password *            │                  │
│                        │   [              ] [👁] │                  │
│                        │   ▪ 8+ chars ▪ upper   │  ← Strength     │
│                        │   ▪ lower ▪ number     │     indicators   │
│                        │                        │                  │
│                        │   Confirm Password *    │                  │
│                        │   [              ] [👁] │                  │
│                        │                        │                  │
│                        │   [ Create Account   ]  │  ← Primary CTA  │
│                        │                        │                  │
│                        │   Already have an       │                  │
│                        │   account? [Log In]     │                  │
│                        │                        │                  │
│                        └────────────────────────┘                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Mobile:** Same layout, full-width card with px-4 padding.

### 2.3 Email Verification Notice

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                        ┌────────────────────────┐                  │
│                        │                        │                  │
│                        │   ✉️  Check Your Email   │                  │
│                        │                        │                  │
│                        │   We sent a             │                  │
│                        │   verification link to  │                  │
│                        │   user@example.com      │                  │
│                        │                        │                  │
│                        │   [Resend Email     ]   │  ← Secondary    │
│                        │   [Back to Login    ]   │  ← Link         │
│                        │                        │                  │
│                        └────────────────────────┘                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.4 Forgot Password Page

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                        ┌────────────────────────┐                  │
│                        │                        │                  │
│                        │   🔒 Reset Password     │                  │
│                        │                        │                  │
│                        │   Enter your email and  │                  │
│                        │   we'll send a reset    │                  │
│                        │   link.                 │                  │
│                        │                        │                  │
│                        │   Email *               │                  │
│                        │   [                  ] │                  │
│                        │                        │                  │
│                        │   [Send Reset Link   ]  │                  │
│                        │   [← Back to Login   ]  │                  │
│                        │                        │                  │
│                        └────────────────────────┘                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.5 Profile Page (My Account)

**Desktop (≥1024px) — matches v0 `09-profile.png`:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │  My Account                                           │
│            │─────────────────────────────────────────────────────────│
│            │                                                        │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │▓▓▓▓▓▓▓▓▓▓▓ Green Banner ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ [✏️]│  │
│            │  │                                                 │  │
│            │  │         ┌──────┐                                │  │
│            │  │         │  AH  │  ← Avatar (initials)         │  │
│            │  │         └──────┘                                │  │
│            │  │      Ahmed Hassan                               │  │
│            │  │      Cairo Steel Works                          │  │
│            │  │      📍 Port Said, Egypt                        │  │
│            │  │                                                 │  │
│            │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐       │  │
│            │  │  │    23    │ │   4.8    │ │    12    │       │  │
│            │  │  │Transact. │ │ Rating   │ │ Months   │       │  │
│            │  │  └──────────┘ └──────────┘ └──────────┘       │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │                                                        │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │ 👤  Account Info                            >  │  │
│            │  │     Name, email, phone                          │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │ 📍  Location & Address                      >  │  │
│            │  │     City, zone, coordinates                     │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │ 🔔  Notifications                           >  │  │
│            │  │     Manage notification preferences             │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │ ⚙️  Settings                                >  │  │
│            │  │     Theme, language, app preferences            │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │                                                        │
│            │  [Log Out]                                  ← Danger  │
└─────────────────────────────────────────────────────────────────────┘
```

**Mobile (<640px):**

```
┌──────────────────────────┐
│ ☰  My Account         🔔 │
├──────────────────────────┤
│▓▓▓▓▓ Green Banner ▓▓▓ ✏️│
│       ┌────┐             │
│       │ AH │             │
│       └────┘             │
│    Ahmed Hassan          │
│    Cairo Steel Works     │
│    📍 Port Said          │
│                          │
│ ┌──────┐┌──────┐┌──────┐│
│ │  23  ││ 4.8  ││  12  ││
│ │Trans.││Rating││Months││
│ └──────┘└──────┘└──────┘│
│                          │
│ ┌──────────────────────┐ │
│ │👤 Account Info     > │ │
│ │  Name, email, phone  │ │
│ ├──────────────────────┤ │
│ │📍 Location         > │ │
│ │  City, zone          │ │
│ ├──────────────────────┤ │
│ │🔔 Notifications    > │ │
│ ├──────────────────────┤ │
│ │⚙️ Settings          > │ │
│ └──────────────────────┘ │
│                          │
│ [Log Out]                │
└──────────────────────────┘
```

### 2.6 Edit Profile Page

**Desktop (max-w-2xl centered within content area):**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │  ← Back to Profile                                   │
│            │─────────────────────────────────────────────────────────│
│            │                                                        │
│            │  Account Information                                   │
│            │                                                        │
│            │  ┌────────────────────────────────────────┐           │
│            │  │                                        │           │
│            │  │  Factory Name *                        │           │
│            │  │  [Cairo Steel Works              ]    │           │
│            │  │                                        │           │
│            │  │  Email (read-only)                     │           │
│            │  │  [ahmed@cairosteel.com         ] 🔒   │           │
│            │  │                                        │           │
│            │  │  Phone                                 │           │
│            │  │  [+20 10 XXXX XXXX              ]     │           │
│            │  │                                        │           │
│            │  │  Industry Sector *                     │           │
│            │  │  [Manufacturing             ▼]        │           │
│            │  │                                        │           │
│            │  │  Description                           │           │
│            │  │  [                                ]    │           │
│            │  │  [                                ]    │           │
│            │  │                                        │           │
│            │  │  [Cancel]         [Save Changes]       │           │
│            │  │                                        │           │
│            │  └────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Hierarchy (Step 5)

### Login Page

```
LoginPage (Server Component — layout from (auth)/layout.tsx)
├── AuthCard
│   ├── Logo + Title ("Log In")
│   ├── LoginForm (Client Component)
│   │   ├── Input (email, type="email")
│   │   ├── Input (password, type="password")
│   │   │   └── PasswordToggle (show/hide icon button)
│   │   ├── Link ("Forgot Password?")
│   │   ├── ErrorBanner (conditional, role="alert")
│   │   └── Button ("Log In", isLoading)
│   └── Footer
│       └── Link ("Create Account")
```

### Registration Page

```
RegisterPage (Server Component)
├── AuthCard
│   ├── Logo + Title ("Create Account")
│   ├── RegisterForm (Client Component)
│   │   ├── Input (factory name)
│   │   ├── Input (email)
│   │   ├── Input (password) + PasswordStrength indicator
│   │   ├── Input (confirm password)
│   │   ├── ErrorBanner (conditional)
│   │   └── Button ("Create Account", isLoading)
│   └── Footer
│       └── Link ("Log In")
```

### Profile Page

```
ProfilePage (Server Component — fetches profile data)
├── Container
├── ProfileCard
│   ├── GreenBanner (bg-primary, rounded top)
│   ├── Avatar (initials fallback, centered)
│   ├── UserInfo (name, factory, location)
│   ├── EditButton (icon, top-right)
│   └── StatsRow
│       └── StatCard ×3 (Transactions, Rating, Months)
├── SettingsMenu
│   └── SettingsMenuItem ×4
│       ├── Icon (in muted circle)
│       ├── Title + Subtitle
│       └── Chevron (>)
└── Button ("Log Out", variant="ghost", destructive)
```

### Edit Profile Page

```
EditProfilePage (Client Component)
├── Container (max-w-2xl)
├── BackLink ("← Back to Profile")
├── PageTitle ("Account Information")
├── EditProfileForm (Client)
│   ├── Input (factory name, required)
│   ├── Input (email, disabled/read-only)
│   ├── Input (phone, type="tel")
│   ├── Select (industry sector, required)
│   ├── Textarea (description, optional)
│   ├── ErrorBanner (conditional)
│   └── ActionBar
│       ├── Button ("Cancel", variant="outline")
│       └── Button ("Save Changes", isLoading)
```

### Forgot Password Page

```
ForgotPasswordPage (Server Component)
├── AuthCard
│   ├── Icon (🔒) + Title ("Reset Password")
│   ├── Description text
│   ├── ForgotPasswordForm (Client)
│   │   ├── Input (email)
│   │   ├── Button ("Send Reset Link", isLoading)
│   │   └── SuccessMessage (conditional, role="status")
│   └── BackLink ("← Back to Login")
```

### Email Verification Page

```
VerifyEmailPage (Server Component)
├── AuthCard
│   ├── Icon (✉️) + Title ("Check Your Email")
│   ├── Description (shows submitted email)
│   ├── Button ("Resend Email", variant="outline")
│   └── Link ("Back to Login")
```

### AuthCard (shared wrapper)

```
AuthCard
├── Card (bg-surface, shadow-elevated, rounded-2xl, max-w-md centered)
│   ├── CardHeader
│   │   ├── Logo / Icon
│   │   └── Title (h1)
│   ├── CardContent
│   │   └── {children} — form slot
│   └── CardFooter
│       └── {footer} — links slot
```

---

## 4. Micro-Interactions (Step 6)

| Interaction             | Trigger               | Animation                                                                   | Duration                  | Feedback                         |
| ----------------------- | --------------------- | --------------------------------------------------------------------------- | ------------------------- | -------------------------------- |
| **Password visibility** | Click eye icon        | Icon morphs 👁→👁‍🗨, input type toggles                                       | Instant                   | `aria-label` updates             |
| **Password strength**   | Typing in password    | Strength bar fills + color shifts (red→yellow→green), rule checks animate ✓ | 200ms per rule            | Rules marked ✓/✗ in real-time    |
| **Form submit**         | Click CTA button      | Button → loading spinner, inputs disabled                                   | Until response            | Spinner replaces button text     |
| **Validation error**    | Blur or submit        | Field border → red, error text slides in below                              | 200ms ease-out            | `aria-describedby` links error   |
| **Error banner**        | API error response    | Banner slides down from top of form, shake animation                        | 300ms slide + 200ms shake | `role="alert"` announced         |
| **Success redirect**    | Login success         | Brief green flash on button, then fade-out page transition                  | 400ms total               | Redirect to dashboard            |
| **Profile stat hover**  | Mouse enter stat card | Subtle scale 1→1.05, number color intensifies                               | 150ms ease                | Cursor pointer if clickable      |
| **Settings item hover** | Mouse enter menu item | Background subtly darkens, chevron slides right 4px                         | 200ms ease                | Cursor pointer                   |
| **Log out**             | Click log out         | Confirmation (if unsaved), fade out, redirect to login                      | 300ms                     | Toast "Logged out successfully"  |
| **Mode toggle**         | Click Buying↔Selling  | Active tab slides with spring animation, content crossfades                 | 300ms spring              | Dashboard content swaps entirely |

---

## 5. Responsive Breakpoints (Step 7)

### Auth Pages (Login, Register, Forgot Password, Verify Email)

| Element      | Mobile (<640)                      | Tablet (640–1023)       | Desktop (≥1024)                                        |
| ------------ | ---------------------------------- | ----------------------- | ------------------------------------------------------ |
| Layout       | Full-screen, card flush with edges | Centered card, max-w-md | Centered card, max-w-md                                |
| Card padding | px-4 py-6                          | px-8 py-8               | px-8 py-10                                             |
| Logo         | Smaller (h-8)                      | Medium (h-10)           | Medium (h-10)                                          |
| Background   | Plain bg-background                | Plain bg-background     | Optional: split layout (illustration left, form right) |
| Navigation   | No sidebar                         | No sidebar              | No sidebar (auth layout has no chrome)                 |

### Profile Page

| Element       | Mobile (<640)                    | Tablet (640–1023)    | Desktop (≥1024)               |
| ------------- | -------------------------------- | -------------------- | ----------------------------- |
| Sidebar       | Hidden (hamburger)               | Hidden (hamburger)   | Persistent (240px)            |
| Profile card  | Full-width, no horizontal margin | Full-width with px-6 | max-w-2xl centered in content |
| Stats row     | 3 columns, compact               | 3 columns, spacious  | 3 columns with larger numbers |
| Settings menu | Full-width                       | Full-width with px-6 | max-w-2xl centered            |
| Banner height | 100px                            | 120px                | 140px                         |
| Avatar size   | 64px                             | 80px                 | 96px                          |

### Edit Profile Page

| Element        | Mobile (<640)      | Tablet (640–1023)           | Desktop (≥1024)             |
| -------------- | ------------------ | --------------------------- | --------------------------- |
| Form width     | Full width (px-4)  | max-w-lg centered           | max-w-2xl centered          |
| Action buttons | Full-width stacked | Side by side, right-aligned | Side by side, right-aligned |
| Back link      | ← icon only        | ← with text                 | ← with text                 |

---

## 6. Accessibility Requirements (Step 8)

### Auth Pages (Login, Register, Forgot Password)

| Element           | Requirement                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| Form              | `role="form"`, `aria-label="Log in"` / `"Create account"`                                       |
| Required fields   | `aria-required="true"`, asterisk (\*) in label                                                  |
| Error messages    | Each linked via `aria-describedby` on the input                                                 |
| Error banner      | `role="alert"`, auto-focused when shown                                                         |
| Password toggle   | `aria-label="Show password"` / `"Hide password"`, `aria-pressed`                                |
| Password strength | `role="status"`, `aria-label="Password strength: strong"`, rules list uses `aria-live="polite"` |
| Submit button     | `aria-busy="true"` during loading, `aria-disabled` when form invalid                            |
| Auth links        | Visible focus ring, descriptive text (not "click here")                                         |

### Profile Page

| Element        | Requirement                                                                      |
| -------------- | -------------------------------------------------------------------------------- |
| Profile card   | `role="region"`, `aria-label="Profile information"`                              |
| Avatar         | `aria-hidden="true"` (decorative — name is in text)                              |
| Stats          | Each: `aria-label="23 transactions completed"` etc.                              |
| Rating display | `aria-label="Rated 4.8 out of 5 stars"`                                          |
| Settings items | Each is `<a>` or `<button>`, descriptive `aria-label`                            |
| Edit button    | `aria-label="Edit profile"`                                                      |
| Log out button | `aria-label="Log out of your account"`, confirm dialog uses `role="alertdialog"` |

### Edit Profile Page

| Element         | Requirement                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| Form            | `role="form"`, `aria-label="Edit profile"`                                    |
| Read-only email | `aria-readonly="true"`, visually distinguished (lock icon + muted background) |
| Industry select | `aria-label="Industry sector"`, keyboard navigable                            |
| Cancel/Save     | Cancel does not require confirmation if no changes; Save shows loading        |
| Unsaved changes | Browser `beforeunload` prompt if form is dirty                                |

### Keyboard Navigation

| Screen       | Tab Order                                                                                                             |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| Login        | Skip link → Email → Password → Show/Hide toggle → Forgot Password → Log In → Create Account                           |
| Register     | Skip link → Factory Name → Email → Password → Show/Hide → Confirm Password → Show/Hide → Create Account → Log In link |
| Profile      | Skip link → Sidebar → Edit button → Stats (if clickable) → Settings items (top→bottom) → Log Out                      |
| Edit Profile | Skip link → Back link → First form field → ... → Cancel → Save Changes                                                |

---

## 7. Design Token Mapping

| Visual Element        | Token                                                           | Notes                        |
| --------------------- | --------------------------------------------------------------- | ---------------------------- |
| Auth page bg          | `bg-background`                                                 | Warm cream `#F5F1EB`         |
| Auth card             | `bg-surface shadow-elevated rounded-2xl`                        | White elevated card          |
| Profile banner        | `bg-primary`                                                    | Forest green `#1B4332`       |
| Profile card          | `bg-surface shadow-card rounded-xl`                             | White card                   |
| Avatar circle         | `bg-primary-light text-primary-foreground`                      | Green circle, white initials |
| Stat numbers          | `text-primary font-bold text-2xl`                               | Green numbers                |
| Settings item         | `bg-surface hover:bg-surface-muted`                             | White → subtle cream         |
| Settings icon circle  | `bg-primary/10 text-primary`                                    | Light green tinted circle    |
| CTA button            | `bg-primary text-primary-foreground`                            | Green button                 |
| Destructive (Log Out) | `text-red-600 hover:bg-red-50`                                  | Red text, subtle hover       |
| Error text            | `text-red-600`                                                  | Inline validation errors     |
| Success banner        | `bg-status-success/10 text-status-success`                      | Green tinted banner          |
| Password strength     | Red → `#EF4444`, Yellow → `#EAB308`, Green → `--status-success` | Progressive color            |
