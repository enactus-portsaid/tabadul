-- SOP-204: Row Level Security Policies

-- 1. Helper Function for Role Checks
CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS user_role
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$;

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE waste_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspection_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_recommendations ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- profiles
-- -----------------------------------------------------------------------------
CREATE POLICY "Profiles are viewable by everyone" 
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can update any profile" 
  ON profiles FOR UPDATE USING (public.get_auth_role() = 'admin');

-- -----------------------------------------------------------------------------
-- waste_categories
-- -----------------------------------------------------------------------------
CREATE POLICY "Waste categories are viewable by everyone" 
  ON waste_categories FOR SELECT USING (true);

CREATE POLICY "Admins can insert waste categories" 
  ON waste_categories FOR INSERT WITH CHECK (public.get_auth_role() = 'admin');

CREATE POLICY "Admins can update waste categories" 
  ON waste_categories FOR UPDATE USING (public.get_auth_role() = 'admin');

CREATE POLICY "Admins can delete waste categories" 
  ON waste_categories FOR DELETE USING (public.get_auth_role() = 'admin');

-- -----------------------------------------------------------------------------
-- listings
-- -----------------------------------------------------------------------------
CREATE POLICY "Listings are viewable by everyone" 
  ON listings FOR SELECT USING (
    status = 'active' OR 
    seller_id = auth.uid() OR 
    public.get_auth_role() = 'admin' OR 
    (public.get_auth_role() = 'inspector' AND id IN (
      SELECT listing_id FROM transactions WHERE id IN (
        SELECT transaction_id FROM inspection_reports WHERE inspector_id = auth.uid()
      )
    ))
  );

CREATE POLICY "Sellers can insert listings" 
  ON listings FOR INSERT WITH CHECK (seller_id = auth.uid());

CREATE POLICY "Sellers can update own listings" 
  ON listings FOR UPDATE USING (seller_id = auth.uid());

CREATE POLICY "Admins can update any listing" 
  ON listings FOR UPDATE USING (public.get_auth_role() = 'admin');

CREATE POLICY "Sellers can delete own listings" 
  ON listings FOR DELETE USING (seller_id = auth.uid());

CREATE POLICY "Admins can delete any listing" 
  ON listings FOR DELETE USING (public.get_auth_role() = 'admin');

-- -----------------------------------------------------------------------------
-- listing_photos
-- -----------------------------------------------------------------------------
CREATE POLICY "Listing photos are viewable by everyone" 
  ON listing_photos FOR SELECT USING (true);

CREATE POLICY "Sellers can insert photos to own listings" 
  ON listing_photos FOR INSERT WITH CHECK (listing_id IN (SELECT id FROM listings WHERE seller_id = auth.uid()));

CREATE POLICY "Sellers can update photos of own listings" 
  ON listing_photos FOR UPDATE USING (listing_id IN (SELECT id FROM listings WHERE seller_id = auth.uid()));

CREATE POLICY "Sellers can delete photos of own listings" 
  ON listing_photos FOR DELETE USING (listing_id IN (SELECT id FROM listings WHERE seller_id = auth.uid()));

CREATE POLICY "Admins manage all listing photos"
  ON listing_photos FOR ALL USING (public.get_auth_role() = 'admin');

-- -----------------------------------------------------------------------------
-- bids
-- -----------------------------------------------------------------------------
CREATE POLICY "Bidders can view their own bids" 
  ON bids FOR SELECT USING (bidder_id = auth.uid());

CREATE POLICY "Sellers can view bids on their listings" 
  ON bids FOR SELECT USING (listing_id IN (SELECT id FROM listings WHERE seller_id = auth.uid()));

CREATE POLICY "Admins can view all bids" 
  ON bids FOR SELECT USING (public.get_auth_role() = 'admin');

CREATE POLICY "Buyers can place bids" 
  ON bids FOR INSERT WITH CHECK (bidder_id = auth.uid());

-- -----------------------------------------------------------------------------
-- bookmarks
-- -----------------------------------------------------------------------------
CREATE POLICY "Users can manage own bookmarks" 
  ON bookmarks FOR ALL USING (user_id = auth.uid());

-- -----------------------------------------------------------------------------
-- chat_threads
-- -----------------------------------------------------------------------------
CREATE POLICY "Participants can view their chat threads" 
  ON chat_threads FOR SELECT USING (buyer_id = auth.uid() OR seller_id = auth.uid());

CREATE POLICY "Admins can view all chat threads" 
  ON chat_threads FOR SELECT USING (public.get_auth_role() = 'admin');

CREATE POLICY "Buyers can create chat threads" 
  ON chat_threads FOR INSERT WITH CHECK (buyer_id = auth.uid());

-- -----------------------------------------------------------------------------
-- messages
-- -----------------------------------------------------------------------------
CREATE POLICY "Participants can view messages in their threads" 
  ON messages FOR SELECT USING (thread_id IN (SELECT id FROM chat_threads WHERE buyer_id = auth.uid() OR seller_id = auth.uid()));

CREATE POLICY "Admins can view all messages" 
  ON messages FOR SELECT USING (public.get_auth_role() = 'admin');

