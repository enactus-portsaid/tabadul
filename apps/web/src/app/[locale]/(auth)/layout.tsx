// ---------------------------------------------------------------------------
// Auth Route Group Layout — Login, Register, Forgot Password pages
// ---------------------------------------------------------------------------
// Centered card layout with warm cream background per design spec §2.1.
// Middleware handles redirecting authenticated users away from these pages.
// ---------------------------------------------------------------------------
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
