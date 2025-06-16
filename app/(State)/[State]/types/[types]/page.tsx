import Banner from "@/app/components/Home/Banner";
import React from "react";
import data from "@/components/Content/typesPage.json";
import Image from "next/image";
import Service from "@/app/components/Home/Service";
import { headers } from "next/headers";
import content from "@/components/Content/subDomainUrlContent.json";
import ContactInfo from "@/components/Content/ContactInfo.json";
import CtaSimple from "@/app/components/CtaSimple";
import NavbarState from "@/app/components/State/NavbarState";
import SubTypePage from "@/app/components/Types/SubTypePage";

const Servicedata = data?.serviceData;

export function generateMetadata({ params }: { params: { types: string } }) {
  const serviceData: any = Servicedata.lists.find(
    (service) => service.slug === params.types,
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
     <SubTypePage params={params}/>
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
