-- =============================================================
-- Tabadul — Seed Data
-- SOP-102: Seed Data
-- =============================================================

-- Clear existing data if necessary (handled mostly by db reset, but good practice if run explicitly)
-- Since `supabase db reset` drops the schema and re-runs migrations, clearing is optional but safe.

-- =====================
-- 1. EXTENSIONS
-- =====================
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =====================
-- 2. USERS (auth.users & public.profiles)
-- =====================
-- We use deterministic UUIDs for reference in other tables

DO $$
DECLARE
  admin_id uuid := '00000000-0000-0000-0000-000000000001';
  inspector_id uuid := '00000000-0000-0000-0000-000000000002';
  seller_id uuid := '00000000-0000-0000-0000-000000000003';
  buyer_id uuid := '00000000-0000-0000-0000-000000000004';
  mixed_id uuid := '00000000-0000-0000-0000-000000000005';
  
  -- Category UUIDs
  cat_metal uuid := '10000000-0000-0000-0000-000000000001';
  cat_plastic uuid := '10000000-0000-0000-0000-000000000002';
  cat_textile uuid := '10000000-0000-0000-0000-000000000003';
  cat_copper uuid := '10000000-0000-0000-0000-000000000011';
  cat_pet uuid := '10000000-0000-0000-0000-000000000012';

  -- Listing UUIDs
  list_fixed uuid := '20000000-0000-0000-0000-000000000001';
  list_auc uuid := '20000000-0000-0000-0000-000000000002';
  list_sold uuid := '20000000-0000-0000-0000-000000000003';

  -- Thread & Transaction UUIDs
  thread_id uuid := '30000000-0000-0000-0000-000000000001';
  txn_active uuid := '40000000-0000-0000-0000-000000000001';
  txn_sold uuid := '40000000-0000-0000-0000-000000000002';
