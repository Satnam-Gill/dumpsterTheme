import Banner from "@/app/components/Home/Banner";
import React from "react";
import Service from "@/app/components/Home/Service";
import { Metadata } from "next";
import NavbarState from "@/app/components/State/NavbarState";
import { headers } from "next/headers";
import Navbar from "@/app/components/Navbar";
import Types from "@/app/components/Widgets/Types";

import contactContent from "@/app/Data/content";
import subdomainContent from "@/app/Data/FinalContent";

const ContactInfo: any = contactContent.contactContent;
const contentData: any = contactContent.typesJsonContent;
const content: any = subdomainContent.subdomainData;

export function generateMetadata({ params }: { params: { services: string } }) {
  const headersList = headers();
  const subdomain = headersList.get("x-subdomain") as
    | keyof typeof content
    | null;
  let subdomainKey = subdomain as any;
  if (subdomainKey?.includes("-")) {
    subdomainKey = subdomainKey.split("-").pop();
  }

  if (!subdomain || !(subdomain in content)) {
    // Handle the case where subdomain is null or not in content
    return <div>Error: Invalid subdomain</div>;
  }
  const Data: any = content[subdomain];
  return {
    title: {
      absolute: contentData.h1Banner
        ?.split(ContactInfo.location)
        .join(Data?.name || ContactInfo.location)
        ?.split("[phone]")
        .join(ContactInfo.No),
    },
    description: contentData.metaDescription
      ?.split(ContactInfo.location)
      .join(Data?.name || ContactInfo.location)
      ?.split("[phone]")
      .join(ContactInfo.No),
    alternates: {
      canonical: `https://${Data.slug}.${ContactInfo.host}/types/`,
    },
  };
}
const page = () => {
  const headersList = headers();
  const subdomain = headersList.get("x-subdomain") as
    | keyof typeof content
    | null;
  let subdomainKey = subdomain as any;
  if (subdomainKey?.includes("-")) {
    subdomainKey = subdomainKey.split("-").pop();
  }

  if (!subdomain || !(subdomain in content)) {
    // Handle the case where subdomain is null or not in content
    return <div>Error: Invalid subdomain</div>;
  }
  const Data: any = content[subdomain];
  return (
    <div className="">
      <NavbarState />
      <div>
        <Banner
          h1={contentData.h1Banner
            ?.split(ContactInfo.location)
            .join(Data?.name || ContactInfo.location)
            ?.split("[phone]")
            .join(ContactInfo.No)}
          image={contentData.bannerImage}
          header={contentData.bannerQuote
            ?.split(ContactInfo.location)
            .join(Data?.name || ContactInfo.location)
            ?.split("[phone]")
            .join(ContactInfo.No)}
          p1={contentData.metaDescription
            ?.split(ContactInfo.location)
            .join(Data?.name || ContactInfo.location)
            ?.split("[phone]")
            .join(ContactInfo.No)}
        />

        {/* Content 1 */}
        <div className="">
          {/* <Affordable /> */}
          <Types value={Data?.name} />
          <Service value={subdomain} />
        </div>
        {/* Content 1 */}
      </div>
    </div>
  );
};

export default page;
