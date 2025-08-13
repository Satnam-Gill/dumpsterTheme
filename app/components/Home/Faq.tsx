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

const Faq = ({ value = "", faqList }: { value?: string; faqList?: any[] }) => {
  const defaultData = home?.faq || [];
  const data = faqList?.length ? faqList : defaultData; // ✅ Use passed FAQ if available

  // const [shuffledFaq, setShuffledFaq] = useState(data);

  // useEffect(() => {
  //   setShuffledFaq([...data].sort(() => 0.5 - Math.random()));
  // }, [data]);

  const contentData = content[value as keyof typeof content];
  const abbrevation = value?.split("-").pop()?.toUpperCase();
  const StateName = contentData?.name
    ? abbrevation
      ? `${contentData.name}, ${abbrevation}`
      : contentData.name
    : ContactInfo.location.split(",")[0].trim();

  // const jsonLd = data.length > 0 ? {
  //   "@context": "https://schema.org",
  //   "@type": "FAQPage",
  //   mainEntity: data.slice(0, 5).map((faq: any) => ({
  //     "@type": "Question",
  //     name: faq?.FAQ?.split("[location]").join(StateName),
  //     acceptedAnswer: {
  //       "@type": "Answer",
  //       text: faq?.Answer?.split("[location]").join(StateName),
  //     },
  //   })),
  // } : null;

  return (
    <>
      {/* {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )} */}

      <div className="mt-14 md:mt-20">
        <h2 className="text-center text-3xl font-bold text-main">
          FAQs about {ContactInfo.service} in {StateName}{" "}
          {contentData?.zipCodes
            ? contentData.zipCodes.split("|")[0]
            : ContactInfo?.zipCode}
        </h2>
        <div className="mt-5 flex flex-col items-center justify-center px-6">
          <Accordion type="multiple" defaultValue={["item-0"]} className="md:w-2/3">
            {data.slice(0, 5).map((items: any, index: number) => (
              <AccordionItem
                value={`item-${index + 1}`}
                className="no-underline"
                key={index}
              >
                <AccordionTrigger className="font-semibold hover:no-underline">
                  Q: {items?.FAQ.split("[location]").join(StateName)}
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  <span>
                    A: {items?.Answer.split("[location]").join(StateName)}
                  </span>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
};


export default Faq;
