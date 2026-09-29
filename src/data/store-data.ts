export type NicheId = "outdoor_energy" | "barista_workspace" | "wellness_recovery";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
  flag: string;
  regionName: string;
  warehouse: string;
  shippingPromise: string;
  taxNote: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: "USD",
    symbol: "$",
    rate: 1,
    flag: "🇺🇸",
    regionName: "United States",
    warehouse: "Los Angeles & New Jersey Local Hub",
    shippingPromise: "Free FedEx 2–5 Day Ground Delivery",
    taxNote: "0% Import Duty · 30-Day Home Trial",
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    rate: 0.92,
    flag: "🇪🇺",
    regionName: "European Union",
    warehouse: "Frankfurt (DE) & Rotterdam (NL) Hub",
    shippingPromise: "Free DHL 3–6 Day Tracked Express",
    taxNote: "VAT Included (IOSS/DDP) · CE Certified",
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    rate: 0.79,
    flag: "🇬🇧",
    regionName: "United Kingdom",
    warehouse: "Birmingham UK Local Fulfillment",
    shippingPromise: "Free DPD 2–4 Day Next-Step Delivery",
    taxNote: "UK VAT Included · UKCA Certified",
  },
  CAD: {
    code: "CAD",
    symbol: "CA$",
    rate: 1.36,
    flag: "🇨🇦",
    regionName: "Canada",
    warehouse: "Vancouver & Toronto Bonded Hub",
    shippingPromise: "Free UPS 3–6 Day Duty-Paid Shipping",
    taxNote: "No Surprise Customs Fees",
  },
};

export interface NicheConfig {
  id: NicheId;
  name: string;
  cnTitle: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  accentColor: string;
  avgOrderValue: string;
  grossMarginRange: string;
  whyThisWorksCn: string;
  supplyChainClusterCn: string;
  adChannelsCn: string;
}

export const NICHES: Record<NicheId, NicheConfig> = {
  outdoor_energy: {
    id: "outdoor_energy",
    name: "VoltApex™ Outdoor & Energy",
    cnTitle: "赛道一：户外便携储能与碳纤维出行 ($349–$1,399)",
    tagline: "Grid-Independent Power & Carbon Mobility",
    heroTitle: "Engineered for Off-Grid Freedom.",
    heroSubtitle:
      "Automotive-grade LiFePO4 power stations, bifacial solar arrays, and ultra-light carbon commuter systems. Shipped direct from our US & EU warehouses.",
    heroBadge: "⚡ 2026 RED DOT AWARD WINNER · 5-YEAR GLOBAL WARRANTY",
    accentColor: "sky",
    avgOrderValue: "$680 USD",
    grossMarginRange: "58% – 66%",
    whyThisWorksCn:
      "欧美家庭露营（Overlanding）、房车出行及家庭应急备电需求极大，且对 $500-$1500 客单价接受度极高；配合 Klarna 4期免息分期，转化率比普通小商品高3倍。",
    supplyChainClusterCn: "深圳（便携储能/逆变器）、惠州（亿纬锂能电芯）、常州/昆山（电机与碳纤维车架）",
    adChannelsCn: "Google Shopping (PMax) 高意图搜索词 + YouTube 户外博主测评 + Meta 再营销",
  },
  barista_workspace: {
    id: "barista_workspace",
    name: "AtelierPro™ Precision Studio",
    cnTitle: "赛道二：极客桌面造物与精品咖啡设备 ($389–$899)",
    tagline: "Commercial-Grade Craftsmanship for Your Home Studio",
    heroTitle: "Precision Engineering Meets Daily Ritual.",
    heroSubtitle:
      "Dual-boiler PID espresso architecture, CNC flat-burr grinders, and desktop laser fabrication tools designed for creators and home baristas.",
    heroBadge: "☕ FEATURED IN WIRED & DESIGN MILK · FREE EXPRESS SHIPPING",
    accentColor: "amber",
    avgOrderValue: "$590 USD",
    grossMarginRange: "62% – 72%",
    whyThisWorksCn:
      "欧美远程办公（WFH）与居家精品咖啡文化盛行，极客人群愿意为高颜值金属CNC工艺支付高溢价，退货率极低，复购配件（刀盘、耗材、手柄）粘性极强。",
    supplyChainClusterCn: "宁波/佛山（商用级咖啡机水泵与温控）、东莞（五轴CNC铝合金加工与激光头）",
    adChannelsCn: "Instagram / TikTok 沉浸式桌面美学短视频 + Reddit (r/espresso) 社区种草 + Google 搜索",
  },
  wellness_recovery: {
    id: "wellness_recovery",
    name: "SolisBio™ Recovery Lab",
    cnTitle: "赛道三：欧美居家康复与红光理疗黑科技 ($329–$799 · 轻小件暴利)",
    tagline: "Clinical-Grade Bio-Optimization at Home",
    heroTitle: "Recover Faster. Sleep Deeper. Perform Better.",
    heroSubtitle:
      "Dual-wavelength 660nm/850nm photobiomodulation panels, dynamic lymphatic compression boots, and ozone-chilled cold plunge systems.",
    heroBadge: "🧬 FDA-REGISTERED FACILITY · 60-DAY PERFORMANCE GUARANTEE",
    accentColor: "emerald",
    avgOrderValue: "$520 USD",
    grossMarginRange: "70% – 82%",
    whyThisWorksCn:
      "欧美 Bio-hacking（生物黑客）、抗衰与居家健身康复正处于爆发期！红光面罩/理疗灯重量轻、体积小（可走空运专线直发），1688拿货仅 ¥360-¥900，欧美售价高达 $329-$649，是程序员做高客单投流最容易跑正 ROAS 的黄金品类。",
    supplyChainClusterCn: "深圳宝安/龙华（医疗级LED红光灯珠、气囊康复靴、美容仪供应链）",
    adChannelsCn: "Meta (Facebook/Instagram) 痛点对比广告 + TikTok 健身/护肤达人带货 + Google 品牌词拦截",
  },
};

