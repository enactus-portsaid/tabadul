-- =============================================================
-- Tabadul — Initial Schema Migration
-- SOP-101: Schema Design
-- Database: PostgreSQL (via Supabase)
-- Created: 2026-03-13
-- =============================================================

-- =====================
-- 1. ENUM TYPES
-- =====================

CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'admin', 'inspector');
CREATE TYPE listing_status AS ENUM ('draft', 'active', 'sold', 'deactivated');
CREATE TYPE listing_mode AS ENUM ('fixed_price', 'auction');
CREATE TYPE transaction_status AS ENUM (
  'pending_deposit',
  'deposit_paid',
  'deposit_verified',
  'inspection_scheduled',
  'inspection_passed',
  'inspection_failed',
  'shipping',
  'delivered',
  'approved',
  'disputed',
  'completed',
  'cancelled'
);
CREATE TYPE payment_type AS ENUM ('deposit', 'remainder');
CREATE TYPE payment_status AS ENUM ('pending', 'uploaded', 'verified', 'rejected');
CREATE TYPE inspection_result AS ENUM ('pass', 'fail');
CREATE TYPE shipment_status AS ENUM ('pending', 'scheduled', 'picked_up', 'in_transit', 'delivered');
CREATE TYPE dispute_status AS ENUM ('open', 'under_review', 'resolved_buyer', 'resolved_seller');
CREATE TYPE notification_type AS ENUM ('match', 'message', 'transaction', 'system');

-- =====================
-- 2. TABLES
-- =====================