BEGIN
  -- 2.1 auth.users
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, is_sso_user)
  VALUES
    (admin_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'admin@tabadul.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', false, false),
    (inspector_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'inspector@tabadul.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', false, false),
    (seller_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'seller@factory.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', false, false),
    (buyer_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'buyer@factory.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', false, false),
    (mixed_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'mixed@factory.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', false, false)
  ON CONFLICT (id) DO NOTHING;

  -- 2.2 public.profiles
  INSERT INTO public.profiles (id, full_name, factory_name, email, phone, role, industry_sector, city, address, is_active)
  VALUES
    (admin_id, 'Admin User', 'Tabadul Management', 'admin@tabadul.com', '+201000000000', 'admin', 'Platform', 'Port Said', 'Tabadul HQ', true),
    (inspector_id, 'Inspector Kamal', 'Tabadul QA', 'inspector@tabadul.com', '+201000000001', 'inspector', 'Quality Assurance', 'Suez', 'Zone 1', true),
    (seller_id, 'Ahmed Seller', 'Suez Steel Co.', 'seller@factory.com', '+201000000002', 'seller', 'Metallurgy', 'Suez', 'Industrial Zone B', true),
    (buyer_id, 'Mohamed Buyer', 'Port Said Plastics', 'buyer@factory.com', '+201000000003', 'buyer', 'Plastics', 'Port Said', 'Investment Zone', true),
    (mixed_id, 'Ali Hybrid', 'Ismailia Textiles', 'mixed@factory.com', '+201000000004', 'buyer', 'Textiles', 'Ismailia', 'Free Zone 3', true)
  ON CONFLICT (id) DO NOTHING;

  -- Ensure notification preferences exist
  INSERT INTO public.notification_preferences (user_id)
  VALUES (admin_id), (inspector_id), (seller_id), (buyer_id), (mixed_id)
  ON CONFLICT (user_id) DO NOTHING;

  -- =====================
  -- 3. WASTE CATEGORIES
  -- =====================
  INSERT INTO waste_categories (id, name_en, name_ar, slug, parent_id, sort_order) VALUES
    (cat_metal, 'Metals', 'معادن', 'metals', null, 1),
    (cat_plastic, 'Plastics', 'بلاستيك', 'plastics', null, 2),
    (cat_textile, 'Textiles', 'منسوجات', 'textiles', null, 3);
    
  INSERT INTO waste_categories (id, name_en, name_ar, slug, parent_id, sort_order) VALUES
    (cat_copper, 'Copper Scrap', 'خردة نحاس', 'copper-scrap', cat_metal, 1),
    (cat_pet, 'PET Bottles', 'زجاجات بلاستيك', 'pet-bottles', cat_plastic, 2);

  -- =====================
  -- 4. LISTINGS & PHOTOS
  -- =====================
  INSERT INTO listings (id, seller_id, category_id, title, description, mode, price, minimum_bid, auction_ends_at, quantity, unit, city, pickup_address, status)
  VALUES
    (list_fixed, seller_id, cat_copper, 'High Quality Copper Wire Scrap', 'Clean copper wire scrap from electrical manufacturing. No insulation.', 'fixed_price', 150000.00, null, null, 5.5, 'tons', 'Suez', 'Industrial Zone B, Gate 2', 'active'),
    (list_auc, seller_id, cat_metal, 'Mixed Steel Scrap', 'Assorted steel offcuts and shavings', 'auction', null, 20000.00, now() + interval '5 days', 12.0, 'tons', 'Suez', 'Industrial Zone B, Yard 4', 'active'),
    (list_sold, mixed_id, cat_textile, 'Cotton Fabric Scraps', 'White cotton fabric offcuts suitable for recycling', 'fixed_price', 8000.00, null, null, 2.0, 'tons', 'Ismailia', 'Free Zone 3, Warehouse A', 'sold');

  -- =====================
  -- 5. BIDS
  -- =====================
  INSERT INTO bids (listing_id, bidder_id, amount, is_winning) VALUES
    (list_auc, buyer_id, 22000.00, false),
    (list_auc, mixed_id, 25000.00, true);

  -- =====================
  -- 6. BOOKMARKS
  -- =====================
  INSERT INTO bookmarks (user_id, listing_id) VALUES
    (buyer_id, list_fixed),
    (buyer_id, list_auc);

  -- =====================
  -- 7. CHAT & MESSAGES
  -- =====================
  INSERT INTO chat_threads (id, listing_id, buyer_id, seller_id, last_message_at) VALUES
    (thread_id, list_fixed, buyer_id, seller_id, now());

  INSERT INTO messages (thread_id, sender_id, content, is_read) VALUES
    (thread_id, buyer_id, 'Hello, is the copper wire completely free of insulation?', true),
    (thread_id, seller_id, 'Yes, it is 100% stripped.', false);

  -- =====================
  -- 8. TRANSACTIONS
  -- =====================
  -- Active transaction (Pending Deposit)
  INSERT INTO transactions (id, listing_id, buyer_id, seller_id, total_amount, deposit_amount, status) VALUES
    (txn_active, list_fixed, buyer_id, seller_id, 150000.00, 15000.00, 'pending_deposit');

  -- Completed transaction
  INSERT INTO transactions (id, listing_id, buyer_id, seller_id, total_amount, deposit_amount, commission_amount, remainder_amount, status, shipment_status) VALUES
    (txn_sold, list_sold, buyer_id, mixed_id, 8000.00, 800.00, 400.00, 7200.00, 'completed', 'delivered');

  -- =====================
  -- 9. PAYMENTS
  -- =====================
  INSERT INTO payments (transaction_id, paid_by, type, amount, receipt_url, status, verified_by, verified_at) VALUES
    (txn_sold, buyer_id, 'deposit', 800.00, 'https://example.com/receipt1.png', 'verified', admin_id, now() - interval '3 days'),
    (txn_sold, buyer_id, 'remainder', 7200.00, 'https://example.com/receipt2.png', 'verified', admin_id, now() - interval '1 day');

  -- =====================
  -- 10. INSPECTION REPORTS
  -- =====================
  INSERT INTO inspection_reports (transaction_id, inspector_id, result, notes, inspected_at) VALUES
    (txn_sold, inspector_id, 'pass', 'Material matches description. Clean white cotton scraps.', now() - interval '2 days');

  -- =====================
  -- 11. REVIEWS
  -- =====================
  INSERT INTO reviews (transaction_id, reviewer_id, reviewed_user_id, rating, comment) VALUES
    (txn_sold, buyer_id, mixed_id, 5, 'Great seller, exactly as described and fast processing.');

  -- =====================
  -- 12. MATCH RECOMMENDATIONS
  -- =====================
  INSERT INTO match_recommendations (user_id, listing_id, score, reason) VALUES
    (buyer_id, list_fixed, 95, 'Matches your need for Copper in Suez region.');

END $$;
