import  ContactInfo  from '@/components/Content/ContactInfo.json';
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Function to fetch subdomain data from API
async function getSubdomainData() {
  try {
    const baseUrl = typeof window !== 'undefined' 
      ? `${window.location.protocol}//${window.location.host}`
      :   'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/subdomains`, {
      cache: 'no-store'
    });
    const data = await response.json();
    
    if (data && data.subdomains) {
      // Convert array back to object with slug as key
      return data.subdomains.reduce((acc: any, item: any) => {
        if (item.slug) {
          acc[item.slug] = item;
        }
        return acc;
      }, {});
    }
    return {};
  } catch (error) {
    return {};
  }
}


export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];
  
  // Fetch subdomain data from API
  const subdomainUrl = await getSubdomainData();
  const subDomains = Object.keys(subdomainUrl);
  const allowedSubs = Object.keys(subdomainUrl);

  // Skip Next assets
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/static") ||
    url.pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp)$/i)
  ) {
    return NextResponse.next();
  }



  // 2) Let the main domain serve robots and sitemap normally
  if (/^\/(robots\.txt|sitemap.xml|blogs\/sitemap\.xml)$/.test(url.pathname)) {
    const res = NextResponse.next();
    res.headers.set("x-subdomain", subdomain);
    return res;
  }

  if (!subDomains.includes(subdomain)) {
    return NextResponse.next();
  }

  if (subdomain && subdomain !== "www") {
    url.pathname = `/${subdomain}${url.pathname}`;
  }

  const response = NextResponse.rewrite(url);
  response.headers.set("x-subdomain", subdomain);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
