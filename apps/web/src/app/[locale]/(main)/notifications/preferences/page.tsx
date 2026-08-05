import type { Metadata } from 'next';

import { PreferencesContent } from './preferences-content';

export const metadata: Metadata = {
  title: 'Notification Preferences',
  description: 'Manage your Tabadul notification preferences.',
};

export default function NotificationPreferencesPage() {
  return <PreferencesContent />;
}