export interface ProductBundle {
  id: string;
  title: string;
  subtitle: string;
  priceDeltaUsd: number;
  savingsUsd: number;
  popular?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  niche: NicheId;
  priceUsd: number;
  compareAtUsd: number;
  sourcingCostCny: number; // 1688 拿货价 (RMB)
  shippingCostUsd: number; // 头程+海外仓尾程或空运专线成本 (USD)
  weightKg: number;
  rating: number;
  reviewsCount: number;
  badge: string;
  inStock: number;
  svgType:
    | "power_station"
    | "solar_panel"
    | "carbon_ebike"
    | "car_fridge"
    | "espresso_machine"
    | "coffee_grinder"
    | "laser_engraver"
    | "bionic_chair"
    | "red_light_panel"
    | "cold_plunge"
    | "led_mask"
    | "recovery_boots";
  highlights: string[];
  specs: { label: string; value: string }[];
  bundles: ProductBundle[];
  reviews: {
    author: string;
    country: string;
    flag: string;
    verified: boolean;
    rating: number;
    title: string;
    comment: string;
    date: string;
  }[];
}

export const INITIAL_PRODUCTS: Product[] = [
  // ==================== NICHE 1: OUTDOOR & PORTABLE ENERGY ====================
  {
    id: "prod-volt-1500",
    slug: "voltapex-pro-1500w-lifepo4-power-station",
    name: "VoltApex™ Pro 1500W LiFePO4 Power Station",
    subtitle: "1488Wh Automotive-Grade LFP Battery · 45-Min HyperCharge · UPS <10ms",
    niche: "outdoor_energy",
    priceUsd: 799,
    compareAtUsd: 1099,
    sourcingCostCny: 1850,
    shippingCostUsd: 42,
    weightKg: 14.2,
    rating: 4.94,
    reviewsCount: 342,
    badge: "BEST SELLER · SAVE $300",
    inStock: 18,
    svgType: "power_station",
    highlights: [
      "4,000+ Full Charge Cycles to 80% capacity (10+ Years Daily Use)",
      "1800W Pure Sine Wave AC Output (3000W Surge) runs heavy appliances & RV AC",
      "0% to 80% AC HyperCharge in 45 Minutes without bulky external bricks",
      "Smart App Control via Bluetooth & Wi-Fi + <10ms Home Backup UPS switch",
    ],
    specs: [
      { label: "Battery Chemistry", value: "EV-Grade LiFePO4 (LFP)" },
      { label: "Capacity", value: "1,488Wh (Expandable to 4.4kWh)" },
      { label: "AC Output", value: "4x Pure Sine Wave (110V US / 230V EU)" },
      { label: "Solar Input", value: "600W MPPT High-Efficiency Input" },
    ],
    bundles: [
      {
        id: "standard",
        title: "Power Station Only",
        subtitle: "Includes AC Charging Cable, Car Cable & User Manual",
        priceDeltaUsd: 0,
        savingsUsd: 300,
      },
      {
        id: "solar-bundle",
        title: "Solar Generator Kit (+200W Solar Panel)",
        subtitle: "Most Popular · Infinite Off-Grid Charging + Free Carrying Bag",
        priceDeltaUsd: 249,
        savingsUsd: 450,
        popular: true,
      },
      {
        id: "dual-battery",
        title: "Home Backup Pro (+Extra 1500Wh Battery)",
        subtitle: "Total 2,976Wh Capacity for Whole-Home Outage Protection",
        priceDeltaUsd: 499,
        savingsUsd: 650,
      },
    ],
    reviews: [
      {
        author: "Marcus Vance",
        country: "Texas, USA",
        flag: "🇺🇸",
        verified: true,
        rating: 5,
        title: "Kept our refrigerator & Starlink running for 2 days!",
        comment:
          "Ordered on Tuesday, FedEx dropped it off Thursday. Build quality rivals EcoFlow at 35% less cost. The 45-minute recharge speed is mind-blowing.",
        date: "2 days ago",
      },
      {
        author: "ukas Weber",
        country: "Munich, Germany",
        flag: "🇩🇪",
        verified: true,
        rating: 5,
        title: "Perfekt für unser Wohnmobil (Campervan)",
        comment:
          "230V EU version works flawlessly with our portable induction cooktop and espresso maker. Zero fan noise under 500W load.",
        date: "1 week ago",
      },
    ],
  },
  {
    id: "prod-solar-200",
    slug: "aerofold-200w-bifacial-solar-suitcase",
    name: "AeroFold™ 200W Bifacial Solar Array",
    subtitle: "23.8% N-Type Monocrystalline · IP68 Waterproof · Dual-Sided Gain",
    niche: "outdoor_energy",
    priceUsd: 349,
    compareAtUsd: 499,
    sourcingCostCny: 620,
    shippingCostUsd: 24,
    weightKg: 6.8,
    rating: 4.89,
    reviewsCount: 198,
    badge: "HIGH MARGIN ADD-ON",
    inStock: 34,
    svgType: "solar_panel",
    highlights: [
      "Captures up to 25% extra ambient light from the rear bifacial glass face",
      "ETFE aerospace coating resists hail, salt mist, and extreme desert UV",
      "Universal MC4 connector compatible with 99% of power stations",
      "Integrated adjustable kickstand for 30° / 45° / 60° sun tracking",
    ],
    specs: [
      { label: "Cell Efficiency", value: "23.8% Grade-A N-Type Mono" },
      { label: "Weather Rating", value: "IP68 Waterproof & Dustproof" },
      { label: "Folded Dimensions", value: "61 × 54 × 4.5 cm" },
      { label: "Connector", value: "Universal MC4 to XT60 / Anderson" },
    ],
    bundles: [
      {
        id: "single",
        title: "Single 200W Bifacial Panel",
        subtitle: "Ideal for weekend camping & 500W–1500W stations",
        priceDeltaUsd: 0,
        savingsUsd: 150,
      },
      {
        id: "dual-array",
        title: "400W Dual Parallel Array (2× 200W)",
        subtitle: "Includes Parallel Y-Branch Cable & 10m Extension Cord",
        priceDeltaUsd: 279,
        savingsUsd: 370,
        popular: true,
      },
    ],
    reviews: [
      {
        author: "David K.",
        country: "Colorado, USA",
        flag: "🇺🇸",
        verified: true,
        rating: 5,
        title: "Pulled 214W in high-altitude sun!",
        comment:
          "Because of the bifacial back side reflecting off light gravel, I actually saw over 200W of real input on my meter.",
        date: "5 days ago",
      },
    ],
  },
  {
    id: "prod-carbon-ebike",
    slug: "velocarbon-x1-ultralight-commuter-ebike",
    name: "VeloCarbon™ X1 Toray Carbon E-Bike",
    subtitle: "14.8 kg Featherweight · Gates Carbon Belt Drive · Bilateral Torque Sensor",
    niche: "outdoor_energy",
    priceUsd: 1399,
    compareAtUsd: 1999,
    sourcingCostCny: 3200,
    shippingCostUsd: 90,
    weightKg: 14.8,
    rating: 4.96,
    reviewsCount: 164,
    badge: "FLAGSHIP HIGH-TICKET",
    inStock: 9,
    svgType: "carbon_ebike",
    highlights: [
      "Full Toray® T800 monocoque carbon frame, fork, handlebar & seatpost",
      "Maintenance-free Gates™ Carbon Belt Drive — no grease, no rust for 30,000 km",
      "Millisecond-response torque sensor delivers natural bionic pedaling feel",
      "Integrated GPS anti-theft tracking, turn signals & hydraulic disc brakes",
    ],
    specs: [
      { label: "Frame Material", value: "Toray T800 Carbon Fiber (14.8 kg)" },
      { label: "Range", value: "Up to 110 km (68 miles) Removable Samsung Pack" },
      { label: "Drivetrain", value: "Gates CDN Carbon Belt + Torque Sensor" },
      { label: "Compliance", value: "UL 2849 Certified (US) & EN 15194 (EU)" },
    ],
    bundles: [
      {
        id: "standard",
        title: "VeloCarbon™ X1 Standard",
        subtitle: "Ships 95% Pre-Assembled with Fast Charger & Toolkit",
        priceDeltaUsd: 0,
        savingsUsd: 600,
      },
      {
        id: "commuter-pack",
        title: "Urban Commuter Bundle",
        subtitle: "+ Custom Fenders, Rear Pannier Rack & Range-Extender Battery",
        priceDeltaUsd: 199,
        savingsUsd: 820,
        popular: true,
      },
    ],
    reviews: [
      {
        author: "Hendrik Van Der Berg",
        country: "Amsterdam, NL",
        flag: "🇳🇱",
        verified: true,
        rating: 5,
        title: "Light enough to carry up my 3rd-floor canal apartment!",
        comment:
          "VanMoof went bankrupt and costs €3,500. This carbon belt-drive bike rides smoother, weighs half as much, and uses standard serviceable parts.",
        date: "3 days ago",
      },
    ],
  },
  {
    id: "prod-fridge-45l",
    slug: "glaciercube-45l-dual-zone-overland-fridge",
    name: "GlacierCube™ 45L Dual-Zone Overland Fridge",
    subtitle: "-20°C True Freezing without Ice · Secop Compressor · App Control",
    niche: "outdoor_energy",
    priceUsd: 469,
    compareAtUsd: 649,
    sourcingCostCny: 980,
    shippingCostUsd: 38,
    weightKg: 15.5,
    rating: 4.91,
    reviewsCount: 276,
    badge: "OVERLANDING FAVORITE",
    inStock: 23,
    svgType: "car_fridge",
    highlights: [
      "Independent dual-zone temperature control: Fridge (+4°C) & Freezer (-20°C) simultaneously",
      "Drops from 25°C to 0°C in just 15 minutes with 45W Eco mode consumption",
      "3-Stage car battery protection prevents draining your vehicle starter battery",
      "All-terrain rugged wheels, telescopic aluminum handle & built-in bottle opener",
    ],
    specs: [
      { label: "Capacity", value: "45 Liters (Holds 68 cans)" },
      { label: "Cooling Range", value: "-20°C to +20°C (-4°F to 68°F)" },
      { label: "Power Input", value: "12V/24V DC, 100-240V AC & Solar" },
      { label: "Noise Level", value: "Whisper-quiet <38 dB" },
    ],
    bundles: [
      {
        id: "fridge-only",
        title: "GlacierCube™ 45L Unit",
        subtitle: "Includes AC Adapter, 12V DC Cord & Removable Baskets",
        priceDeltaUsd: 0,
        savingsUsd: 180,
      },
      {
        id: "insulated-battery",
        title: "Off-Grid Pack (+173Wh Plug-In Battery & Thermal Cover)",
        subtitle: "Runs 18 hours cordless at the beach or campsite",
        priceDeltaUsd: 129,
        savingsUsd: 290,
        popular: true,
      },
    ],
    reviews: [
      {
        author: "Sarah Jenkins",
        country: "California, USA",
        flag: "🇺🇸",
        verified: true,
        rating: 5,
        title: "Never buying bags of soggy cooler ice again",
        comment:
          "Kept steak frozen solid on one side and drinks crisp on the other during our 5-day Moab trip.",
        date: "1 week ago",
      },
    ],
  },

  // ==================== NICHE 2: BARISTA & WORKSPACE ====================
  {
    id: "prod-espresso-pro",
    slug: "baristalab-dual-boiler-pid-espresso-station",
    name: "BaristaLab™ Dual-Boiler PID Espresso Machine",
    subtitle: "Commercial 58mm Saturated Group · Flow Profiling Paddle · Quiet Rotary Pump",
    niche: "barista_workspace",
    priceUsd: 899,
    compareAtUsd: 1299,
    sourcingCostCny: 2100,
    shippingCostUsd: 45,
    weightKg: 16.4,
    rating: 4.95,
    reviewsCount: 412,
    badge: "HOME BARISTA CHOICE",
    inStock: 14,
    svgType: "espresso_machine",
    highlights: [
      "Independent stainless steel brew & steam boilers for simultaneous extraction and microfoam",
      "Real-time OLED shot timer, pressure gauge & manual pre-infusion flow control paddle",
      "Commercial 58mm solid brass portafilter with walnut ergonomic handle",
      " ±0.5°C Dual PID thermal stability for light, medium, and dark specialty roasts",
    ],
    specs: [
      { label: "Boiler System", value: "Dual Stainless Steel Boilers + Heated Group" },
      { label: "Pressure Profiling", value: "9-Bar OPV Valve + Manual Flow Paddle" },
      { label: "Portafilter", value: "Commercial 58mm Naked & Spouted Included" },
      { label: "Heat-Up Time", value: "Fast 3.5-Minute Ready State" },
    ],
    bundles: [
      {
        id: "machine-only",
        title: "BaristaLab™ Espresso Machine",
        subtitle: "Includes 58mm Portafilter, Tamper, Milk Pitcher & Cleaning Kit",
        priceDeltaUsd: 0,
        savingsUsd: 400,
      },
      {
        id: "pro-cafe-bundle",
        title: "Complete Cafe Suite (+TitanGrind™ 64mm Flat-Burr Grinder)",
        subtitle: "Save $140 · Matched Matte Black / Brushed Steel Finish",
        priceDeltaUsd: 249,
        savingsUsd: 540,
        popular: true,
      },
    ],
    reviews: [
      {
        author: "Matteo Rossi",
        country: "Milan, Italy",
        flag: "🇮🇹",
        verified: true,
        rating: 5,
        title: "Incredible thermal stability at this price point",
        comment:
          "Pulls syrupy tiger-striped shots comparable to machines costing €2,500+. The dry steam power textures oat and whole milk in 12 seconds.",
        date: "3 days ago",
      },
    ],
  },
  {
    id: "prod-grinder-64",
    slug: "titangrind-64mm-single-dose-flat-burr-grinder",
    name: "TitanGrind™ 64mm DLC Flat-Burr Grinder",
    subtitle: "0.08g Near-Zero Retention · Brushless Variable 600–1600 RPM · Magnetic Chute",
    niche: "barista_workspace",
    priceUsd: 389,
    compareAtUsd: 549,
    sourcingCostCny: 750,
    shippingCostUsd: 24,
    weightKg: 5.6,
    rating: 4.93,
    reviewsCount: 289,
    badge: "ZERO RETENTION CNC",
    inStock: 27,
    svgType: "coffee_grinder",
    highlights: [
      "Diamond-Like Carbon (DLC) coated 64mm flat burrs engineered for clarity and sweetness",
      "Variable RPM brushless DC motor lets you dial slow 600 RPM for pour-over or 1400 RPM for espresso",
      "Plasma ionizer generator eliminates static coffee chaff mess on your countertop",
      "Unibody CNC-machined 6061 aerospace aluminum body",
    ],
    specs: [
      { label: "Burr Geometry", value: "64mm DLC Titanium-Coated Flat Burrs" },
      { label: "Motor", value: "300W Brushless Variable Speed (600–1600 RPM)" },
      { label: "Retention", value: "<0.1g with Silicone Bellows & Ionizer" },
      { label: "Adjustment", value: "Stepless Micrometric Dial (0.01mm precision)" },
    ],
    bundles: [
      {
        id: "standard-dlc",
        title: "TitanGrind™ with DLC Espresso/Brew Burrs",
        subtitle: "Includes Magnetic Dosing Cup, RDT Spray Bottle & Bellows",
        priceDeltaUsd: 0,
        savingsUsd: 160,
      },
      {
        id: "ssp-upgrade",
        title: "Pro Tasting Kit (+High-Uniformity SSP Lab Sweet Burrs)",
        subtitle: "Pre-aligned at factory with <5 micron tolerance",
        priceDeltaUsd: 110,
        savingsUsd: 230,
        popular: true,
      },
    ],
    reviews: [
      {
        author: "Liam O'Connor",
        country: "London, UK",
        flag: "🇬🇧",
        verified: true,
        rating: 5,
        title: "Zero static clump and whisper quiet",
        comment:
          "Upgraded from a Niche Zero. The flavor separation on Ethiopian light roasts is night and day.",
        date: "4 days ago",
      },
    ],
  },
  {
    id: "prod-laser-20w",
    slug: "lumicraft-20w-dual-laser-desktop-engraver",
    name: "LumiCraft™ Dual-Laser Desktop CNC Studio",
    subtitle: "20W Blue Diode + 2W Infrared Fiber Laser · Enclosed Class-1 Safety · AI Camera",
    niche: "barista_workspace",
    priceUsd: 699,
    compareAtUsd: 999,
    sourcingCostCny: 1550,
    shippingCostUsd: 38,
    weightKg: 11.2,
    rating: 4.92,
    reviewsCount: 185,
    badge: "MAKER STUDIO HIT",
    inStock: 16,
    svgType: "laser_engraver",
    highlights: [
      "Dual laser sources: engraves solid gold, silver, stainless steel, slate, wood, leather & acrylic",
      "16MP panoramic AI camera auto-positions your artwork via drag-and-drop in 2 seconds",
      "4,000 mm/s high-speed Galvanometer scanning — 8× faster than gantry engravers",
      "Fully enclosed eye-safe tinted hood with built-in HEPA smoke purifier interface",
    ],
    specs: [
      { label: "Laser Sources", value: "20W 455nm Diode + 2W 1064nm Infrared" },
      { label: "Engraving Speed", value: "Up to 4,000 mm/s Galvo Precision" },
      { label: "Software", value: "LightBurn Compatible + Free Mac/Win/iOS Suite" },
      { label: "Safety Rating", value: "FDA Class-1 Enclosed + Lid Auto-Stop" },
    ],
    bundles: [
      {
        id: "base-studio",
        title: "LumiCraft™ Dual-Laser Unit",
        subtitle: "Includes Starter Material Pack (Wood, Metal Cards, Slate)",
        priceDeltaUsd: 0,
        savingsUsd: 300,
      },
      {
        id: "rotary-pro",
        title: "Small Business Bundle (+360° Chuck Rotary & Smoke Purifier)",
        subtitle: "Engrave Stanley/Yeti Tumblers, Rings & Mugs indoors",
        priceDeltaUsd: 189,
        savingsUsd: 480,
        popular: true,
      },
    ],
    reviews: [
      {
        author: "Chloe Mercer",
        country: "Ontario, Canada",
        flag: "🇨🇦",
        verified: true,
        rating: 5,
        title: "Paid for itself in 2 weekends on Etsy!",
        comment:
          "I use it to engrave custom wedding tumblers and pet tags. The 1064nm IR laser marks stainless steel jewelry with razor-sharp detail.",
        date: "6 days ago",
      },
    ],
  },
  {
    id: "prod-bionic-chair",
    slug: "ergospine-aerospace-aluminum-bionic-chair",
    name: "ErgoSpine™ Bionic Dynamic Lumbar Task Chair",
    subtitle: "Dual-Wing Adaptive Spine Tracking · DuPont™ Elastomer Mesh · 4D Armrests",
    niche: "barista_workspace",
    priceUsd: 549,
    compareAtUsd: 799,
    sourcingCostCny: 1080,
    shippingCostUsd: 46,
    weightKg: 21.0,
    rating: 4.88,
    reviewsCount: 320,
    badge: "WFH ESSENTIAL",
    inStock: 21,
    svgType: "bionic_chair",
    highlights: [
      "Bionic dynamic lumbar system automatically pivots with your lower back at every recline angle",
      "German-engineered breathable elastomer mesh distributes pressure across 12 ergonomic zones",
      "Polished die-cast aluminum chassis with BIFMA & TÜV Class-4 gas lift",
      " Retractable leg rest + 138° zero-gravity recline lock for deep focus and recovery",
    ],
    specs: [
      { label: "Frame Construction", value: "ADC12 Polished Die-Cast Aluminum" },
      { label: "Mesh Material", value: "High-Tensile DuPont™ Breathable Mesh" },
      { label: "Max Load", value: "150 kg (330 lbs) BIFMA X5.1 Certified" },
      { label: "Warranty", value: "10-Year Structural Frame Warranty" },
    ],
    bundles: [
      {
        id: "standard-chair",
        title: "ErgoSpine™ Pro Chair (Obsidian / Silver)",
        subtitle: "Includes 3D Headrest & Silent PU Rollerblade Casters",
        priceDeltaUsd: 0,
        savingsUsd: 250,
      },
      {
        id: "footrest-edition",
        title: "Executive Suite (+Retractable Ottoman & Alcantara Pillow)",
        subtitle: "Ultimate 12-hour coding & studio comfort",
        priceDeltaUsd: 69,
        savingsUsd: 320,
        popular: true,
      },
    ],
    reviews: [
      {
        author: "Stefan Lindqvist",
        country: "Stockholm, Sweden",
        flag: "🇸🇪",
        verified: true,
        rating: 5,
        title: "Saved my lower back as a software architect",
        comment:
          "I tried the Herman Miller Aeron and found the hard plastic rim uncomfortable. This chair hugs my lumbar spine naturally.",
        date: "1 week ago",
      },
    ],
  },

  // ==================== NICHE 3: BIO-HACKING & WELLNESS RECOVERY ====================
  {
    id: "prod-redlight-1200",
    slug: "solispulse-1200w-medical-grade-red-light-panel",
    name: "SolisPulse™ 1200W Dual-Chip Red Light Panel",
    subtitle: "5-Wavelength (630/660/810/830/850nm) · >185 mW/cm² Irradiance · Zero Flicker",
    niche: "wellness_recovery",
    priceUsd: 649,
    compareAtUsd: 949,
    sourcingCostCny: 920,
    shippingCostUsd: 29,
    weightKg: 8.4,
    rating: 4.97,
    reviewsCount: 518,
    badge: "81% GROSS MARGIN STAR",
    inStock: 31,
    svgType: "red_light_panel",
    highlights: [
      "300× 5W Dual-Chip Medical LEDs emitting simultaneous Deep Red (660nm) & Near-Infrared (850nm)",
      "Stimulates cellular ATP production, collagen synthesis, deep joint recovery & circadian sleep",
      "Ultra-low EMF (0.0 μT at 4 inches) with 30° optical condenser lenses",
      "Touchscreen digital timer + modular daisy-chain link system",
    ],
    specs: [
      { label: "Wavelengths", value: "630nm, 660nm (Red) + 810nm, 830nm, 850nm (NIR)" },
      { label: "Irradiance", value: "185 mW/cm² at 6 inches (Solar Meter Verified)" },
      { label: "LED Lifespan", value: "100,000 Hours · Flicker-Free Driver" },
      { label: "Certifications", value: "FDA Class II Registered, CE, RoHS, FCC" },
    ],
    bundles: [
      {
        id: "panel-door",
        title: "SolisPulse™ 1200W Panel + Door/Wall Mount",
        subtitle: "Includes Protective Goggles, Pulley System & Hanging Kit",
        priceDeltaUsd: 0,
        savingsUsd: 300,
      },
      {
        id: "mobile-stand-kit",
        title: "Clinical Floor Stand Bundle (+Heavy-Duty Wheeled Stand)",
        subtitle: "Position vertically or horizontally over your bed or mat",
        priceDeltaUsd: 119,
        savingsUsd: 430,
        popular: true,
      },
    ],
    reviews: [
      {
        author: "Dr. Elena Rostova",
        country: "New York, USA",
        flag: "🇺🇸",
        verified: true,
        rating: 5,
        title: "Matches Joovv & PlatinumLED output at half the price",
        comment:
          "Tested the irradiance in my physical therapy clinic with our spectrometer—182 mW/cm² at 6 inches. My patients love the 10-minute recovery sessions.",
        date: "2 days ago",
      },
    ],
  },
  {
    id: "prod-led-mask",
    slug: "dermaglow-7-wavelength-cryo-silicone-led-mask",
    name: "DermaGlow™ Pro 660nm/850nm Silicone LED Mask",
    subtitle: "420 Medical LEDs · Flexible Liquid Silicone · Cordless 10-Min Collagen Protocol",
    niche: "wellness_recovery",
    priceUsd: 329,
    compareAtUsd: 469,
    sourcingCostCny: 360,
    shippingCostUsd: 14,
    weightKg: 0.95,
    rating: 4.94,
    reviewsCount: 645,
    badge: "TIKTOK VIRAL · LIGHTWEIGHT",
    inStock: 45,
    svgType: "led_mask",
    highlights: [
      "Clinically proven 633nm Red + 830nm Near-Infrared + 415nm Blue wavelengths for firm, radiant skin",
      "Ultra-soft food-grade liquid silicone contours flush to every face shape with built-in eye shields",
      "Lightweight 0.95 kg box — ships via fast air express with highest gross profit ratio",
      "Cordless rechargeable controller with 3 targeted 10-minute treatment modes",
    ],
    specs: [
      { label: "LED Count", value: "420 High-Density Precision Diodes" },
      { label: "Target Modes", value: "Anti-Aging (Red+NIR), Blemish (Blue), Glow (Amber)" },
      { label: "Material", value: "Hypoallergenic Medical Liquid Silicone" },
      { label: "Session Time", value: "10 Minutes Auto-Shutoff Cordless" },
    ],
    bundles: [
      {
        id: "face-mask",
        title: "DermaGlow™ Face Mask System",
        subtitle: "Includes Cordless Remote, Luxury Satin Travel Case & USB-C",
        priceDeltaUsd: 0,
        savingsUsd: 140,
      },
      {
        id: "face-neck-decollete",
        title: "Total Rejuvenation Set (+Neck & Décolletage LED Bib)",
        subtitle: "72% of customers choose this · Complete anti-aging coverage",
        priceDeltaUsd: 119,
        savingsUsd: 260,
        popular: true,
      },
    ],
    reviews: [
      {
        author: "Camille Laurent",
        country: "Paris, France",
        flag: "🇫🇷",
        verified: true,
        rating: 5,
        title: "Ma peau est transformée après 3 semaines !",
        comment:
          "So much more comfortable than rigid plastic masks, and the eye cushions block all glare while I read in bed.",
        date: "3 days ago",
      },
    ],
  },
  {
    id: "prod-cold-plunge",
    slug: "cryoplunge-pro-1hp-ice-bath-water-chiller",
    name: "CryoPlunge™ Pro 1.0HP Water Chiller & Tub",
    subtitle: "Chills to 3°C (37°F) Without Ice · 20-Micron + UV Ozone Sanitation · Wi-Fi App",
    niche: "wellness_recovery",
    priceUsd: 799,
    compareAtUsd: 1199,
    sourcingCostCny: 1680,
    shippingCostUsd: 52,
    weightKg: 24.0,
    rating: 4.91,
    reviewsCount: 230,
    badge: "ATHLETE RECOVERY",
    inStock: 12,
    svgType: "cold_plunge",
    highlights: [
      "Powerful 1.0HP compressor cools water down to 3°C (37°F) and heats up to 40°C (104°F)",
      "Built-in self-priming circulation pump, 20-micron pleated filter & UV/Ozone sanitation",
      "Schedule your morning 39°F plunge from your iPhone/Android app before waking up",
      "Weatherproof IPX4 outdoor-rated stainless housing with quick-connect insulated hoses",
    ],
    specs: [
      { label: "Cooling Power", value: "1.0 HP High-Efficiency Rotary Chiller" },
      { label: "Temperature Range", value: "3°C – 40°C (37°F – 104°F Cold & Hot)" },
      { label: "Sanitation", value: "Dual-Stage Micron Filter + Built-in Ozone" },
      { label: "Safety", value: "Integrated GFCI Leakage Breaker" },
    ],
    bundles: [
      {
        id: "chiller-only",
        title: "CryoPlunge™ 1.0HP Chiller Unit",
        subtitle: "Connects to any standard cold pod or insulated barrel",
        priceDeltaUsd: 0,
        savingsUsd: 400,
      },
      {
        id: "complete-plunge-system",
        title: "Full Recovery Bundle (+Drop-Stitch Insulated Pod & 6 Filters)",
        subtitle: "Turnkey 15-Minute Setup · Includes Thermal Lid & Mat",
        priceDeltaUsd: 199,
        savingsUsd: 650,
        popular: true,
      },
    ],
    reviews: [
      {
        author: "Ryan Callahan",
        country: "Florida, USA",
        flag: "🇺🇸",
        verified: true,
        rating: 5,
        title: "Holds 39°F effortlessly even in 90°F Miami heat!",
        comment:
          "Was spending $15 a day on bags of ice. This chiller paid for itself in two months and the water stays crystal clear.",
        date: "5 days ago",
      },
    ],
  },
  {
    id: "prod-recovery-boots",
    slug: "airpress-dynamic-6-chamber-compression-boots",
    name: "AirPress™ Pro 6-Chamber Lymphatic Boots",
    subtitle: "40–260 mmHg Sequential Pulse · 100% Cordless Integrated Pumps · Ripstop Nylon",
    niche: "wellness_recovery",
    priceUsd: 429,
    compareAtUsd: 599,
    sourcingCostCny: 580,
    shippingCostUsd: 21,
    weightKg: 3.2,
    rating: 4.93,
    reviewsCount: 310,
    badge: "MARATHON & GYM HIT",
    inStock: 29,
    svgType: "recovery_boots",
    highlights: [
      "6 overlapping air chambers flush lactic acid and metabolic waste 3× faster than passive rest",
      "Truly cordless design — micro-pumps are integrated directly into the boots with no external hoses",
      "8 customizable pressure levels (up to 260 mmHg) with zone-hold and skip-joint controls",
      "Packs into a compact airline carry-on backpack for race day and travel",
    ],
    specs: [
      { label: "Chambers", value: "6 Overlapping Biomimetic Air Zones" },
      { label: "Pressure Range", value: "40 – 260 mmHg Medical Grade" },
      { label: "Battery Life", value: "4 Hours Cordless Per Charge (USB-C)" },
      { label: "Fit", value: "Universal Full-Leg Length (5'3\" to 6'4\")" },
    ],
    bundles: [
      {
        id: "boots-pair",
        title: "AirPress™ Pro Pair (Left + Right Boots)",
        subtitle: "Includes Hardshell Travel Case & Dual USB-C Splitter Charger",
        priceDeltaUsd: 0,
        savingsUsd: 170,
      },
      {
        id: "hip-attachment",
        title: "Full Lower-Body Kit (+Glute & Hip Compression Shorts)",
        subtitle: "Complete hip flexor, quad, hamstring & calf recovery",
        priceDeltaUsd: 109,
        savingsUsd: 290,
        popular: true,
      },
    ],
    reviews: [
      {
        author: "Tobias Lindner",
        country: "Berlin, Germany",
        flag: "🇩🇪",
        verified: true,
        rating: 5,
        title: "Besser als Normatec weil komplett kabellos!",
        comment:
          "No external control box or tangled tubes. I put them on after my 25km marathon training runs and my legs feel fresh the next morning.",
        date: "4 days ago",
      },
    ],
  },
];

