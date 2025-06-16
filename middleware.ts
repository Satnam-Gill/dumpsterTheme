import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import subdomainUrl from "@/components/Content/subDomainUrlContent.json";

export function middleware(request: NextRequest) {
  const subDomains = Object.keys(subdomainUrl);
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];

  // console.log("Middleware - Hostname:", hostname);
  // console.log("Middleware - Extracted Subdomain:", subdomain);

  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/static") ||
    url.pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp)$/i)
  ) {
    return NextResponse.next();
  }

  if (!subDomains.includes(subdomain)) {
    return NextResponse.next();
  }

  if (subdomain && subdomain !== "www") {
    url.pathname = `/${subdomain}${url.pathname}`;
  }

  // Create a response and set a custom header
  const response = NextResponse.rewrite(url);
  response.headers.set("x-subdomain", subdomain);

  // console.log("Middleware - Setting Header: x-subdomain =", subdomain);
  
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
