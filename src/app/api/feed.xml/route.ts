import { NextResponse } from "next/server";
import { INITIAL_PRODUCTS } from "@/data/store-data";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-global-dtc-store.vercel.app";

  const itemsXml = INITIAL_PRODUCTS.map(
    (p) => `
    <item>
      <g:id>${p.id}</g:id>
      <g:title><![CDATA[${p.name}]]></g:title>
      <g:description><![CDATA[${p.subtitle} - ${p.highlights.join(" | ")}]]></g:description>
      <g:link>${siteUrl}/?product=${p.slug}</g:link>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>${p.priceUsd.toFixed(2)} USD</g:price>
      <g:sale_price>${p.priceUsd.toFixed(2)} USD</g:sale_price>
      <g:brand>AETHERIA Global</g:brand>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>FedEx Ground Tracked</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>DE</g:country>
        <g:service>DHL Express</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
    </item>`
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>AETHERIA Global High-Ticket DTC Feed (Google Merchant Center &amp; Meta Catalog)</title>
    <link>${siteUrl}</link>
    <description>Automated Google Shopping PMax &amp; Meta DPA Product Feed</description>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
