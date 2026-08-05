import type { Metadata } from 'next';

import { NotificationsContent } from './notifications-content';

export const metadata: Metadata = {
  title: 'Notifications',
  description: 'Stay updated with your Tabadul activity notifications.',
};

export default function NotificationsPage() {
  return <NotificationsContent />;
}
