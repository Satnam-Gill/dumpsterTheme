// app/sitemap-subdomains/sitemap.xml/route.ts
import { NextResponse } from "next/server";
import contentData from "@/components/Content/ContactInfo.json";
import subdomainMap from "@/components/Content/subDomainUrlContent.json";

export async function GET() {
  // Normalize the base host (no protocol, no trailing slash)
  const host = String(contentData.host)
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  const subdomains = Object.keys(subdomainMap || {}); 
  const now = new Date().toISOString();

  // Build <sitemap> entries pointing to each subdomain's sitemap.xml
  const entries = subdomains
    .map(
      (sd) => `  <sitemap>
    <loc>https://${sd}.${host}/sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
    )
    .join("\n");

  // Full XML response as a sitemap index
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
