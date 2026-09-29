import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      items = [],
      currency = "USD",
      customerEmail = "buyer@example.com",
      customerName = "Global Customer",
      country = "US",
      paymentMethod = "stripe_card",
      discountUsd = 0,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    // If real Stripe Secret Key is configured, create a live/test Stripe Checkout Session
    if (
      stripeSecretKey &&
      stripeSecretKey.startsWith("sk_") &&
      !stripeSecretKey.includes("your_stripe_secret_key")
    ) {
      const stripe = new Stripe(stripeSecretKey, {
        apiVersion: "2024-09-30.acacia" as any,
      });

      const origin =
        req.headers.get("origin") ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        "http://localhost:3000";

      const lineItems = items.map((item: any) => ({
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: `${item.name} (${item.bundleTitle || "Standard"})`,
            description: `Plug/Voltage: ${item.plugType || "US 110V"} · Direct Local Warehouse Dispatch`,
          },
          unit_amount: Math.round(item.unitPrice * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: customerEmail,
        payment_method_types:
          paymentMethod === "klarna_bnpl"
            ? ["card", "klarna"]
            : ["card"],
        line_items: lineItems,
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "GB", "DE", "FR", "NL", "IT", "ES", "AU"],
        },
        success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/?checkout=cancelled`,
      });

      return NextResponse.json({
        mode: "live_stripe",
        checkoutUrl: session.url,
        sessionId: session.id,
      });
    }

    // Otherwise, run instant Sandbox Checkout Simulation so preview works out-of-the-box
    const orderNumber = `#GLB-${Math.floor(1000 + Math.random() * 9000)}`;
    const subtotalUsd = items.reduce(
      (sum: number, item: any) => sum + Number(item.unitPriceUsd) * Number(item.quantity),
      0
    );
    const totalUsd = Math.max(0, subtotalUsd - Number(discountUsd));

    return NextResponse.json({
      mode: "sandbox_simulation",
      success: true,
      order: {
        orderNumber,
        customerName,
        customerEmail,
        country,
        currency,
        paymentMethod,
        subtotalUsd,
        discountUsd,
        totalUsd,
        warehouseDispatched:
          country === "US" || country === "CA"
            ? "New Jersey / Los Angeles Local Fulfillment Hub"
            : "Frankfurt (DE) EU Bonded Warehouse",
        estimatedDelivery: "3–5 Business Days (FedEx / DHL Tracked)",
        createdAt: "Just now",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Checkout processing failed" },
      { status: 500 }
    );
  }
}
