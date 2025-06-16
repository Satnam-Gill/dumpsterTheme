import React from "react";
import Image from "next/image";
import DateComponent from "@/app/components/Widgets/DateComponent";
import blogData from "@/components/Content/blogs.json";
import Link from "next/link";
import ContactInfo from "@/components/Content/ContactInfo.json";
import blogsCategoryMetas from "@/components/Content/blogsCategoryMetas.json";
import Navbar from "@/app/components/Navbar";
import Banner from "@/app/components/Home/Banner";

interface blogsCategoryType {
  [key: string]: {
    title: string;
    description: string;
    bannerImage: string;
  };
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const blogsMetas = blogsCategoryMetas as blogsCategoryType;
  const metas = blogsMetas[params.category];
  return {
    title: metas?.title,
    description: metas?.description,
    alternates: {
      canonical: `${ContactInfo.baseUrl}blogs/${params?.category}`,
    },
  };
}

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
const page = ({ params }: { params: { category: string } }) => {
  const sortedDataBycatagory = groupAndSortBycatagory(blogData);
  blogData.forEach((blog: any) => {
    if (blog.otherCategory && Array.isArray(blog.otherCategory)) {
      blog.otherCategory.forEach((otherCat: string) => {
        if (sortedDataBycatagory[otherCat]) {
          sortedDataBycatagory[otherCat].push(blog);
        } else {
          sortedDataBycatagory[otherCat] = [blog];
        }
      });
    }
  });
  const FilteredData = blogData.filter(
    (item) => item.catagory === params.category,
  );
  const blogsMetas = blogsCategoryMetas as blogsCategoryType;
  const metas = blogsMetas[params.category];
  // console.log(metas);
  return (
    <div className="">
      <Navbar />
      <div>
        <Banner
        h1={FilteredData[0]?.categoryName}
        image={metas.bannerImage}
        p1={metas.description}
      />
        {/* <div className=" relative  h-[50vh] max-w-[2100px] duration-150 ease-in-out md:mt-0 md:h-[350px] ">
          <Image
            className="absolute h-[50vh] w-[100%] object-cover  md:h-[350px] "
            src={`https://ik.imagekit.io/h7rza8886p/dumpster-recycle-waste-and-garbage-bins.jpg?updatedAt=1749623678772`}
            alt="Banner_Image"
            width={900}
            height={900}
          />
          <div className="top-30  relative  flex h-full items-center gap-2 bg-gradient-to-r  from-[#000000f3] to-[#00000050] text-3xl text-white   md:px-12 md:text-[40px] ">
            <div className=" w-full px-4 pt-4 text-center font-bold leading-[50px] text-white md:mt-14 md:px-0 md:pt-40 lg:ml-0 lg:w-full lg:pt-0">
              <div className="uppercase">{FilteredData[0]?.categoryName}</div>
            </div>
          </div>
        </div> */}
        <div className="my-10 mt-20 px-4 md:px-10">
          {/* <h2 className="text-center text-3xl font-semibold uppercase text-main ">
          {FilteredData[0].categoryName}
        </h2> */}
          <div className="Card my-10 grid gap-16  md:grid-cols-2 lg:grid-cols-3 ">
            {sortedDataBycatagory[params.category]
              .reverse()
              .map((item: any, index: number) => {
                return (
                  <div
                    className="relative rounded-lg border text-black duration-300 ease-in-out md:w-11/12"
                    key={index}
                  >
                    <div className="overflow-hidden rounded-lg lg:w-fit">
                      <Image
                        src={`${item.postImage.src}`}
                        alt={item.h1}
                        width={10000}
                        height={10000}
                        className="h-60 object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="container2 p-4  md:pr-12">
                      <div className="ml-2 flex items-center justify-center lg:block lg:w-fit">
                        {/* <Image
                        src={urlForImage(item.newsImage)}
                        alt="News Image"
                        width={150}
                        height={0}
                        className="-ml-2"
                        loading="lazy"
                      /> */}
                      </div>
                      <h2 className="mt-2 w-fit text-center text-xl md:text-left ">
                        <Link
                          href={`/blogs/${item?.catagory.toLowerCase().split(" ").join("-")}/${item.slug}`}
                        >
                          {" "}
                          {item.h1.toUpperCase()}
                        </Link>
                      </h2>
                      <div className="mt-4 flex justify-between text-sm ">
                        <div className="font-semibold text-main underline-offset-8 duration-300 ease-in-out  hover:underline hover:underline-offset-2">
                          <Link
                            href={`/blogs/${item?.catagory.toLowerCase().split(" ").join("-")}/${item.slug}`}
                          >
                            Read More
                          </Link>
                        </div>
                        <div className="">
                          <DateComponent publishedAt={item.publishedAt} />
                        </div>
                      </div>
                      <div className="mt-4 w-fit text-sm">{`${item.description.trim()}...`}</div>
                      <div className="">
                        {/* <Knowmore
                              link={`/dubai-communities/${item.location.toLowerCase().split(" ").join("-")}/${item.slug.current}`}
                            /> */}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

export function generateStaticParams() {
  const subDomain = Array.from(new Set(blogData.map((item) => item.catagory)));
  // const subDomain = Object.keys(cityData);
  return subDomain.map((locations: any) => ({
    category: locations.toString(),
  }));
}
