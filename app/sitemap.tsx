import { MetadataRoute } from 'next'
//  import CityData1 from "@/public/City.json";
 import contentData from "@/components/Content/ContactInfo.json"
import data from "@/components/Content/subDomainUrlContent.json";


export default function sitemap(): MetadataRoute.Sitemap {
  const BaseUrl = contentData.baseUrl
  // const CityData: any = CityData1;
  const SubDomain:any = Object.keys(data)
  // const StateUrl: any = State.map((location: { slug: any }) => ({
  //   url: `/${location.slug.split(" ").join("-").toLowerCase()}`,
  //   lastModified: new Date(),
  //   changeFrequency: "weekly",
  //   priority: 0.9,
  // }));

  // const CityUrl:any = Object.keys(CityData).flatMap((state) => {
  //   return CityData[state].map((city: { slug: string; }) => ({
  //     url: `/${state.toLowerCase()}/${city.slug.split(" ").join("-").toLowerCase()}`,
  //     lastModified: new Date(),
  //     changeFrequency: "weekly",
  //     priority: 0.9,
  //   }));
  // });

  
  const SubDomainURL = SubDomain.map((location :any) => ({
    url: `https://${location}.${contentData.host}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));
  return [
    {
      url: `${contentData.baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${contentData.baseUrl}locations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${contentData.baseUrl}services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${contentData.baseUrl}about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${contentData.baseUrl}blogs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${contentData.baseUrl}contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${contentData.baseUrl}subdomains/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${contentData.baseUrl}blogs/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
   
  ]
}