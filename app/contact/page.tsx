import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiMailSend, BiSolidPhone, BiSolidTime } from "react-icons/bi";
import { FaPhoneVolume } from "react-icons/fa6";
import Banner from "../components/Home/Banner";
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
