import Image from "next/image";
import Link from "next/link";
import { RiMapPin2Fill } from "react-icons/ri";
import content from "@/components/Content/servicePage.json";
import ContactInfo from "@/components/Content/ContactInfo.json";
import { headers } from "next/headers";
import SubDomainData from "@/components/Content/subDomainUrlContent.json";
const Footer = () => {
  const headersList = headers();
const subdomain = headersList.get("x-subdomain") as string | null;
const data = content?.serviceData;
const subdomainData = subdomain ? SubDomainData[subdomain as keyof typeof SubDomainData] : undefined;
const address = subdomainData && "address" in subdomainData ? (subdomainData as { address: string }).address : undefined;
  return (
    <div className=" flex w-full items-center justify-center bg-[#eeecec]">
      <div className=" flex w-full  items-center justify-center overflow-hidden">
        <div className=" flex w-full flex-col items-center  justify-center md:mt-8 md:min-w-[650px] ">
          <div className="flex w-fit flex-col justify-center gap-2 px-6 md:mt-8  md:w-full  md:flex-row md:items-start md:justify-around md:px-20 ">
            <div className="mt-4 flex h-32 items-center justify-center text-2xl md:mt-0  md:h-auto md:w-52">
              <Image
                src={ContactInfo?.logoImage}
                height={10000}
                width={10000}
                className="w-full object-cover "
                alt={
                  ContactInfo.logoImage.split("/").pop()?.split(".")[0] ||
                  "image"
                }
                title={
                  ContactInfo.logoImage.split("/").pop()?.split(".")[0] ||
                  "image"
                }
              />
            </div>
            <div className="mt-10  flex flex-col items-center   justify-center text-lg md:mt-0  md:w-80">
              <div className=" w-fit border-b-2 border-minor text-3xl font-semibold text-main">
                Our Company
              </div>
              <div className="mt-6 flex  flex-col gap-2">
                <Link href="/types">
                  <p className="">Types of Dumpsters </p>
                </Link>
                <Link href="/about">
                  <p className="">About </p>
                </Link>
                <Link href="/contact">
                  <p className="">Contact </p>
                </Link>
                <Link href="/our-brands">
                  <p className="">Our Brands </p>
                </Link>
                <Link href={`${ContactInfo?.baseUrl}blogs`}>
                  <p className="">Blogs </p>
                </Link>
              </div>
            </div>
            <div className="mt-10  flex flex-col items-center   justify-center text-lg md:mt-0  md:w-[26rem]">
              <div className=" w-fit border-b-2 border-minor text-3xl font-semibold text-main">
                Our Services
              </div>
              <div className="mt-6 flex  flex-col gap-2  text-center">
                {data.lists.map(
                  (list) =>
                    list.title && (
                      <Link href={`/services/${list.slug}`} key={list.title}>
                        <p className="">
                          {list.title?.replace(" in [location]", " ")}
                        </p>
                      </Link>
                    ),
                )}
              </div>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center md:mt-0 md:w-80">
              <div className=" w-fit border-b-2 border-minor text-3xl font-semibold text-main">
                REACH OUT TO US
              </div>
              <div className="mt-5  text-lg">
                <div className="  flex items-center gap-4">
                  <div className="w-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#000000"
                        d="m14 16 3-1 3-1 3 2a2 2 0 0 1 1 3l-3 4-4 1C10 20 4 14 0 7l1-4 4-3a2 2 0 0 1 3 1l2 3-1 3-1 3 6 6Z"
                      />
                    </svg>
                  </div>
                  <div className="">
                    <Link href={`tel:${ContactInfo.tel}`} aria-label="Call Us">
                      {ContactInfo.No}
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex">
                    <RiMapPin2Fill className="text-cream mr-5 mt-1 w-8 text-lg" />
                    {address ?? ContactInfo.address}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-9 mt-10 flex border-t-2 border-minor text-center  text-lg text-main ">
            <p className="my-2">
              Copyright ©2025 {ContactInfo?.name}, All Right Reserved |
              <Link
                href={`${ContactInfo?.baseUrl}sitemap.xml`}
                className="ml-2 font-semibold underline-offset-8 duration-300 ease-in-out hover:underline hover:underline-offset-2"
              >
                Sitemap
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/*  cursor-default   bg-[#151627] grid place-items-center w-screen md:w-full min-w-[375px] */}
    </div>
  );
};

export default Footer;
