import Image from "next/image";
import React from "react";
import blogData from "@/components/Content/blogs.json";
import BlogPosts from "../components/Widgets/BlogPosts";
import ContactInfo from "@/components/Content/ContactInfo.json";
import Navbar from "../components/Navbar";
import blogsMetas from "@/components/Content/location.json"

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
    description:
      meta.metaDescription,
    alternates: {
      canonical: `${ContactInfo.baseUrl}blogs`,
    },
  };
}

export const revalidate = 60;

// Function to group and sort data by location
function groupAndSortBycatagory(data: any) {
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
const page = async () => {
  const sortedDataBycatagory = groupAndSortBycatagory(blogData);
  const catagorys = Object.keys(sortedDataBycatagory);
  return (
    <div className="">
      <Navbar />
    
    <div className="overflow-hidden ">
      <div className="relative -mt-14 duration-150 ease-in-out md:mt-0"></div>
      <div className="mx-auto max-w-[1905px]">
        {/* <Navbar /> */}
        {/* Content */}
        <BlogPosts postData={blogData} catagorys={catagorys} />
      </div>
    </div>
    </div>
  );
};

export default page;
