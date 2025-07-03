import Image from "next/image";
import React from "react";
import BlogPosts from "../components/Widgets/BlogPosts";
import ContactInfo from "@/components/Content/ContactInfo.json";
import Navbar from "../components/Navbar";
import { headers } from "next/headers";
import contactContent from "@/app/Data/content";
const blogsMetas: any = contactContent.locationPageContent;
// Force the page to be dynamic
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  const meta = JSON.parse(
    JSON.stringify(blogsMetas.blogMetas)
      .split("[location]")
      .join(ContactInfo.location)
      .split("[phone]")
      .join(ContactInfo.No),
  );
  return {
    title: meta.metaTitle,
    description: meta.metaDescription,
    alternates: {
      canonical: `${ContactInfo.baseUrl}blogs`,
    },
  };
}

// Function to group and sort data by location
function groupAndSortBycatagory(data: any[]) {
  const groupedData = data.reduce((acc: any, item: any) => {
    const catagory = item.catagory;
    if (!acc[catagory]) {
      acc[catagory] = [];
    }
    acc[catagory].push(item);
    return acc;
  }, {});
  const sortedcatagorys = Object.keys(groupedData).sort();
  const sortedOutput = sortedcatagorys.reduce((acc: any, catagory) => {
    acc[catagory] = groupedData[catagory];
    return acc;
  }, {});

  return sortedOutput;
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

const page = async () => {
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

  if (notFound || blogData.length === 0) {
    return (
      <div className="">
        <Navbar />
        <div className="mx-auto max-w-[1905px] p-8 text-center text-lg">
          <p>No blogs are currently published.</p>
          <p className="mt-2 text-sm text-gray-600">
            Check back later for new content!
          </p>
          {currentDate && (
            <p className="mt-1 text-xs text-gray-500">
              Current date: {currentDate}
            </p>
          )}
        </div>
      </div>
    );
  }

  const sortedDataBycatagory = groupAndSortBycatagory(blogData);
  const catagorys = Object.keys(sortedDataBycatagory);

  return (
    <div className="">
      <Navbar />
      <div className="overflow-hidden">
        <div className="mx-auto max-w-[1905px]">
          <BlogPosts postData={blogData} catagorys={catagorys} />
        </div>
      </div>
    </div>
  );
};

export default page;
