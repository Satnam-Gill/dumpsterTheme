import Banner from "@/app/components/Home/Banner";
import React from "react";
import data from "@/components/Content/typesPage.json";
import Image from "next/image";
import { headers } from "next/headers";
import content from "@/components/Content/subDomainUrlContent.json";
import ContactInfo from "@/components/Content/ContactInfo.json";
import {
  CheckCircle,
  XCircle,
} from "lucide-react";

import CtaSimple from "@/app/components/CtaSimple";
import Link from "next/link";
import ProcessWidget from "../Widgets/ProcessWidget";





const SubTypePage = ({ params }: any) => {
  const headersList = headers();
  const subdomain = headersList.get("x-subdomain");
  const Data: any = content[subdomain as keyof typeof content];
  const locationName = Data?.name || ContactInfo.location;
  const Servicedata = JSON.parse(
    JSON.stringify(data?.serviceData)
      .split("[location]")
      .join(locationName)
      .split("[phone]")
      .join(ContactInfo.No),
  );
  const serviceData: any = Servicedata.lists.find(
    (service: any) => service.slug === params.types,
  );

  return (
    <div className="">
      <Banner
        h1={serviceData.title}
        header=""
        p1={serviceData.shortDescription}
      />
      <div className="max-w-8xl mx-auto px-4 py-12">
        <div className="mb-16 grid grid-cols-1 items-center gap-8 rounded-xl bg-white p-8  md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-main">
              {serviceData.h2}
            </h2>
            <div
              className="text-lg "
              dangerouslySetInnerHTML={{ __html: serviceData.p2 }}
            />
          </div>
          <div className="flex justify-center">
            <Image
              src={serviceData.imageUrl}
              className="h-64 w-full rounded-lg object-contain "
              alt={serviceData.title.split("/").pop()?.split(".")[0] || "image"}
              width={400}
              height={256}
            />
          </div>
        </div>
       {/* overviewsection */}
        <div className="max-w-9xl mx-auto mb-16 grid grid-cols-1 items-center gap-8  p-8  md:grid-cols-2">
           <div className="">
              <Image
                src={
                  "https://ik.imagekit.io/serviceproviders/lconDumpster.png?updatedAt=1749276857985"
                }
                className="h-64 w-full  object-cover "
                alt={
                  serviceData.title.split("/").pop()?.split(".")[0] || "image"
                }
                width={400}
                height={256}
              />
            </div>
          <div className="rounded-xl bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-main">
             {serviceData?.overViewHeading}
            </h2>
           <div className=""dangerouslySetInnerHTML={{__html : serviceData?.overViewContent}} />
          </div>
           
        </div>
         {/* selection */}
        <div className="max-w-9xl mx-auto mb-16 grid grid-cols-1 items-center gap-8 rounded-xl bg-white p-8 shadow-lg md:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-xl bg-main p-8 text-white shadow-lg">
            <h2 className="mb-2 text-2xl font-bold">{serviceData.leftSection.title}</h2>
            <div className="mb-2">
              {serviceData.leftSection.description}
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-xl bg-white p-8 ">
            <h2 className="mb-2 text-2xl font-bold text-main">
              {serviceData.rightSection.title}
            </h2>
            <div className="mb-2">
             {serviceData.rightSection.description}
            </div>
            {/* <Link
              href="#"
              className="font-semibold text-green-700 hover:underline"
            >
              Download Size Guide &rarr;
            </Link> */}
          </div>
        </div>
        {/* Compare Section */}
        <section className="bg-gray-50 px-4 py-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-2xl font-bold ">
              {serviceData?.comapreHeading}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-green-200 bg-white p-6 shadow-lg md:p-8">
                <h3 className="mb-4 text-2xl font-semibold text-green-700">
                  {serviceData.allowedHeading}
                </h3>
                <div className="space-y-4">
                  {serviceData.allowedItems.map((item:any, index:number) => (
                    <div
                      key={`allowed-${index}`}
                      className="flex items-start gap-4"
                    >
                      <CheckCircle className="mt-1 h-6 w-6 text-green-600" />
                      <p className="text-base leading-relaxed ">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-lg md:p-8">
                <h3 className="mb-4 text-2xl font-semibold text-red-700">
                  {serviceData.prohibitedHeading}
                </h3>
                <div className="space-y-4">
                  {serviceData.prohibitedItems.map((item:any, index:number) => (
                    <div
                      key={`prohibited-${index}`}
                      className="flex items-start gap-4"
                    >
                      <XCircle className="mt-1 h-6 w-6 text-red-600" />
                      <p className="text-base leading-relaxed ">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Ideal Section */}
        <div className="rounded-3xl p-10 max-w-6xl mx-auto">
          <h2 className="mb-10 text-center text-2xl font-bold  md:text-3xl">
           {serviceData.idealHeading}
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {serviceData.idealProjects.map((text:any, index:number) => (
              <div
                key={index}
                className="w-full rounded-xl border border-blue-100 bg-main text-white p-6 text-center text-base font-medium  shadow-sm transition-shadow duration-300 hover:shadow-md sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)]"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
        <CtaSimple />
        {/* Process Section */}
        <ProcessWidget />
        {/* Types */}
        <div className="max-w-9xl mx-auto mt-16 mb-5 bg-white p-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-main">
            {serviceData.tyesHeading}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {Servicedata.lists
              .filter((Item: any) => Item.slug !== params.types)
              .map((type: any, idx: number) => (
                <Link href={`/types/${type.slug}`}
                  key={idx}
                  className="flex w-48 flex-col items-center rounded-lg bg-gray-100 p-4"
                >
                  <Image
                    src="https://ik.imagekit.io/serviceproviders/lconDumpster.png?updatedAt=1749276857985"
                    width={56}
                    height={56}
                    alt={type.title}
                    className="mb-2 w-16"
                  />
                  <span className="text-center font-bold ">
                    {type.title}
                  </span>
                </Link>
              ))}
          </div>
        </div>

        {/* <div className="max-w-9xl mx-auto mb-16 grid grid-cols-1 items-center gap-8 rounded-xl bg-white p-8 shadow-lg md:grid-cols-2">
          <div className="flex justify-center">
            <Image
              src="https://ik.imagekit.io/serviceproviders/lconDumpster.png?updatedAt=1749276857985"
              width={400}
              height={256}
              alt="Servicing"
              className="h-64 w-full rounded-lg object-cover shadow"
            />
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold text-green-800">
              Servicing Your Dumpster
            </h2>
            <ul className="mb-2 ml-6 list-disc text-gray-700">
              <li>
                Make sure the area is accessible and unobstructed for safe
                delivery and pickup.
              </li>
              <li>
                Do not exceed the maximum tonnage allowed (usually 2-3 tons for
                a 10 yard dumpster).
              </li>
              <li>
                Keep prohibited items out of the dumpster to avoid extra fees.
              </li>
              <li>
                Ask about extra protection for your driveway or placement
                location.
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SubTypePage;
