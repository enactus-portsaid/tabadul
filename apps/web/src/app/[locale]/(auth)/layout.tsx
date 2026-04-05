// ---------------------------------------------------------------------------
// Auth Route Group Layout — Login, Register, Forgot Password pages
// ---------------------------------------------------------------------------
// This layout wraps all (auth) pages. Middleware handles redirecting
// authenticated users away from these pages.
// ---------------------------------------------------------------------------
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-md px-4">
        {children}
      </div>
    </div>
  );
}
