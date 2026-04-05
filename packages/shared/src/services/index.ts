export * from './admin';
export * from './auth';
export * from './chat';
export * from './inspection';
export * from './listing';
export * from './matching';
export * from './notification';
export * from './transaction';

// Convenience factory that instantiates all services with the same Supabase client
import type { SupabaseClient } from '@supabase/supabase-js';

import { createAdminService } from './admin';
import { createAuthService } from './auth';
import { createChatService } from './chat';
import { createInspectionService } from './inspection';
import { createListingService } from './listing';
import { createMatchingService } from './matching';
import { createNotificationService } from './notification';
import { createTransactionService } from './transaction';

export const createServices = (supabase: SupabaseClient) => {
  return {
    auth: createAuthService(supabase),
    listing: createListingService(supabase),
    transaction: createTransactionService(supabase),
    chat: createChatService(supabase),
    matching: createMatchingService(supabase),
    inspection: createInspectionService(supabase),
    notification: createNotificationService(supabase),
    admin: createAdminService(supabase),
  };
};
