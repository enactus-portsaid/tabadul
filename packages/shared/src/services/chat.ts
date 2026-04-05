import type { SupabaseClient } from '@supabase/supabase-js';

export const createChatService = (supabase: SupabaseClient) => {
  return {
    async getThreads(userId: string) {
      // Get threads where user is buyer or seller
      return supabase
        .from('chat_threads')
        .select(
          '*, listing:listings(title, status), buyer:profiles!buyer_id(full_name, avatar_url), seller:profiles!seller_id(full_name, avatar_url)'
        )
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
        .order('last_message_at', { ascending: false });
    },

    async getOrCreateThread(
      listingId: string,
      buyerId: string,
      sellerId: string
    ) {
      // First try to find existing thread
      const { data: existing, error: existingError } = await supabase
        .from('chat_threads')
        .select('*')
        .match({ listing_id: listingId, buyer_id: buyerId })
        .maybeSingle();

      if (existing) {
        return { data: existing, error: null };
      }

      // Create new if not exists
      return supabase
        .from('chat_threads')
        .insert({
          listing_id: listingId,
          buyer_id: buyerId,
          seller_id: sellerId,
          last_message_at: new Date().toISOString(),
        })
        .select()
        .single();
    },

    async getMessages(threadId: string) {
      return supabase
        .from('messages')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });
    },

    async sendMessage(threadId: string, senderId: string, content: string) {
      // Insert message
      const messageResponse = await supabase
        .from('messages')
        .insert({
          thread_id: threadId,
          sender_id: senderId,
          content,
        })
        .select()
        .single();

      // Update last_message_at on thread
      if (!messageResponse.error) {
        await supabase
          .from('chat_threads')
          .update({
            last_message_at: new Date().toISOString(),
          })
          .eq('id', threadId);
      }

      return messageResponse;
    },

    async markMessagesAsRead(threadId: string, userId: string) {
      // Mark messages as read where sender is NOT the current user
      return supabase
        .from('messages')
        .update({ is_read: true })
        .match({ thread_id: threadId })
        .neq('sender_id', userId);
    },
  };
};
