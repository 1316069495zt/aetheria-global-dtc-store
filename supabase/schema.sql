-- ============================================================================
-- Global High-Ticket DTC Store - Supabase PostgreSQL Schema
-- Run this in your Supabase SQL Editor to enable persistent cloud database
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  niche TEXT NOT NULL, -- 'outdoor_energy' | 'barista_workspace' | 'wellness_recovery'
  price_usd NUMERIC(10, 2) NOT NULL,
  compare_at_usd NUMERIC(10, 2) NOT NULL,
  sourcing_cost_cny NUMERIC(10, 2) NOT NULL,
  shipping_cost_usd NUMERIC(10, 2) NOT NULL,
  rating NUMERIC(3, 2) DEFAULT 4.9,
  reviews_count INTEGER DEFAULT 120,
  badge TEXT,
  stock INTEGER DEFAULT 50,
  specs JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  shipping_country TEXT NOT NULL, -- 'US' | 'DE' | 'GB' | 'FR' | 'CA'
  shipping_address JSONB NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  subtotal NUMERIC(10, 2) NOT NULL,
  discount NUMERIC(10, 2) DEFAULT 0,
  shipping_fee NUMERIC(10, 2) DEFAULT 0,
  total_amount NUMERIC(10, 2) NOT NULL,
  payment_method TEXT NOT NULL, -- 'stripe_card' | 'klarna_bnpl' | 'paypal' | 'apple_pay'
  payment_status TEXT NOT NULL DEFAULT 'paid',
  fulfillment_status TEXT NOT NULL DEFAULT 'processing', -- 'processing' | 'shipped' | 'delivered'
  tracking_number TEXT,
  items JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Public read access for active products
CREATE POLICY "Allow public read access on products"
  ON public.products FOR SELECT
  USING (true);
