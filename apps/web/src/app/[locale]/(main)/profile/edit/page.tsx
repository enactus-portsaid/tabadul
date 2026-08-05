import type { Metadata } from 'next';

import { EditProfileContent } from './edit-profile-content';

export const metadata: Metadata = {
  title: 'Edit Profile',
  description: 'Update your Tabadul profile information.',
};

export default function EditProfilePage() {
  return <EditProfileContent />;
}
