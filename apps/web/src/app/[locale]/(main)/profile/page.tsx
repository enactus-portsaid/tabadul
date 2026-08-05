import type { Metadata } from 'next';

import { ProfileContent } from './profile-content';

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'View and manage your Tabadul profile settings.',
};

export default function ProfilePage() {
  return <ProfileContent />;
}
