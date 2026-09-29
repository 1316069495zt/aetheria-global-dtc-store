"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ShoppingCart,
  X,
  Globe2,
  Truck,
  ShieldCheck,
  BadgeCheck,
  Star,
  Zap,
  BarChart3,
  Package,
  CreditCard,
  Flame,
  Coffee,
  Sparkles,
  Check,
  Plus,
  Minus,
  Trash2,
  Lock,
  ArrowRight,
  Wallet,
} from "lucide-react";
import {
  CURRENCIES,
  NICHES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  type CurrencyCode,
  type NicheId,
  type Product,
  type SampleOrder,
} from "@/data/store-data";
import { ProductIllustration } from "@/components/ProductIllustration";

/* ============================================================
   AETHERIA™ GLOBAL — High-Ticket US/EU DTC Storefront + Admin
   ============================================================ */

const NICHE_ICONS: Record<NicheId, React.ReactNode> = {
  outdoor_energy: <Zap className="w-5 h-5" />,
  barista_workspace: <Coffee className="w-5 h-5" />,
  wellness_recovery: <Sparkles className="w-5 h-5" />,
};

const PLUG_BY_CURRENCY: Record<CurrencyCode, string> = {
  USD: "US 110V Type-A/B",
  EUR: "EU 230V Type-C/F",
  GBP: "UK 230V Type-G",
  CAD: "CA 120V Type-B",
};

const DISCOUNT_CODES: Record<string, { type: "percent" | "fixed"; value: number; minUsd: number; label: string }> = {
  AETHERIA10: { type: "percent", value: 10, minUsd: 0, label: "10% OFF Launch Promotion" },
  WELCOME50: { type: "fixed", value: 50, minUsd: 300, label: "$50 OFF orders over $300" },
};

interface CartItem {
  productId: string;
  bundleId: string;
  quantity: number;
}

interface SandboxOrder extends SampleOrder {
  id: string;
}

