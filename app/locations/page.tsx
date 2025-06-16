import React from "react";
import FullPage from "@/app/components/location/FullPage";
import contentData from "@/components/Content/location.json";
import Banner from "@/app/components/Home/Banner";
import { Metadata } from "next";
import Navbar from "../components/Navbar";
import ContactInfo from "@/components/Content/ContactInfo.json";

export const metadata: Metadata = {
  title: {
    absolute: contentData.metaTitle,
  },
  description: contentData.metaDescription?.split("[location]").join( ContactInfo.location)
  ?.split("[phone]").join(ContactInfo.No),
  alternates: {
    canonical: `${ContactInfo.baseUrl}locations/`,
  },
};

const page = () => {
  return (
    <div className="">
      <Navbar />
      <div>
        <Banner
          h1={contentData.h1Banner}
          image={contentData.bannerImage}
          header={contentData.bannerQuote}
          p1={contentData.metaDescription?.split("[location]").join( ContactInfo.location)
            ?.split("[phone]").join(ContactInfo.No)}
        />
        <div className="py-10">
          <FullPage />
        </div>
      </div>
    </div>
  );
};

export default page;
