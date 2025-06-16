import { MetadataRoute } from "next";
import blogData from "@/components/Content/blogs.json";
import contentData from "@/components/Content/ContactInfo.json"

export default function sitemap(): MetadataRoute.Sitemap {

  const uniqueCategories = Array.from(new Set(blogData.map((url: any) => url.catagory)));
  const blogCatergoryURL = uniqueCategories.map((catagory: string) => ({
    url: `${contentData.baseUrl}${catagory}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as "weekly",
    priority: 1,
  }));
  const blogURL = blogData.map((url :any) => ({
    url: `${contentData.baseUrl}${url.catagory}/${url.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as "weekly",
    priority: 1,
  }));
  return [
    ...blogCatergoryURL,
   ...blogURL
  ];
}