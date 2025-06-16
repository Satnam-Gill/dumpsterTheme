import { MetadataRoute } from 'next'
//  import CityData1 from "@/public/City.json";
 import contentData from "@/components/Content/ContactInfo.json"
import data from "@/components/Content/subDomainUrlContent.json";


export default function sitemap(): MetadataRoute.Sitemap {
  const SubDomain:any = Object.keys(data)
 
  const SubDomainURL = SubDomain.map((location :any) => ({
    url: `https://${location}.${contentData.host}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));
  return [
   ...SubDomainURL
  ]
}