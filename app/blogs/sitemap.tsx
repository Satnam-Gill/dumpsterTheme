import contentData from "@/components/Content/ContactInfo.json";
import { headers } from "next/headers";

export default async function sitemap() {
  let blogData: any[] = [];
  let notFound = false;
  let currentDate = "";

  try {
    const data = await getBlogData();

    if (!data || !data.blogs) {
      notFound = true;
      currentDate = data?.currentDate;
    } else {
      blogData = data.blogs;
      currentDate = data.currentDate;
      if (!blogData.length) {
        notFound = true;
      }
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    notFound = true;
  }

  const uniqueCategories = Array.from(
    new Set(blogData.map((url: any) => url.catagory)),
  );
  const blogCatergoryURL = uniqueCategories.map((catagory: string) => ({
    url: `${contentData.baseUrl}${catagory}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as "weekly",
    priority: 1,
  }));
  const blogURL = blogData.map((url: any) => ({
    url: `${contentData.baseUrl}${url.catagory}/${url.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as "weekly",
    priority: 1,
  }));
  return [...blogCatergoryURL, ...blogURL];
}

async function getBlogData() {
  const headersList = headers();
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = headersList.get("host") || "localhost:3000";

  const res = await fetch(`${protocol}://${host}/api/blogs`, {
    cache: "no-store",
  });

  return res.json();
}
