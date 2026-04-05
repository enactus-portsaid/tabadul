import { Stack } from 'expo-router';

// ---------------------------------------------------------------------------
// Auth Route Group Layout — Login, Register, Forgot Password screens
// ---------------------------------------------------------------------------
// This layout wraps all (auth) screens. No auth guard here — these screens
// are accessible only when NOT authenticated (enforced by the root _layout).
// ---------------------------------------------------------------------------
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    />
  );
}
