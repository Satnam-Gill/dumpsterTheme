import React from "react";
import { headers } from "next/headers";
import NavbarState from "@/app/components/State/NavbarState";
import SubTypePage from "@/app/components/Types/SubTypePage";

import contactContent from "@/app/Data/content";
import subdomainContent from "@/app/Data/FinalContent";

const ContactInfo: any = contactContent.contactContent;
const data: any = contactContent.typesJsonContent;
const content: any = subdomainContent.subdomainData;

const Servicedata = data?.serviceData;

export function generateMetadata({ params }: { params: { types: string } }) {
  const serviceData: any = Servicedata.lists.find(
    (service:any) => service.slug === params.types,
  );
  const headersList = headers();
  const subdomain = headersList.get("x-subdomain");
  const Data: any = content[subdomain as keyof typeof content];
  return {
    title: serviceData.title
      ?.split("[location]")
      .join(Data?.name || ContactInfo.location)
      ?.split("[phone]")
      .join(ContactInfo.No),
    description: serviceData.shortDescription
      ?.split("[location]")
      .join(Data?.name || ContactInfo.location)
      ?.split("[phone]")
      .join(ContactInfo.No),
    alternates: {
      canonical: `https://${Data.slug}.${ContactInfo.host}/types/${params.types}/`,
    },
  };
}

const page = ({ params }: { params: { types: string } }) => {
  return (
    <div className="">
      <NavbarState />
      <SubTypePage params={params} />
    </div>
  );
};

export default page;