-- 2.1 Profiles (extends auth.users)
CREATE TABLE profiles (
  id              uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name       text        NOT NULL,
  factory_name    text        NOT NULL,
  email           text        NOT NULL UNIQUE,
  phone           text,
  role            user_role   NOT NULL DEFAULT 'buyer',
  industry_sector text,
  city            text,
  address         text,
  avatar_url      text,
  avg_rating      numeric(2,1) NOT NULL DEFAULT 0,
  total_reviews   integer     NOT NULL DEFAULT 0,
  is_active       boolean     NOT NULL DEFAULT true,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- 2.2 Waste Categories (self-referencing for sub-categories)
CREATE TABLE waste_categories (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en        text    NOT NULL,
  name_ar        text    NOT NULL,
  slug           text    NOT NULL UNIQUE,
  parent_id      uuid    REFERENCES waste_categories(id) ON DELETE SET NULL,
  description_en text,
  description_ar text,
  sort_order     integer NOT NULL DEFAULT 0
);

-- 2.3 Listings
CREATE TABLE listings (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id       uuid           NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  category_id     uuid           NOT NULL REFERENCES waste_categories(id) ON DELETE RESTRICT,
  title           text           NOT NULL,
  description     text,
  mode            listing_mode   NOT NULL,
  price           numeric(12,2),
  minimum_bid     numeric(12,2),
  auction_ends_at timestamptz,
  quantity        numeric(12,2)  NOT NULL,
  unit            text           NOT NULL,
  city            text           NOT NULL,
  pickup_address  text,
  status          listing_status NOT NULL DEFAULT 'active',
  created_at      timestamptz    NOT NULL DEFAULT now(),
  updated_at      timestamptz    NOT NULL DEFAULT now(),

  -- Ensure fixed_price listings have a price, auction listings have a minimum_bid
  CONSTRAINT chk_listing_fixed_price CHECK (
    mode != 'fixed_price' OR (price IS NOT NULL AND price > 0)
  ),
  CONSTRAINT chk_listing_auction CHECK (
    mode != 'auction' OR (minimum_bid IS NOT NULL AND minimum_bid > 0 AND auction_ends_at IS NOT NULL)
  )
);

-- 2.4 Listing Photos
CREATE TABLE listing_photos (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id   uuid        NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  storage_path text        NOT NULL,
  sort_order   integer     NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- 2.5 Bids
CREATE TABLE bids (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid           NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  bidder_id  uuid           NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  amount     numeric(12,2)  NOT NULL CHECK (amount > 0),
  is_winning boolean        NOT NULL DEFAULT false,
  created_at timestamptz    NOT NULL DEFAULT now()
);

-- 2.6 Bookmarks
CREATE TABLE bookmarks (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  listing_id uuid        NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT uq_bookmarks_user_listing UNIQUE (user_id, listing_id)
);

-- 2.7 Chat Threads
CREATE TABLE chat_threads (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id      uuid        NOT NULL REFERENCES listings(id) ON DELETE RESTRICT,
  buyer_id        uuid        NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  seller_id       uuid        NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  last_message_at timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT uq_chat_threads_listing_buyer UNIQUE (listing_id, buyer_id),
  CONSTRAINT chk_chat_threads_different_users CHECK (buyer_id != seller_id)
);

-- 2.8 Messages
CREATE TABLE messages (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id    uuid        NOT NULL REFERENCES chat_threads(id) ON DELETE CASCADE,
  sender_id    uuid        NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  content      text        NOT NULL,
  is_blocked   boolean     NOT NULL DEFAULT false,
  block_reason text,
  is_read      boolean     NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- 2.9 Transactions
CREATE TABLE transactions (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id        uuid               NOT NULL REFERENCES listings(id) ON DELETE RESTRICT,
  buyer_id          uuid               NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  seller_id         uuid               NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  total_amount      numeric(12,2)      NOT NULL CHECK (total_amount > 0),
  deposit_amount    numeric(12,2)      NOT NULL CHECK (deposit_amount > 0),
  commission_amount numeric(12,2),
  remainder_amount  numeric(12,2),
  status            transaction_status NOT NULL DEFAULT 'pending_deposit',
  shipment_status   shipment_status    NOT NULL DEFAULT 'pending',
  created_at        timestamptz        NOT NULL DEFAULT now(),
  updated_at        timestamptz        NOT NULL DEFAULT now(),

  CONSTRAINT chk_transactions_different_users CHECK (buyer_id != seller_id),
  CONSTRAINT chk_transactions_deposit_lte_total CHECK (deposit_amount <= total_amount)
);

-- 2.10 Payments
CREATE TABLE payments (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id uuid           NOT NULL REFERENCES transactions(id) ON DELETE RESTRICT,
  paid_by        uuid           NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  type           payment_type   NOT NULL,
  amount         numeric(12,2)  NOT NULL CHECK (amount > 0),
  receipt_url    text,
  status         payment_status NOT NULL DEFAULT 'pending',
  admin_notes    text,
  verified_by    uuid           REFERENCES profiles(id) ON DELETE SET NULL,
  verified_at    timestamptz,
  created_at     timestamptz    NOT NULL DEFAULT now()
);

-- 2.11 Inspection Reports
CREATE TABLE inspection_reports (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id uuid              NOT NULL UNIQUE REFERENCES transactions(id) ON DELETE RESTRICT,
  inspector_id   uuid              NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  result         inspection_result NOT NULL,
  notes          text,
  photos         jsonb             NOT NULL DEFAULT '[]'::jsonb,
  inspected_at   timestamptz       NOT NULL,
  created_at     timestamptz       NOT NULL DEFAULT now()
);

-- 2.12 Reviews
CREATE TABLE reviews (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id   uuid        NOT NULL UNIQUE REFERENCES transactions(id) ON DELETE RESTRICT,
  reviewer_id      uuid        NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  reviewed_user_id uuid        NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  rating           integer     NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment          text,
  created_at       timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT chk_reviews_different_users CHECK (reviewer_id != reviewed_user_id)
);

-- 2.13 Notifications
CREATE TABLE notifications (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid              NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type       notification_type NOT NULL,
  title      text              NOT NULL,
  body       text              NOT NULL,
  data       jsonb             NOT NULL DEFAULT '{}'::jsonb,
  is_read    boolean           NOT NULL DEFAULT false,
  created_at timestamptz       NOT NULL DEFAULT now()
);

-- 2.14 Notification Preferences
CREATE TABLE notification_preferences (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              uuid        NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  matches_enabled      boolean     NOT NULL DEFAULT true,
  messages_enabled     boolean     NOT NULL DEFAULT true,
  transactions_enabled boolean     NOT NULL DEFAULT true,
  push_enabled         boolean     NOT NULL DEFAULT true,
  updated_at           timestamptz NOT NULL DEFAULT now()
);

-- 2.15 Disputes
CREATE TABLE disputes (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id   uuid           NOT NULL UNIQUE REFERENCES transactions(id) ON DELETE RESTRICT,
  filed_by         uuid           NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  reason           text           NOT NULL,
  status           dispute_status NOT NULL DEFAULT 'open',
  admin_resolution text,
  resolved_by      uuid           REFERENCES profiles(id) ON DELETE SET NULL,
  resolved_at      timestamptz,
  created_at       timestamptz    NOT NULL DEFAULT now(),
  updated_at       timestamptz    NOT NULL DEFAULT now()
);

-- 2.16 Match Recommendations
CREATE TABLE match_recommendations (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  listing_id   uuid        NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  score        integer     NOT NULL CHECK (score >= 0 AND score <= 100),
  reason       text,
  is_dismissed boolean     NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT uq_match_recs_user_listing UNIQUE (user_id, listing_id)
);

-- =====================
-- 3. INDEXES
-- =====================

-- Profiles
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_city ON profiles(city);
CREATE INDEX idx_profiles_is_active ON profiles(is_active);

-- Waste Categories
CREATE INDEX idx_waste_categories_parent_id ON waste_categories(parent_id);

-- Listings
CREATE INDEX idx_listings_seller_id ON listings(seller_id);
CREATE INDEX idx_listings_category_id ON listings(category_id);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_mode ON listings(mode);
CREATE INDEX idx_listings_city ON listings(city);
CREATE INDEX idx_listings_created_at ON listings(created_at DESC);

-- Listing Photos
CREATE INDEX idx_listing_photos_listing_id ON listing_photos(listing_id);

-- Bids
CREATE INDEX idx_bids_listing_id ON bids(listing_id);
CREATE INDEX idx_bids_bidder_id ON bids(bidder_id);

-- Bookmarks
CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);

-- Chat Threads
CREATE INDEX idx_chat_threads_listing_id ON chat_threads(listing_id);
CREATE INDEX idx_chat_threads_buyer_id ON chat_threads(buyer_id);
CREATE INDEX idx_chat_threads_seller_id ON chat_threads(seller_id);

-- Messages
CREATE INDEX idx_messages_thread_id ON messages(thread_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);

-- Transactions
CREATE INDEX idx_transactions_listing_id ON transactions(listing_id);
CREATE INDEX idx_transactions_buyer_id ON transactions(buyer_id);
CREATE INDEX idx_transactions_seller_id ON transactions(seller_id);
CREATE INDEX idx_transactions_status ON transactions(status);

-- Payments
CREATE INDEX idx_payments_transaction_id ON payments(transaction_id);
CREATE INDEX idx_payments_status ON payments(status);

-- Notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read) WHERE is_read = false;

-- Match Recommendations
CREATE INDEX idx_match_recs_user_id ON match_recommendations(user_id);

-- Disputes
CREATE INDEX idx_disputes_status ON disputes(status);

-- =====================
-- 4. TRIGGERS (updated_at)
-- =====================

-- Helper function for auto-updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_listings_updated_at
  BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_disputes_updated_at
  BEFORE UPDATE ON disputes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_notification_preferences_updated_at
  BEFORE UPDATE ON notification_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================
-- 5. TRIGGER: Auto-update profiles.avg_rating / total_reviews
-- =====================

CREATE OR REPLACE FUNCTION update_profile_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles SET
    avg_rating = COALESCE((
      SELECT ROUND(AVG(rating)::numeric, 1)
      FROM reviews
      WHERE reviewed_user_id = NEW.reviewed_user_id
    ), 0),
    total_reviews = (
      SELECT COUNT(*)
      FROM reviews
      WHERE reviewed_user_id = NEW.reviewed_user_id
    )
  WHERE id = NEW.reviewed_user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_reviews_update_profile_rating
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_profile_rating();
