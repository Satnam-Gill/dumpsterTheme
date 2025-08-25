// app/sitemap-index.xml.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import contentData from "@/components/Content/ContactInfo.json";
import subdomainMap from "@/components/Content/subDomainUrlContent.json"; // keys = allowed subdomains
import serviceData from "@/components/Content/servicePage.json";

export const dynamic = "force-dynamic";

// Safely derive the slugs (fallback to [])
const ServiceSlug: string[] = Array.isArray(serviceData?.serviceData?.lists)
  ? serviceData.serviceData.lists.map((item: any) => String(item?.slug || "").trim()).filter(Boolean)
  : [];

export async function GET() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto =
    h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");

  const [hostnameNoPort, port] = host.split(":");
  const firstLabel = hostnameNoPort.split(".")[0];
  const allowed = Object.keys(subdomainMap || {});
  const onSubdomain = allowed.includes(firstLabel);

  const makeOrigin = (h: string) => `${proto}://${h}${port ? `:${port}` : ""}`;
  const origin = makeOrigin(hostnameNoPort);
  const now = new Date().toISOString();

  // Build /service/[slug] entries for subdomains only
  const ServiceURL = ServiceSlug.map(
    (slug) => `
  <url>
    <loc>${origin}/service/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  ).join("");

  // If we are on a subdomain: return that subdomain's own URL-set
  if (onSubdomain) {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${origin}/about</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${origin}/contact</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${origin}/service</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>${ServiceURL}
</urlset>`;

    return new NextResponse(xml, {
      headers: { "Content-Type": "application/xml" },
    });
  }

  // Otherwise (main domain): keep your original sitemap index unchanged
  const baseUrl = contentData.baseUrl; // e.g., "https://example.com/" (with trailing slash)
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}sitemap-main.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}sitemap-blogs.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}sitemap-subdomains.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new NextResponse(indexXml, {
    headers: { "Content-Type": "application/xml" },
  });
}
