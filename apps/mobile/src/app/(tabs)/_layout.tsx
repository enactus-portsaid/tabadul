import { Tabs } from 'expo-router';

// ---------------------------------------------------------------------------
// Protected Tabs Layout — Main app tabs (only accessible when authenticated)
// ---------------------------------------------------------------------------
// The root _layout.tsx AuthGuard ensures users are redirected to login if
// they try to access these tabs without authentication.
// TODO(frontend): Add tab bar icons and i18n labels in Phase 3
// ---------------------------------------------------------------------------
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#16a34a', // primary green
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: 'Marketplace',
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