CREATE POLICY "Participants can send messages" 
  ON messages FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND 
    thread_id IN (SELECT id FROM chat_threads WHERE buyer_id = auth.uid() OR seller_id = auth.uid())
  );

-- -----------------------------------------------------------------------------
-- transactions
-- -----------------------------------------------------------------------------
CREATE POLICY "Participants can view their transactions" 
  ON transactions FOR SELECT USING (buyer_id = auth.uid() OR seller_id = auth.uid());

CREATE POLICY "Admins can view all transactions" 
  ON transactions FOR SELECT USING (public.get_auth_role() = 'admin');

CREATE POLICY "Inspectors can view assigned transactions" 
  ON transactions FOR SELECT USING (
    public.get_auth_role() = 'inspector' AND 
    id IN (SELECT transaction_id FROM inspection_reports WHERE inspector_id = auth.uid())
  );

CREATE POLICY "Buyers can create transactions" 
  ON transactions FOR INSERT WITH CHECK (buyer_id = auth.uid());

CREATE POLICY "Participants can update transactions"
  ON transactions FOR UPDATE USING (buyer_id = auth.uid() OR seller_id = auth.uid());

CREATE POLICY "Admins can update transactions" 
  ON transactions FOR UPDATE USING (public.get_auth_role() = 'admin');

-- -----------------------------------------------------------------------------
-- payments
-- -----------------------------------------------------------------------------
CREATE POLICY "Buyers can view their payments" 
  ON payments FOR SELECT USING (paid_by = auth.uid());

CREATE POLICY "Sellers can view payments for their transactions" 
  ON payments FOR SELECT USING (transaction_id IN (SELECT id FROM transactions WHERE seller_id = auth.uid()));

CREATE POLICY "Admins can view all payments" 
  ON payments FOR SELECT USING (public.get_auth_role() = 'admin');

CREATE POLICY "Buyers can insert payments" 
  ON payments FOR INSERT WITH CHECK (paid_by = auth.uid());

CREATE POLICY "Admins can verify payments" 
  ON payments FOR UPDATE USING (public.get_auth_role() = 'admin');

-- -----------------------------------------------------------------------------
-- inspection_reports
-- -----------------------------------------------------------------------------
CREATE POLICY "Participants can view inspection reports" 
  ON inspection_reports FOR SELECT USING (
    transaction_id IN (SELECT id FROM transactions WHERE buyer_id = auth.uid() OR seller_id = auth.uid())
  );

CREATE POLICY "Inspectors can view own inspection reports" 
  ON inspection_reports FOR SELECT USING (inspector_id = auth.uid());

CREATE POLICY "Admins can view all inspection reports" 
  ON inspection_reports FOR SELECT USING (public.get_auth_role() = 'admin');

CREATE POLICY "Inspectors can insert own inspection reports" 
  ON inspection_reports FOR INSERT WITH CHECK (inspector_id = auth.uid());

CREATE POLICY "Inspectors can update own inspection reports" 
  ON inspection_reports FOR UPDATE USING (inspector_id = auth.uid());

CREATE POLICY "Admins manage inspection reports"
  ON inspection_reports FOR ALL USING (public.get_auth_role() = 'admin');

-- -----------------------------------------------------------------------------
-- reviews
-- -----------------------------------------------------------------------------
CREATE POLICY "Reviews are viewable by everyone" 
  ON reviews FOR SELECT USING (true);

CREATE POLICY "Reviewers can insert own reviews" 
  ON reviews FOR INSERT WITH CHECK (reviewer_id = auth.uid());

CREATE POLICY "Admins manage reviews"
  ON reviews FOR ALL USING (public.get_auth_role() = 'admin');

-- -----------------------------------------------------------------------------
-- notifications
-- -----------------------------------------------------------------------------
CREATE POLICY "Users can manage own notifications" 
  ON notifications FOR ALL USING (user_id = auth.uid());

-- -----------------------------------------------------------------------------
-- notification_preferences
-- -----------------------------------------------------------------------------
CREATE POLICY "Users can manage own preferences" 
  ON notification_preferences FOR ALL USING (user_id = auth.uid());

-- -----------------------------------------------------------------------------
-- disputes
-- -----------------------------------------------------------------------------
CREATE POLICY "Disputers can view own disputes" 
  ON disputes FOR SELECT USING (filed_by = auth.uid());

CREATE POLICY "Sellers can view disputes on their transactions" 
  ON disputes FOR SELECT USING (transaction_id IN (SELECT id FROM transactions WHERE seller_id = auth.uid()));

CREATE POLICY "Admins can view all disputes" 
  ON disputes FOR SELECT USING (public.get_auth_role() = 'admin');

CREATE POLICY "Users can file disputes" 
  ON disputes FOR INSERT WITH CHECK (filed_by = auth.uid());

CREATE POLICY "Admins can resolve disputes" 
  ON disputes FOR UPDATE USING (public.get_auth_role() = 'admin');

-- -----------------------------------------------------------------------------
-- match_recommendations
-- -----------------------------------------------------------------------------
CREATE POLICY "Users can manage own match recs" 
  ON match_recommendations FOR ALL USING (user_id = auth.uid());
