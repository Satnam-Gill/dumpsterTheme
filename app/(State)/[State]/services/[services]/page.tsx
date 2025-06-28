import Banner from "@/app/components/Home/Banner";
import React from "react";
import Image from "next/image";
import Service from "@/app/components/Home/Service";
import { headers } from "next/headers";
import CtaSimple from "@/app/components/CtaSimple";
import NavbarState from "@/app/components/State/NavbarState";

import contactContent from "@/app/Data/content";
import subdomainContent from "@/app/Data/FinalContent";

const ContactInfo: any = contactContent.contactContent;
const data: any = contactContent.servicePageContent;
const content: any = subdomainContent.subdomainData;
const Servicedata = data?.serviceData;
export function generateMetadata({ params }: { params: { services: string } }) {
  const serviceData: any = Servicedata.lists.find(
    (service:any) => service.slug === params.services,
  );
  const headersList = headers();
  const subdomain = headersList.get("x-subdomain");
  const Data: any = content[subdomain as keyof typeof content];
  return {
    title: serviceData.title
    ?.split("[location]").join(Data?.name || ContactInfo.location)
    ?.split("[phone]").join(ContactInfo.No),
    description: serviceData.description?.split("[location]").join(Data?.name || ContactInfo.location)
    ?.split("[phone]").join(ContactInfo.No),
    alternates: {
      canonical: `https://${Data.slug}.${ContactInfo.host}/types/${params.services}/`,
    },
  };
}

const page = ({ params }: { params: { services: string } }) => {
  const serviceData: any = Servicedata.lists.find(
    (service:any) => service.slug === params.services,
  );
  const headersList = headers();
  const subdomain = headersList.get("x-subdomain");
  const Data: any = content[subdomain as keyof typeof content];
  const locationName = Data?.name || ContactInfo.location;
  return (
    <div className="">
      <NavbarState/>
    <div className="">
      <Banner
        h1={serviceData.title.split("[location]").join(locationName)}
        header=""
        p1={serviceData.description?.split("[location]").join(Data?.name || ContactInfo.location)
    ?.split("[phone]").join(ContactInfo.No)}
      />
      <div className="mx-4 mt-6 print:hidden md:mx-10">
        {/* who */}
        <div className="my-20 grid w-full grid-cols-1 items-center justify-center gap-6 px-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="text-3xl font-bold">
              <h2>
                {" "}
                {serviceData.title.split("[location]").join(locationName)}
              </h2>
              <br />
            </div>
            <div
              className="text-justify "
              dangerouslySetInnerHTML={{
                __html: serviceData.p2?.split("[location]").join(ContactInfo.location)
            ?.split("[phone]").join(ContactInfo.No),
              }}
            ></div>
          </div>
          <div className="w-full pt-10">
            <Image
              src={serviceData.imageUrl}
              className="h-80 rounded-lg border object-cover shadow-lg"
              alt={serviceData.title.split("/").pop()?.split(".")[0] || "image"}
              width={1000}
              height={1000}
            />
          </div>
        </div>
        {/* who */}
      </div>
      {/* <div className="mx-auto my-4 w-80 border p-4">
          <div dangerouslySetInnerHTML={{ __html: serviceData.description }} />
        </div> */}
      <div className="my-20 bg-main text-white">
        <div className="text- mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className=" text-center text-3xl font-bold">
            {serviceData.h3.split("[location]").join(locationName)}
          </h2>
          <div
            className="mt-4 flex flex-wrap justify-center gap-4"
            // dangerouslySetInnerHTML={{
            //   __html: serviceData.p3
            //     .split("[location]")
            //     .join(locationName),
            // }}
          >
            {serviceData.p3.split("|").map((Item: string) => (
              <p key={Item} className="m-2  rounded-md border  p-4 font-bold">
                {Item}
              </p>
            ))}
          </div>
        </div>
      </div>

      <Service value={subdomain} />
      <div className="my-20">
        <CtaSimple />
      </div>
      {serviceData.seoContent && (
        <div className="max-w-7xl mx-auto px-6 py-12">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

    {/* LEFT: Image */}
    <div className="w-full">
      <Image
        width={1000}
        height={1000}
        src="https://ik.imagekit.io/h7rza8886p/during-construction-of-a-house-portable-plastic-b-2025-03-27-03-45-26-utc.jpg?updatedAt=1748415477782" // replace with your actual image path
        alt="Construction Portable Toilet"
        className="w-full h-auto rounded-xl shadow-md object-cover"
      />
    </div>

    {/* RIGHT: Text Content */}
    <div>
          
            <div
              className="mt-4 text-lg"
              dangerouslySetInnerHTML={{
                __html: serviceData.seoContent
                  ?.split("[location]").join(ContactInfo.location)
            ?.split("[phone]").join(ContactInfo.No),
              }}
            >
         
        </div>
    </div>

  </div>
</div>

      )}
      {/* <TypeOfDumpster /> */}
    </div>
    </div>
  );
};

export default page;

// export function generateStaticParams() {
//   const cityData: any = Servicedata.lists;
//   return cityData.map((locations: any) => ({
//     services: locations.slug.toString(),
//   }));
// }
