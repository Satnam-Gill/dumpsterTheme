import { NextResponse } from 'next/server';
import contactInfo from '@/components/Content/ContactInfo.json';

export async function GET(request: Request) {
  try {
    // Try to get protocol and host from headers (for local/dev/prod correctness)
    let baseUrl = '';
    if (request) {
      const headersList = request.headers;
      const protocol = headersList.get('x-forwarded-proto') || 'http';
      const host = headersList.get('host');
      if (host) {
        baseUrl = `${protocol}://${host}`;
      }
    }
    if (!baseUrl) {
      baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : contactInfo.baseUrl.replace(/\/$/, '');
    }

    // Fetch blogs from the API route
    const res = await fetch(`${baseUrl}/api/blogs`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch blogs from API');
    }
    const data = await res.json();
    const blogs = data.blogs || [];

    // Generate XML entries for each blog
    const blogUrls = blogs.map((blog: any) => {
      const url = `${contactInfo.baseUrl}blogs/${blog.catagory}/${blog.slug}`;
      return `\n  <url>\n    <loc>${url}</loc>\n    <lastmod>${blog.publishedAt}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
    }).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${blogUrls}\n</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
} 