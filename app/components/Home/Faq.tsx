"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import contactContent from "@/app/Data/content";
import SubdomainContent from "@/app/Data/FinalContent";

const ContactInfo: any = contactContent.contactContent;
const home: any = contactContent.homePageContent;
const content: any = SubdomainContent.subdomainData;

const Faq = ({ value = "" }) => {
  const data = home?.faq
  const [shuffledFaq, setshuffledFaq] = useState(data);

  useEffect(() => {
    // Shuffle testimonials on the client side after the component mounts
    setshuffledFaq([...data].sort(() => 0.5 - Math.random()));
  }, [data]);

  const contentData: { name: string; zipCodes: string } =
    content[value as keyof typeof content];
  const abbrevation = value?.split("-").pop()?.toUpperCase();
   const StateName = contentData?.name
      ? abbrevation
        ? `${contentData.name}, ${abbrevation}`
        : contentData.name
      : ContactInfo.location.split(",")[0].trim();
  return (
    <div className="mt-14 md:mt-20" itemScope itemType="https://schema.org/FAQPage">
      <h2 className=" text-center text-3xl font-bold text-main">
        FAQs about {ContactInfo.service} in {StateName}{" "}
        {contentData?.zipCodes ? contentData.zipCodes.split("|")[0]: ContactInfo?.zipCode}
      </h2>
      <div className="mt-5 flex flex-col items-center justify-center px-6">
        <Accordion
          type="multiple"
          defaultValue={["item-0"]}
          className="md:w-2/3 "
        >
          {shuffledFaq.slice(0, 5).map((items: any, index: number) => (
            <AccordionItem
              value={`item-${index + 1}`}
              className="no-underline"
              key={index}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <AccordionTrigger className="font-semibold hover:no-underline" itemProp="name">
                Q: {items?.FAQ.split("[location]").join(StateName)}
              </AccordionTrigger>
              <AccordionContent className="text-base" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <span itemProp="text">A: {items?.Answer.split("[location]").join(StateName)}</span> 
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  //   <div className="mt-14 md:mt-20" itemScope itemType="https://schema.org/FAQPage">
  //   <h2 className="text-center text-3xl font-bold text-main"> FAQs about dumpster rental in {StateName},{" "}
  //   {contentData?.zipCodes ? contentData.zipCodes.split("|")[0]: "16156"}</h2>
  //   {data[0].ques ? (
  //     <div className="mt-5 flex flex-col items-center justify-center px-6">
  //       <Accordion type="multiple" defaultValue={["item-0"]} className="md:w-2/3">
  //         {data.map((items: any, index: number) => (
  //           <AccordionItem
  //             value={`item-${index + 1}`}
  //             className="no-underline"
  //             key={index}
  //             itemScope
  //             itemProp="mainEntity"
  //             itemType="https://schema.org/Question"
  //           >
  //             <AccordionTrigger className="font-semibold hover:no-underline" itemProp="name">
  //               Q: {items?.ques}
  //             </AccordionTrigger>
  //             <AccordionContent className="text-base" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
  //               <span itemProp="text">A: {items?.ans}</span>
  //             </AccordionContent>
  //           </AccordionItem>
  //         ))}
  //       </Accordion>
  //     </div>
  //   ) : null}
  // </div>
  );
};

export default Faq;
