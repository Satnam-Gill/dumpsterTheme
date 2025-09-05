import { NextResponse } from "next/server";
import serviceData from "@/components/Content/servicePage.json";
import contentData from "@/components/Content/ContactInfo.json";
import { headers } from "next/headers";

// Add dynamic export for API support
export const dynamic = 'force-dynamic';

// Helper function to get base URL from headers or fallback
function getBaseUrl(headersList: any): string {
  try {
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'https';
    
    if (host) {
      return `${protocol}://${host}/`;
    }
  } catch (error) {
    console.warn('Error getting host from headers:', error);
  }
  
  // Fallback to static content
  return contentData.baseUrl;
}

// Helper function to get API base URL (avoiding subdomain issues in development)
function getApiBaseUrl(headersList: any): string {
  try {
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'https';
    
    if (host) {
      // Check if we're in development (localhost)
      if (host.includes('localhost')) {
        return `${protocol}://${host}`;
      }
      
      // In production, ensure we use main domain for API calls
      const [hostname, port] = host.split(':');
      const domainParts = hostname.split('.');
      
      // If it's a subdomain, use the main domain
      if (domainParts.length > 2) {
        const mainDomain = domainParts.slice(1).join('.');
        return `${protocol}://${mainDomain}${port ? `:${port}` : ''}`;
      }
      
      return `${protocol}://${host}`;
    }
  } catch (error) {
    console.warn('Error getting host from headers:', error);
  }
  
  // Fallback to static content
  return contentData.baseUrl;
}

// Helper function to fetch data from API with fallback
async function fetchWithFallback<T>(url: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('API fetch failed, using fallback:', error);
    return fallback;
  }
}

export async function GET(request: Request) {
  const headersList = headers();
  const baseUrl = getBaseUrl(headersList);
  const apiBaseUrl = getApiBaseUrl(headersList);

  // Fetch subdomain data from API with fallback
  const subdomainData = await fetchWithFallback(
    `${apiBaseUrl}/api/subdomains`,
    { subdomains: [] }
  );

  // Generate service URLs
  const ServiceSlug: string[] = serviceData.serviceData.lists.map(
    (item: any) => item.slug,
  );

  const ServiceURL = ServiceSlug.map(
    (location) => `
    <url>
      <loc>${baseUrl}services/${location}/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  `,
  ).join("");

  // Generate subdomain URLs
  const subdomains = subdomainData.subdomains || [];
  const SubdomainURL = subdomains.map((subdomain: any) => {
    const slug = subdomain.slug || subdomain.name?.toLowerCase().replace(/\s+/g, '-');
    if (!slug) return '';
    
    return `
    <url>
      <loc>${baseUrl}${slug}/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
  }).filter(Boolean).join("");

  // Generate neighborhood URLs for each subdomain using their neighbourhoods key
  const NeighborhoodURL = subdomains.flatMap((subdomain: any) => {
    const citySlug = subdomain.slug || subdomain.name?.toLowerCase().replace(/\s+/g, '-');
    if (!citySlug || !subdomain.neighbourhoods) return [];
    
    // Parse neighborhoods from the subdomain's neighbourhoods field
    const cityNeighborhoods = subdomain.neighbourhoods
      .split('|')
      .map((n: string) => n.trim())
      .filter(Boolean);
    
    return cityNeighborhoods.map((neighborhood: string) => {
      const neighborhoodSlug = neighborhood.toLowerCase().replace(/\s+/g, '-');
      return `
    <url>
      <loc>${baseUrl}${citySlug}/neighborhoods/${neighborhoodSlug}/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>`;
    });
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}about/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}contact/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}services/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  ${ServiceURL}${SubdomainURL}${NeighborhoodURL}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
