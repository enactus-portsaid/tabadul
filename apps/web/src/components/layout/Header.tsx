'use client';

// ---------------------------------------------------------------------------
// Header — Top navigation bar with green banner pattern
// ---------------------------------------------------------------------------
// Matches the design reference §3.1 Header Banner:
// - Solid primary green background
// - Greeting text, user name, location
// - Notification bell and language toggle actions
// ---------------------------------------------------------------------------

export interface HeaderProps {
  /** User's display name */
  userName?: string;
  /** User's location (e.g., city) */
  location?: string;
  /** Greeting text (auto-generated from time of day if not provided) */
  greeting?: string;
  /** Unread notification count */
  notificationCount?: number;
  /** Called when notification bell is tapped */
  onNotificationPress?: () => void;
  /** Called when language toggle is tapped */
  onLanguageToggle?: () => void;
  /** Current language */
  language?: 'ar' | 'en';
  /** Additional children rendered in the header (e.g., mode toggle) */
  children?: React.ReactNode;
}

export function Header({
  userName = '',
  location,
  greeting,
  notificationCount = 0,
  onNotificationPress,
  onLanguageToggle,
  language = 'en',
  children,
}: HeaderProps) {
  const timeGreeting =
    greeting || getTimeGreeting(language);

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="px-4 pt-12 pb-8 sm:px-6">
        {/* Top row: greeting + actions */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm opacity-80">{timeGreeting}</p>
            {userName && (
              <h1 className="text-xl font-bold mt-0.5">{userName}</h1>
            )}
            {location && (
              <p className="text-xs opacity-70 mt-0.5 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {location}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            {onLanguageToggle && (
              <button
                onClick={onLanguageToggle}
                className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center text-sm font-semibold hover:bg-white/25 transition-colors"
                aria-label={
                  language === 'en'
                    ? 'Switch to Arabic'
                    : 'التبديل إلى الإنجليزية'
                }
              >
                {language === 'en' ? 'ع' : 'En'}
              </button>
            )}

            {/* Notification bell */}
            {onNotificationPress && (
              <button
                onClick={onNotificationPress}
                className="relative h-9 w-9 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
                aria-label="Notifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                {notificationCount > 0 && (
                  <span className="absolute -top-0.5 -end-0.5 h-4 min-w-[16px] rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center px-1">
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Optional children (e.g., Buying/Selling toggle) */}
      {children && <div className="px-4 pb-4 sm:px-6">{children}</div>}
    </header>
  );
}

function getTimeGreeting(language: 'ar' | 'en'): string {
  const hour = new Date().getHours();
  if (language === 'ar') {
    if (hour < 12) return 'صباح الخير';
    if (hour < 18) return 'مساء الخير';
    return 'مساء الخير';
  }
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

Header.displayName = 'Header';
