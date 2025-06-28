import Image from "next/image";
import React from "react";
import { MdDoubleArrow } from "react-icons/md";
import Link from "next/link";
import contactContent from "@/app/Data/content";
import subdomainContent from "@/app/Data/FinalContent";

const ContactInfo: any = contactContent.contactContent;
const content1: any = contactContent.servicePageContent;
const content: any = subdomainContent.subdomainData;

interface ServiceItem {
  imageUrl: string;
  slug: string;
  title: string;
  description: string;
}

interface ServiceData {
  title: string;
  p: string;
  lists: ServiceItem[];
}

const Service = ({value=""}: any) => {
  const data: ServiceData = content1?.serviceData;
  const contentData: { name: string } = content[value as keyof typeof content];
 const abbrevation = value?.split("-").pop()?.toUpperCase(); 
const StateName = contentData?.name ? (abbrevation ? `${contentData.name}, ${abbrevation}` : contentData.name) : ContactInfo.location;
  return (
    <div className=" px-4  md:px-10">
      <h2 className="text-first text-center text-3xl font-bold text-main  mt-5">
        {data.title?.split("[location]").join(contentData?.name || ContactInfo.location)
            ?.split("[phone]").join(ContactInfo.No)}
      </h2>

      <div
        className="mt-4 px-4  text-center "
        dangerouslySetInnerHTML={{ __html: data.p?.split("[location]").join(contentData?.name || ContactInfo.location)
            ?.split("[phone]").join(ContactInfo.No) }}
      ></div>
      <div className="mb-10   flex flex-wrap   justify-center gap-10">
        {data.lists?.map((items: ServiceItem, index: number) => (
          <div
            className=" 1 flex  w-[22rem] overflow-hidden rounded-2xl border border-gray-300 p-3 shadow-md duration-300 ease-in  hover:-translate-y-4 md:mt-10 md:flex-col md:rounded-3xl md:p-0"
            key={index}
          >
            <div className="flex items-center justify-start gap-4 object-cover md:h-60 md:justify-center md:gap-0">
              <div className="h-14 w-14 overflow-hidden rounded-full object-cover md:h-full md:w-full md:rounded-none">
                <Image
                  aria-hidden="true"
                  src={`${items.imageUrl}`}
                  unoptimized={true}
                  alt={
                    items.imageUrl.split("/").pop()?.split(".")[0] || "image"
                  }
                  title={items.imageUrl.split("/").pop()?.split(".")[0] || "image"}
                  width="900"
                  height="550"
                  className="h-14 w-14 object-cover md:h-full md:w-full "
                />
              </div>
            </div>
            <h3
              className={`1  mt-4 w-[75%] justify-start gap-2 px-4 text-lg font-bold text-main  md:flex  md:text-xl`}
            >
              <MdDoubleArrow className="text-bold hidden text-3xl md:block" />
              <Link href={`/services/${items.slug}`}>
                {items.title?.split("[location]").join(contentData?.name || ContactInfo.location)
            ?.split("[phone]").join(ContactInfo.No)}
              </Link>
            </h3>
            <div
              className=" hidden p-4 text-justify text-base md:block"
              dangerouslySetInnerHTML={{
                __html: items.description?.split("[location]").join(contentData?.name || ContactInfo.location)
                ?.split("[phone]").join(ContactInfo.No),
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
