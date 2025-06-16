// import { MetadataRoute } from "next";
// import contentData from "@/components/Content/ContactInfo.json";

// export default function robots(): MetadataRoute.Robots {
//   const BaseUrl = contentData.baseUrl;
//   return {
//     rules: [
//       {
//         userAgent: "*",
//         allow: "/",
//         disallow: ["/private/", "/?", "/&", "/api/", "/_next/image"],
//       },
//     ],
//     sitemap: `${BaseUrl}sitemap.xml`,
//   };
// }
import { MetadataRoute } from 'next'
import contentData from "@/components/Content/ContactInfo.json"
import subdomainUrl from "@/components/Content/subDomainUrlContent.json"

export default function robots(): MetadataRoute.Robots {
  const BaseUrl = contentData.baseUrl
  const subDomains = Object.keys(subdomainUrl)
  
  // Define main pages that should be allowed under each subdomain
  const mainPages = ['/services', '/about', '/contact', '/locations', '/our-brands']
  
  // Generate allow paths for subdomains and their main pages
  const subdomainAllowPaths = subDomains.flatMap(subdomain => [
    `/${subdomain}`,  // Allow root path
    ...mainPages.map(page => `/${subdomain}${page}`)  // Allow main pages under subdomain
  ])
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/services',
          '/contact',
          '/locations',
          '/our-brands',
          '/_blogs',
          '/_next/image',
          ...subdomainAllowPaths
        ],
        disallow: [
          '/private/',
          '/api/',
          '/_next/',
          '/static/',
          '/*.json$',
          '/*.xml$',
          ...subDomains.map(subdomain => `/${subdomain}/${subdomain}`)  // Disallow duplicate subdomain paths
        ]
      }
    ],
    sitemap: `${BaseUrl}sitemap.xml`,
    host: `${BaseUrl}`
  }
}

