// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import subdomainUrl from "@/components/Content/subDomainUrlContent.json";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];
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