export interface SampleOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  country: string;
  flag: string;
  productName: string;
  bundleName: string;
  amountUsd: number;
  sourcingCostUsd: number;
  shippingUsd: number;
  netProfitUsd: number;
  paymentMethod: "Stripe (Card)" | "Klarna (4x BNPL)" | "Apple Pay" | "PayPal Express";
  status: "Fulfilled (DHL/FedEx)" | "Ready to Dispatch" | "Delivered";
  trackingNumber: string;
  createdAt: string;
}

export const INITIAL_ORDERS: SampleOrder[] = [
  {
    id: "ord-101",
    orderNumber: "#GLB-8942",
    customerName: "Brandon Miller",
    customerEmail: "b.miller@austinventures.io",
    country: "United States (TX)",
    flag: "🇺🇸",
    productName: "VoltApex™ Pro 1500W LiFePO4 Power Station",
    bundleName: "Solar Generator Kit (+200W Solar Panel)",
    amountUsd: 1048,
    sourcingCostUsd: 343,
    shippingUsd: 58,
    netProfitUsd: 611,
    paymentMethod: "Klarna (4x BNPL)",
    status: "Fulfilled (DHL/FedEx)",
    trackingNumber: "FX-7849201842US",
    createdAt: "14 mins ago",
  },
  {
    id: "ord-102",
    orderNumber: "#GLB-8941",
    customerName: "Sophie Dubois",
    customerEmail: "sophie.dubois@wanadoo.fr",
    country: "France (Paris)",
    flag: "🇫🇷",
    productName: "DermaGlow™ Pro 660nm/850nm Silicone LED Mask",
    bundleName: "Total Rejuvenation Set (+Neck LED Bib)",
    amountUsd: 448,
    sourcingCostUsd: 78,
    shippingUsd: 18,
    netProfitUsd: 336,
    paymentMethod: "Apple Pay",
    status: "Fulfilled (DHL/FedEx)",
    trackingNumber: "YT-2249108472FR",
    createdAt: "1 hour ago",
  },
  {
    id: "ord-103",
    orderNumber: "#GLB-8940",
    customerName: "Maximilian Richter",
    customerEmail: "m.richter@t-online.de",
    country: "Germany (Munich)",
    flag: "🇩🇪",
    productName: "BaristaLab™ Dual-Boiler PID Espresso Machine",
    bundleName: "Complete Cafe Suite (+TitanGrind™ 64mm)",
    amountUsd: 1148,
    sourcingCostUsd: 395,
    shippingUsd: 62,
    netProfitUsd: 652,
    paymentMethod: "Stripe (Card)",
    status: "Delivered",
    trackingNumber: "DHL-00340434291DE",
    createdAt: "3 hours ago",
  },
  {
    id: "ord-104",
    orderNumber: "#GLB-8939",
    customerName: "Oliver Wright",
    customerEmail: "oliver.w@btinternet.com",
    country: "United Kingdom (London)",
    flag: "🇬🇧",
    productName: "SolisPulse™ 1200W Dual-Chip Red Light Panel",
    bundleName: "Clinical Floor Stand Bundle",
    amountUsd: 768,
    sourcingCostUsd: 165,
    shippingUsd: 35,
    netProfitUsd: 541,
    paymentMethod: "PayPal Express",
    status: "Ready to Dispatch",
    trackingNumber: "Pending Sync",
    createdAt: "5 hours ago",
  },
];
