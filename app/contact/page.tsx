import { Metadata } from "next";
import React from "react";
import contentData from "@/components/Content/contact.json";
import ContactInfo from "@/components/Content/ContactInfo.json";
import Page from "../components/Contact/Page";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: {
    absolute: contentData.metaTitle?.split("[location]").join( ContactInfo.location)
    ?.split("[phone]").join(ContactInfo.No),
  },
  description: contentData.metaDescription?.split("[location]").join( ContactInfo.location)
  ?.split("[phone]").join(ContactInfo.No),
  alternates: {
     canonical: `${ContactInfo.baseUrl}contact/`,
  },
};

const page = () => {
  return (
    <div className="">
      <Navbar />
      <Page />
    </div>
  );
};

export default page;
