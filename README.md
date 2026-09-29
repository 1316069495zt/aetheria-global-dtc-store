# AETHERIA™ Global — High-Ticket Cross-Border DTC Store (US/EU)

> Production-grade Next.js 14 + Tailwind CSS + Stripe + Supabase e-commerce platform, purpose-built
> for **high Average Order Value ($300–$1,400)** selling to the **United States & Europe**.
> Comes pre-loaded with 3 validated high-margin niches, 12 products, a real Stripe Checkout
> integration, sandbox mode for instant previewing, a profit dashboard, and a Google Shopping /
> Meta Catalog product feed.

---

## 🚀 Quick Start (Local)

```bash
cp .env.example .env.local   # optionally fill in your real keys
npm install
npm run dev                  # → http://localhost:3000
```

Works **out of the box in Sandbox Mode** (no keys required). Add your Stripe keys later to switch
to real payments automatically — no code changes needed.

## 🌍 Deploy to Production (Vercel — free tier is enough)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Add Environment Variables from `.env.example` (at minimum `STRIPE_SECRET_KEY` + `NEXT_PUBLIC_SITE_URL`).
4. Deploy → bind your custom domain (e.g. `aetheria.co`) in Vercel → Project → Domains.

---

## 💳 Payments (US/EU buyers)

| Method | Status | Notes |
|---|---|---|
| Stripe Card (Visa/MC/Amex) | ✅ Built-in | `STRIPE_SECRET_KEY` activates real Checkout Sessions |
| Klarna / Afterpay (4× BNPL) | ✅ Wired | Add `"klarna"` / `"afterpay_clearpay"` to `payment_method_types` once enabled in your Stripe dashboard |
| Apple Pay / Google Pay | ✅ Auto | Stripe handles it after domain verification |
| PayPal Express | 🔌 Optional | Add a PayPal button component; payouts via Airwallex/Payoneer to CN entity works |

### Getting a Stripe account from China (the practical path)
1. **Register a US LLC** (Wyoming ~$150/yr or New Mexico) via Stripe Atlas / Firstbase / doola → get EIN.
2. Open **Mercury** (or Wise Business) USD account under the LLC.
3. Activate **Stripe US** under the LLC (Stripe Atlas does this in one click).
   - Alternative: **Hong Kong company** → Stripe HK (settlement to HKD, then Airwallex → 结汇回国).
4. Complete business verification (EIN + LLC documents + passport).
5. Paste the keys into `.env.local` / Vercel env vars. Done.

> ⚠️ 个体户/内地个人无法直接开通 Stripe US。要么走美国 LLC，要么走香港公司。
> Airwallex（空中云汇）+ PingPong 可作为国内结汇补充通道。

---

## 📦 Fulfillment Playbook (海外仓 vs 国内直发)

```
高客单价 (> $300)  →  海外仓备货 (必选！)
  ├─ 头程: 1688采购 → 深圳集货 → 海运整柜/拼箱 (25-35天, ~$1.2/kg)
  ├─ 仓储: ShipBob (US) / byrd (DE) / Huboo (UK) — 按件计费 ~$3-6 拣货费
  └─ 尾程: FedEx Ground / DHL / DPD 本土发货 (2-5天, 退货也方便)

低重量高毛利 (< 2kg, 如LED面罩) →  空运专线小包直发
  ├─ 云途/燕文专线: 7-12天, ~$8-15/单
  └─ 适合测款期, 爆款后再转海外仓
```

**合规要点:** EU 需要 IOSS 号 (≤€150包裹) 或 DDP 条款；电池类产品 UN38.3 + MSDS；
UKCA (英国) / CE (欧盟) / FCC (美国) 认证按品类补齐。红光理疗类避免宣称医疗功效，用
"wellness / recovery" 措辞规避 FDA 风险。

---

## 🎯 The 3 Pre-Loaded Niches (validated logic baked into the catalog)

| Niche | AOV | Gross Margin | Why it works for CN sellers |
|---|---|---|---|
| ⚡ Outdoor & Portable Energy | $680 | 58–66% | US/EU露营+应急备电刚需；Klarna分期把$800变$200×4 |
| ☕ Precision Workspace & Coffee | $590 | 62–72% | WFH极客愿为CNC金属工艺付溢价；配件复购强 |
| 🧬 Bio-Hacking & Recovery | $520 | 70–82% | 深圳红光/康复供应链全球垄断级；轻小件可空运直发 |

Every product in `src/data/store-data.ts` carries its real economics:
`priceUsd` / `compareAtUsd` / `sourcingCostCny (1688价)` / `shippingCostUsd` — the Owner Console
computes live net profit from these.

---

## 🧭 Marketing Launch Sequence (first 90 days)

1. **Week 1–2:** Google Merchant Center → submit `GET /api/feed.xml` → launch PMax on high-intent
   keywords ("lifepo4 power station", "red light therapy panel").
2. **Week 2–4:** Meta pixel + Catalog DPA retargeting; TikTok organic (拍开箱/工厂产线视频).
3. **Month 2:** Reddit/FB group seeding (r/espresso, r/overlanding); 15% KOC affiliate program.
4. **Month 3:** Email flows (Klaviyo): abandoned cart ×3, post-purchase review request, cross-sell.

KPI targets: CVR ≥ 1.8% (BNPL on), CAC < 35% AOV, repeat rate > 12%.

---

## 🗂 Project Structure

```
src/
├─ app/
│  ├─ page.tsx                 # Storefront + Owner Profit Console (all client-side state)
│  ├─ layout.tsx               # SEO metadata
│  ├─ globals.css              # Tailwind base
│  └─ api/
│     ├─ checkout/route.ts     # Real Stripe Checkout + Sandbox simulation fallback
│     └─ feed.xml/route.ts     # Google Merchant Center / Meta Catalog product feed
├─ components/
│  └─ ProductIllustration.tsx  # Hand-crafted SVG renders for all 12 products (zero image assets)
├─ data/
│  └─ store-data.ts            # Products, bundles, reviews, currencies, niche economics (CN/EN)
└─ supabase/
   └─ schema.sql               # products + orders tables with RLS (paste into Supabase SQL editor)
```

## ✅ Production TODO Checklist

- [ ] Stripe keys → real payments (Sandbox auto-disables)
- [ ] Supabase → run `schema.sql`, wire `route.ts`s to persist orders
- [ ] Replace SVG art with real photos (photograph 1688 samples — non-negotiable for ads)
- [ ] Meta Pixel + GA4 env vars
- [ ] Klaviyo / Resend abandoned-cart email
- [ ] Real product pages at `/product/[slug]` (data already structured for it)
- [ ] Judge.me / Loox review app import for social proof at scale