export default function HomePage() {
  /* ---------------- Core Store State ---------------- */
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [activeNiche, setActiveNiche] = useState<NicheId | "all">("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBundleId, setSelectedBundleId] = useState<string>("");

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState<any>(null);

  const [adminOpen, setAdminOpen] = useState(false);
  const [orders, setOrders] = useState<SandboxOrder[]>(INITIAL_ORDERS as SandboxOrder[]);

  /* ---------------- Helpers ---------------- */
  const rate = CURRENCIES[currency].rate;

  const conv = (usd: number) => usd * rate;

  const fmt = (usd: number) => {
    const v = conv(usd);
    return `${CURRENCIES[currency].symbol}${v.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const findProduct = (id: string) => INITIAL_PRODUCTS.find((p) => p.id === id);

  const bundlePriceUsd = (p: Product, bundleId: string) => {
    const b = p.bundles.find((x) => x.id === bundleId) || p.bundles[0];
    return p.priceUsd + b.priceDeltaUsd;
  };

  const bundleOf = (p: Product, bundleId: string) =>
    p.bundles.find((x) => x.id === bundleId) || p.bundles[0];

  /* ---------------- Cart Operations ---------------- */
  const addToCart = (p: Product, bundleId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === p.id && i.bundleId === bundleId);
      if (existing) {
        return prev.map((i) =>
          i.productId === p.id && i.bundleId === bundleId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId: p.id, bundleId, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (productId: string, bundleId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.productId === productId && i.bundleId === bundleId
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (productId: string, bundleId: string) =>
    setCart((prev) => prev.filter((i) => !(i.productId === productId && i.bundleId === bundleId)));

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const subtotalUsd = cart.reduce((s, i) => {
    const p = findProduct(i.productId);
    if (!p) return s;
    return s + bundlePriceUsd(p, i.bundleId) * i.quantity;
  }, 0);

  const discountUsd = useMemo(() => {
    if (!appliedPromo) return 0;
    const rule = DISCOUNT_CODES[appliedPromo];
    if (!rule || subtotalUsd < rule.minUsd) return 0;
    return rule.type === "percent" ? (subtotalUsd * rule.value) / 100 : rule.value;
  }, [appliedPromo, subtotalUsd]);

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    const rule = DISCOUNT_CODES[code];
    if (!rule) {
      setPromoError("Invalid promo code. Try AETHERIA10 or WELCOME50.");
      return;
    }
    if (subtotalUsd < rule.minUsd) {
      setPromoError(`This code requires a minimum of $${rule.minUsd} USD.`);
      return;
    }
    setAppliedPromo(code);
    setPromoError("");
    setPromoInput("");
  };

  /* ---------------- Checkout ---------------- */
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setCheckoutLoading(true);
    try {
      const items = cart.map((i) => {
        const p = findProduct(i.productId)!;
        const b = bundleOf(p, i.bundleId);
        return {
          name: p.name,
          bundleTitle: b.title,
          unitPrice: conv(bundlePriceUsd(p, i.bundleId)),
          unitPriceUsd: bundlePriceUsd(p, i.bundleId),
          plugType: PLUG_BY_CURRENCY[currency],
          quantity: i.quantity,
        };
      });

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          currency,
          customerEmail: "guest.buyer@gmail.com",
          customerName: "Guest Buyer",
          country: currency === "EUR" ? "DE" : currency === "GBP" ? "GB" : currency === "CAD" ? "CA" : "US",
          paymentMethod: "stripe_card",
          discountUsd: conv(discountUsd),
        }),
      });

      const data = await res.json();

      if (data.mode === "live_stripe" && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      if (data.mode === "sandbox_simulation") {
        const firstItem = items[0];
        const totalUsdVal = Math.max(0, subtotalUsd - discountUsd);
        const estSourcing =
          cart.reduce((s, i) => {
            const p = findProduct(i.productId)!;
            return s + (p.sourcingCostCny / 7.25) * i.quantity;
          }, 0);
        const estShipping = cart.reduce((s, i) => {
          const p = findProduct(i.productId)!;
          return s + p.shippingCostUsd * i.quantity;
        }, 0);
        const netProfit = totalUsdVal - estSourcing - estShipping;

        const newOrder: SandboxOrder = {
          id: `ord-${Date.now()}`,
          orderNumber: data.order.orderNumber,
          customerName: "Guest Buyer",
          customerEmail: "guest.buyer@gmail.com",
          country:
            currency === "EUR"
              ? "Germany (Frankfurt Hub)"
              : currency === "GBP"
              ? "United Kingdom (Birmingham Hub)"
              : currency === "CAD"
              ? "Canada (Toronto Hub)"
              : "United States (NJ Hub)",
          flag: CURRENCIES[currency].flag,
          productName: firstItem.name,
          bundleName: firstItem.bundleTitle,
          amountUsd: totalUsdVal,
          sourcingCostUsd: Math.round(estSourcing),
          shippingUsd: Math.round(estShipping),
          netProfitUsd: Math.round(netProfit),
          paymentMethod: "Stripe (Card)",
          status: "Ready to Dispatch",
          trackingNumber: "Pending Sync",
          createdAt: "Just now",
        };
        setOrders((prev) => [newOrder, ...prev]);
        setCheckoutResult({
          ...data.order,
          totalFormatted: fmt(totalUsdVal),
          promoApplied: appliedPromo,
        });
        setCart([]);
        setAppliedPromo(null);
        setCartOpen(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCheckoutLoading(false);
    }
  };

  /* ---------------- Admin KPIs ---------------- */
  const kpi = useMemo(() => {
    const gmv = orders.reduce((s, o) => s + o.amountUsd, 0);
    const profit = orders.reduce((s, o) => s + o.netProfitUsd, 0);
    const sourcing = orders.reduce((s, o) => s + o.sourcingCostUsd, 0);
    const shipping = orders.reduce((s, o) => s + o.shippingUsd, 0);
    return {
      gmv,
      profit,
      sourcing,
      shipping,
      aov: orders.length ? gmv / orders.length : 0,
      margin: gmv ? (profit / gmv) * 100 : 0,
    };
  }, [orders]);

  const visibleProducts =
    activeNiche === "all"
      ? INITIAL_PRODUCTS
      : INITIAL_PRODUCTS.filter((p) => p.niche === activeNiche);

  /* ---------------- Persist cart to localStorage ---------------- */
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("aetheria_cart");
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("aetheria_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  /* ============================================================ */
  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================= TOP ANNOUNCEMENT BAR ================= */}
      <div className="bg-slate-900 text-white text-[11px] sm:text-xs py-2 px-4 flex items-center justify-center gap-6 flex-wrap">
        <span className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-sky-400" /> Free Express Shipping from US · DE · UK · CA Hubs
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 30-Day Home Trial · Duties & Taxes Prepaid
        </span>
        <span className="flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5 text-amber-400" /> 0% APR Instalments via Klarna & Afterpay
        </span>
      </div>

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg">
              Æ
            </div>
            <div className="leading-tight">
              <div className="font-black tracking-tight text-slate-900">AETHERIA™</div>
              <div className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">
                Global High-Ticket Store
              </div>
            </div>
          </div>

          {/* Region / Currency Switcher */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100 rounded-full p-1">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
              <button
                key={code}
                onClick={() => setCurrency(code)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                  currency === code
                    ? "bg-slate-900 text-white shadow"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                {CURRENCIES[code].flag} {code}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAdminOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-200"
            >
              <BarChart3 className="w-4 h-4" /> Owner Console
              <span className="hidden lg:inline text-slate-400">(Profit Dashboard · 运营后台)</span>
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">{fmt(subtotalUsd)}</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-sky-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Niche Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveNiche("all")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition ${
              activeNiche === "all"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
            }`}
          >
            <Package className="w-3.5 h-3.5" /> All Collections (12)
          </button>
          {(Object.keys(NICHES) as NicheId[]).map((id) => (
            <button
              key={id}
              onClick={() => setActiveNiche(id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition ${
                activeNiche === id
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              {NICHE_ICONS[id]} {NICHES[id].name}
            </button>
          ))}
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-sky-500 blur-3xl" />
          <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-indigo-500 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-emerald-500 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase text-sky-300 mb-6">
              <BadgeCheck className="w-4 h-4" /> Next.js + Stripe · DTC Flagship Infrastructure
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05]">
              Premium Gear.
              <br />
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                Engineered to Convert.
              </span>
            </h1>
            <p className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Three curated high-ticket niches for the US &amp; European markets — off-grid power,
              precision workspace, and bio-hacking recovery. Local warehouses, duties prepaid,
              BNPL instalments, and 5-star verified reviews baked in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-sky-50 font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-lg"
              >
                Shop Best Sellers <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setAdminOpen(true)}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition"
              >
                <BarChart3 className="w-4 h-4" /> View Owner Profit Console
              </button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { v: "4.94★", l: "12,400+ Verified Reviews" },
                { v: "3–5 Days", l: "US & EU Local Delivery" },
                { v: "65%+", l: "Average Gross Margin" },
              ].map((s) => (
                <div key={s.l} className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="text-lg font-black text-white">{s.v}</div>
                  <div className="text-[10px] text-slate-400 font-medium leading-tight mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual: floating product collage */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-2xl rotate-[-3deg]">
                <ProductIllustration type="red_light_panel" className="w-full h-40" />
                <div className="mt-2 text-xs font-black text-slate-900">SolisPulse™ 1200W</div>
                <div className="text-[10px] font-bold text-emerald-600">81% Margin Star · $649</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-2xl rotate-[2deg] mt-8">
                <ProductIllustration type="power_station" className="w-full h-40" />
                <div className="mt-2 text-xs font-black text-slate-900">VoltApex™ Pro 1500W</div>
                <div className="text-[10px] font-bold text-sky-600">Best Seller · $799</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-2xl rotate-[3deg] -mt-2">
                <ProductIllustration type="espresso_machine" className="w-full h-40" />
                <div className="mt-2 text-xs font-black text-slate-900">BaristaLab™ Dual-Boiler</div>
                <div className="text-[10px] font-bold text-amber-600">Pro Choice · $899</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-2xl rotate-[-2deg] mt-2">
                <ProductIllustration type="recovery_boots" className="w-full h-40" />
                <div className="mt-2 text-xs font-black text-slate-900">AirPress™ Pro Boots</div>
                <div className="text-[10px] font-bold text-emerald-600">Cordless · $429</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NICHE STRATEGY CARDS (CN annotations) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-4">
          {(Object.keys(NICHES) as NicheId[]).map((id) => {
            const n = NICHES[id];
            return (
              <button
                key={id}
                onClick={() => {
                  setActiveNiche(id);
                  document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-left bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition p-5 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:scale-110 transition">
                    {NICHE_ICONS[id]}
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-sm">{n.name}</div>
                    <div className="text-[11px] text-slate-500 font-semibold">{n.cnTitle}</div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed">{n.whyThisWorksCn}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold">
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md">
                    毛利 {n.grossMarginRange}
                  </span>
                  <span className="bg-sky-50 text-sky-700 px-2 py-1 rounded-md">
                    客单 {n.avgOrderValue}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ================= PRODUCT CATALOG ================= */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              {activeNiche === "all" ? "All Collections" : NICHES[activeNiche].name}
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              {currency === "USD" && "🇺🇸 Shipping from Los Angeles & New Jersey · Duty Paid"}
              {currency === "EUR" && "🇪🇺 Shipping from Frankfurt (DE) · VAT Included (IOSS/DDP)"}
              {currency === "GBP" && "🇬🇧 Shipping from Birmingham UK · UKCA Certified"}
              {currency === "CAD" && "🇨🇦 Shipping from Vancouver & Toronto · No Surprise Fees"}
            </p>
          </div>
          <div className="md:hidden flex gap-1 bg-slate-200 rounded-full p-1">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
              <button
                key={code}
                onClick={() => setCurrency(code)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  currency === code ? "bg-slate-900 text-white" : "text-slate-600"
                }`}
              >
                {CURRENCIES[code].flag} {code}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {visibleProducts.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition group flex flex-col"
            >
              <div
                className="relative bg-gradient-to-br from-slate-50 to-slate-100 p-4 cursor-pointer"
                onClick={() => {
                  setSelectedProduct(p);
                  setSelectedBundleId(p.bundles.find((b) => b.popular)?.id || p.bundles[0].id);
                }}
              >
                <span className="absolute top-3 left-3 z-10 bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded-md tracking-wider uppercase">
                  {p.badge}
                </span>
                <span className="absolute top-3 right-3 z-10 bg-emerald-500 text-white text-[9px] font-black px-2 py-1 rounded-md">
                  -{Math.round((1 - p.priceUsd / p.compareAtUsd) * 100)}%
                </span>
                <div className="h-40 flex items-center justify-center group-hover:scale-105 transition">
                  <ProductIllustration type={p.svgType} className="w-full h-full" />
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {p.rating} · {p.reviewsCount} reviews
                </div>
                <h3 className="mt-1.5 font-black text-slate-900 text-sm leading-snug">{p.name}</h3>
                <p className="mt-1 text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                  {p.subtitle}
                </p>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900">{fmt(p.priceUsd)}</span>
                  <span className="text-xs font-bold text-slate-400 line-through">
                    {fmt(p.compareAtUsd)}
                  </span>
                </div>
                <div className="text-[10px] font-bold text-slate-400">
                  or {fmt(p.priceUsd / 4)} × 4 interest-free instalments (Klarna)
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[9px] font-bold">
                  <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-center">
                    1688拿货 ¥{p.sourcingCostCny.toLocaleString()}
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md text-center">
                    毛利≈{fmt(p.priceUsd - p.sourcingCostCny / 7.25 - p.shippingCostUsd)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedProduct(p);
                    setSelectedBundleId(p.bundles.find((b) => b.popular)?.id || p.bundles[0].id);
                  }}
                  className="mt-4 w-full bg-slate-900 hover:bg-sky-600 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                >
                  Select Options <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= TRUST BAR ================= */}
      <section className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Truck className="w-5 h-5" />, t: "Local Warehouse Dispatch", d: "In-stock items ship in 24h from US · DE · UK · CA hubs with FedEx / DHL tracking." },
            { icon: <ShieldCheck className="w-5 h-5" />, t: "Duties & Taxes Prepaid", d: "IOSS / DDP shipping means zero surprise customs bills for EU & UK buyers." },
            { icon: <CreditCard className="w-5 h-5" />, t: "Klarna & Afterpay BNPL", d: "Split any order into 4 interest-free payments to maximize high-ticket conversion." },
            { icon: <Lock className="w-5 h-5" />, t: "PCI-DSS Secure Checkout", d: "Powered by Stripe with 3D-Secure, Apple Pay, Google Pay & PayPal support." },
          ].map((f) => (
            <div key={f.t} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center">
                {f.icon}
              </div>
              <h4 className="mt-3 font-black text-sm">{f.t}</h4>
              <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-slate-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between gap-6 text-xs">
          <div>
            <div className="text-white font-black text-sm">AETHERIA™ Global Commerce Ltd.</div>
            <p className="mt-2 max-w-md leading-relaxed">
              Cross-border high-ticket DTC infrastructure · US LLC (Wyoming) + HK payout entity ·
              Stripe &amp; Airwallex settlement · 3PL fulfilment via ShipBob (US), byrd (EU), Huboo (UK).
            </p>
          </div>
          <div className="flex gap-10">
            <div>
              <div className="text-white font-bold mb-2">Operations Playbook (CN)</div>
              <ul className="space-y-1.5">
                <li>选品：1688 / 义乌 / 深圳产业带</li>
                <li>头程：海运拼箱 + 海外仓备货</li>
                <li>流量：Meta PMax · TikTok Shop · KOC测评</li>
                <li>收款：Stripe Atlas 美国公司注册</li>
              </ul>
            </div>
            <div>
              <div className="text-white font-bold mb-2">Developer Hooks</div>
              <ul className="space-y-1.5 font-mono text-[11px]">
                <li>POST /api/checkout</li>
                <li>GET /api/feed.xml (Google Shopping)</li>
                <li>supabase/schema.sql</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-white/10 text-[10px] flex flex-wrap justify-between gap-2">
          <span>© 2026 AETHERIA™ Global. All rights reserved. Demo storefront — payments run in sandbox until Stripe keys are configured.</span>
          <span className="font-mono">Next.js 14 · Tailwind · Stripe · Supabase · Vercel Edge</span>
        </div>
      </footer>

      {/* ================= PRODUCT DETAIL MODAL ================= */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white w-full sm:max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
              <div className="text-[11px] font-black tracking-widest uppercase text-slate-400">
                {NICHES[selectedProduct.niche].name}
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Left: visual + specs */}
              <div>
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-100">
                  <ProductIllustration type={selectedProduct.svgType} className="w-full h-56" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {selectedProduct.specs.map((s) => (
                    <div key={s.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                        {s.label}
                      </div>
                      <div className="text-[11px] font-bold text-slate-800 mt-1 leading-tight">
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: pitch + bundles */}
              <div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" /> {selectedProduct.rating} ·{" "}
                  {selectedProduct.reviewsCount} verified reviews
                </div>
                <h3 className="mt-2 text-xl font-black text-slate-900 leading-tight">
                  {selectedProduct.name}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  {selectedProduct.subtitle}
                </p>

                <ul className="mt-4 space-y-2">
                  {selectedProduct.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-xs text-slate-700 font-medium leading-relaxed">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    Choose Your Bundle · 选择套装
                  </div>
                  <div className="space-y-2">
                    {selectedProduct.bundles.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBundleId(b.id)}
                        className={`w-full text-left rounded-xl border-2 p-3.5 transition ${
                          selectedBundleId === b.id
                            ? "border-sky-500 bg-sky-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                              {b.title}
                              {b.popular && (
                                <span className="bg-amber-100 text-amber-700 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                                  Most Popular
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                              {b.subtitle}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-sm font-black text-slate-900">
                              {fmt(selectedProduct.priceUsd + b.priceDeltaUsd)}
                            </div>
                            <div className="text-[9px] font-black text-emerald-600 uppercase">
                              Save {fmt(b.savingsUsd)}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Verified review preview */}
                <div className="mt-5 bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{selectedProduct.reviews[0].flag}</span>
                    <div>
                      <div className="text-[11px] font-black text-slate-900">
                        {selectedProduct.reviews[0].author}
                        {selectedProduct.reviews[0].verified && (
                          <span className="ml-1.5 text-emerald-600 font-bold">✓ Verified Buyer</span>
                        )}
                      </div>
                      <div className="text-[9px] text-slate-400 font-semibold">
                        {selectedProduct.reviews[0].country} · {selectedProduct.reviews[0].date}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-700 leading-relaxed italic">
                    “{selectedProduct.reviews[0].comment}”
                  </p>
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedProduct, selectedBundleId);
                    setSelectedProduct(null);
                  }}
                  className="mt-5 w-full bg-slate-900 hover:bg-sky-600 text-white font-black py-4 rounded-2xl text-sm transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart — {fmt(bundlePriceUsd(selectedProduct, selectedBundleId))}
                </button>
                <div className="mt-2.5 text-center text-[10px] font-bold text-slate-400">
                  <Lock className="w-3 h-3 inline mb-0.5" /> Secure Stripe Checkout · 30-Day Returns ·
                  Duties Prepaid
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CART DRAWER ================= */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm" onClick={() => setCartOpen(false)}>
          <aside
            className="absolute right-0 top-0 h-full w-full sm:w-[430px] bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="font-black text-slate-900 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Your Cart ({cartCount})
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {cart.length === 0 && (
                <div className="text-center py-16">
                  <Package className="w-12 h-12 text-slate-200 mx-auto" />
                  <p className="mt-3 text-sm font-bold text-slate-400">Your cart is empty</p>
                </div>
              )}
              {cart.map((i) => {
                const p = findProduct(i.productId)!;
                const b = bundleOf(p, i.bundleId);
                return (
                  <div key={`${i.productId}-${i.bundleId}`} className="flex gap-3 bg-slate-50 rounded-2xl p-3 border border-slate-100">
                    <div className="w-20 h-20 shrink-0 bg-white rounded-xl border border-slate-100 p-1.5">
                      <ProductIllustration type={p.svgType} className="w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-black text-slate-900 leading-tight">{p.name}</div>
                      <div className="text-[10px] text-slate-500 font-semibold mt-0.5">{b.title}</div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 bg-white rounded-lg border border-slate-200 px-1 py-0.5">
                          <button onClick={() => updateQty(i.productId, i.bundleId, -1)} className="p-1 hover:bg-slate-100 rounded">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black w-4 text-center">{i.quantity}</span>
                          <button onClick={() => updateQty(i.productId, i.bundleId, 1)} className="p-1 hover:bg-slate-100 rounded">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-sm font-black text-slate-900">
                          {fmt(bundlePriceUsd(p, i.bundleId) * i.quantity)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(i.productId, i.bundleId)}
                      className="self-start p-1.5 text-slate-300 hover:text-red-500 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}

              {cart.length > 0 && (
                <div className="pt-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    Promo Code
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="AETHERIA10 / WELCOME50"
                      className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold uppercase placeholder:normal-case placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                    <button
                      onClick={applyPromo}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-4 rounded-xl transition"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-[10px] font-bold text-red-500 mt-1.5">{promoError}</p>}
                  {appliedPromo && (
                    <p className="text-[10px] font-black text-emerald-600 mt-1.5 flex items-center gap-1">
                      <Check className="w-3 h-3" /> {appliedPromo} applied —{" "}
                      {DISCOUNT_CODES[appliedPromo].label}
                    </p>
                  )}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-100 p-5 space-y-3 bg-white">
                <div className="space-y-1.5 text-xs font-bold text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{fmt(subtotalUsd)}</span>
                  </div>
                  {discountUsd > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Promo {appliedPromo}</span>
                      <span>-{fmt(discountUsd)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Express Shipping (FedEx/DHL)</span>
                    <span className="text-emerald-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Import Duties &amp; VAT</span>
                    <span className="text-emerald-600">PREPAID</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                    <span>Total</span>
                    <span>{fmt(Math.max(0, subtotalUsd - discountUsd))}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full bg-slate-900 hover:bg-sky-600 disabled:opacity-60 text-white font-black py-4 rounded-2xl text-sm transition flex items-center justify-center gap-2"
                >
                  {checkoutLoading ? (
                    "Processing…"
                  ) : (
                    <>
                      <Lock className="w-4 h-4" /> Checkout Securely — {fmt(Math.max(0, subtotalUsd - discountUsd))}
                    </>
                  )}
                </button>
                <p className="text-center text-[9px] font-bold text-slate-400 leading-relaxed">
                  Sandbox mode: configure STRIPE_SECRET_KEY in .env.local to activate real Stripe / Klarna /
                  Apple Pay payments.
                </p>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* ================= ORDER SUCCESS MODAL ================= */}
      {checkoutResult && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-7 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="mt-4 text-xl font-black text-slate-900">Order Confirmed!</h3>
            <p className="text-xs font-bold text-slate-400 mt-1">Sandbox order · 支付流程验证成功</p>
            <div className="mt-5 bg-slate-50 rounded-2xl p-4 text-left space-y-2 border border-slate-100">
              {[
                ["Order", checkoutResult.orderNumber],
                ["Total", checkoutResult.totalFormatted],
                ["Dispatch", checkoutResult.warehouseDispatched],
                ["Delivery", checkoutResult.estimatedDelivery],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 text-xs">
                  <span className="font-bold text-slate-400">{k}</span>
                  <span className="font-black text-slate-900 text-right">{v}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setCheckoutResult(null)}
              className="mt-5 w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3.5 rounded-2xl text-sm transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* ================= OWNER CONSOLE (PROFIT DASHBOARD) ================= */}
      {adminOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-0 sm:p-6">
          <div className="bg-slate-100 w-full sm:max-w-6xl max-h-[95vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl">
            <div className="sticky top-0 bg-slate-900 text-white px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl">
              <div>
                <div className="font-black flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-sky-400" /> Owner Profit Console · 运营数据看板
                </div>
                <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
                  Real-time P&amp;L across US · EU · UK · CA warehouses (sandbox dataset + your test orders)
                </div>
              </div>
              <button
                onClick={() => setAdminOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total GMV (USD)", value: `$${kpi.gmv.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: <Wallet className="w-5 h-5" />, tone: "bg-sky-500" },
                  { label: "Net Profit (USD)", value: `$${kpi.profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: <Flame className="w-5 h-5" />, tone: "bg-emerald-500" },
                  { label: "Avg Order Value", value: `$${kpi.aov.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: <BarChart3 className="w-5 h-5" />, tone: "bg-indigo-500" },
                  { label: "Blended Margin", value: `${kpi.margin.toFixed(1)}%`, icon: <Zap className="w-5 h-5" />, tone: "bg-amber-500" },
                ].map((k) => (
                  <div key={k.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                    <div className={`w-10 h-10 rounded-xl ${k.tone} text-white flex items-center justify-center`}>
                      {k.icon}
                    </div>
                    <div className="mt-3 text-2xl font-black text-slate-900">{k.value}</div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mt-1">
                      {k.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost breakdown */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                  Cost Structure · 成本结构 (COGS vs Shipping vs Net)
                </div>
                <div className="space-y-3">
                  {[
                    { l: "Net Profit 净利润", v: kpi.profit, max: kpi.gmv || 1, c: "bg-emerald-500" },
                    { l: "1688 Sourcing 采购成本", v: kpi.sourcing, max: kpi.gmv || 1, c: "bg-sky-500" },
                    { l: "Shipping 物流成本", v: kpi.shipping, max: kpi.gmv || 1, c: "bg-amber-500" },
                  ].map((row) => (
                    <div key={row.l}>
                      <div className="flex justify-between text-[11px] font-black text-slate-600 mb-1">
                        <span>{row.l}</span>
                        <span>${row.v.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${row.c} rounded-full`} style={{ width: `${(row.v / row.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Live Orders · 实时订单流
                  </div>
                  <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">
                    {orders.length} ORDERS
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[9px] font-black uppercase tracking-wider text-slate-400">
                      <tr>
                        <th className="px-5 py-3">Order / Customer</th>
                        <th className="px-5 py-3">Product</th>
                        <th className="px-5 py-3">Payment</th>
                        <th className="px-5 py-3">Revenue</th>
                        <th className="px-5 py-3">Net Profit</th>
                        <th className="px-5 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50 text-xs">
                          <td className="px-5 py-3.5">
                            <div className="font-black text-slate-900">{o.orderNumber}</div>
                            <div className="text-[10px] text-slate-500 font-semibold">
                              {o.flag} {o.country} · {o.createdAt}
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="font-bold text-slate-800 max-w-[220px] truncate">{o.productName}</div>
                            <div className="text-[10px] text-slate-500">{o.bundleName}</div>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="bg-slate-100 text-slate-600 text-[9px] font-black px-2 py-1 rounded-md">
                              {o.paymentMethod}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 font-black text-slate-900">${o.amountUsd}</td>
                          <td className="px-5 py-3.5 font-black text-emerald-600">+${o.netProfitUsd}</td>
                          <td className="px-5 py-3.5">
                            <span
                              className={`text-[9px] font-black px-2 py-1 rounded-md ${
                                o.status === "Delivered"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : o.status === "Fulfilled (DHL/FedEx)"
                                  ? "bg-sky-50 text-sky-600"
                                  : "bg-amber-50 text-amber-600"
                              }`}
                            >
                              {o.status}
                            </span>
                            <div className="text-[9px] text-slate-400 font-mono mt-1">{o.trackingNumber}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Ops playbook */}
              <div className="grid md:grid-cols-3 gap-4 pb-4">
                {(Object.keys(NICHES) as NicheId[]).map((id) => (
                  <div key={id} className="bg-slate-900 text-white rounded-2xl p-5">
                    <div className="text-xs font-black text-sky-300">{NICHES[id].name}</div>
                    <div className="text-[10px] text-slate-400 font-bold mt-0.5">{NICHES[id].cnTitle}</div>
                    <div className="mt-3 space-y-2 text-[11px] text-slate-300 leading-relaxed">
                      <div>
                        <span className="text-white font-black">供应链：</span>
                        {NICHES[id].supplyChainClusterCn}
                      </div>
                      <div>
                        <span className="text-white font-black">投放：</span>
                        {NICHES[id].adChannelsCn}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
