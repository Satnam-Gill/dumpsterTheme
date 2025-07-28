// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';
import contentData from "@/components/Content/ContactInfo.json";
import data from "@/components/Content/subDomainUrlContent.json";

export async function GET() {
  const BaseUrl = contentData.baseUrl;
  const SubDomain = Object.keys(data);

  const urls = [
    `${contentData.baseUrl}`,
    `${contentData.baseUrl}locations`,
    `${contentData.baseUrl}services`,
    `${contentData.baseUrl}about`,
    `${contentData.baseUrl}blogs`,
    `${contentData.baseUrl}contact`,
    `${contentData.baseUrl}subdomains/sitemap.xml`,
    `${contentData.baseUrl}blogs/sitemap.xml`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}