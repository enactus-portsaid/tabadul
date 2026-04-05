import type { SupabaseClient } from '@supabase/supabase-js';

export const createListingService = (supabase: SupabaseClient) => {
  return {
    async getListings(filters?: {
      wasteType?: string;
      maxPrice?: number;
      city?: string;
    }) {
      let query = supabase
        .from('listings')
        .select('*, seller:profiles(full_name, factory_name, avg_rating)')
        .eq('status', 'active');

      if (filters?.wasteType) {
        query = query.eq('category_id', filters.wasteType); // Assuming category_id or wasteType match
      }
      if (filters?.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }
      if (filters?.city) {
        query = query.eq('city', filters.city);
      }

      return query.order('created_at', { ascending: false });
    },

    async getListing(id: string) {
      return supabase
        .from('listings')
        .select('*, seller:profiles(*), photos:listing_photos(*)')
        .eq('id', id)
        .single();
    },

    async createListing(data: any) {
      return supabase.from('listings').insert(data).select().single();
    },

    async updateListing(id: string, data: any) {
      return supabase
        .from('listings')
        .update(data)
        .eq('id', id)
        .select()
        .single();
    },

    async deactivateListing(id: string) {
      return supabase
        .from('listings')
        .update({ status: 'deactivated' })
        .eq('id', id)
        .select()
        .single();
    },

    async placeBid(listingId: string, bidderId: string, amount: number) {
      return supabase
        .from('bids')
        .insert({
          listing_id: listingId,
          bidder_id: bidderId,
          amount,
        })
        .select()
        .single();
    },

    async toggleBookmark(userId: string, listingId: string) {
      // Check if exists
      const { data: existing } = await supabase
        .from('bookmarks')
        .select('id')
        .match({ user_id: userId, listing_id: listingId })
        .maybeSingle();

      if (existing) {
        return supabase.from('bookmarks').delete().eq('id', existing.id);
      } else {
        return supabase
          .from('bookmarks')
          .insert({ user_id: userId, listing_id: listingId })
          .select()
          .single();
      }
    },
  };
};
