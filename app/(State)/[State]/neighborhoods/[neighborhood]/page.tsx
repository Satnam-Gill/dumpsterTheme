import Image from "next/image";
import { notFound } from "next/navigation";
import Banner from "@/app/components/Home/Banner";
import Service from "@/app/components/Home/Service";
import Faq from "@/app/components/Home/Faq";
import HourCta from "@/app/components/Home/HourCta";
import ReviewWidget from "@/app/components/Widgets/ReviewWidget";
import AreaWeServe from "@/app/components/Widgets/AreaWeServe";
import Affordable from "@/app/components/Home/Affordable";
import ProcessWidget from "@/app/components/Widgets/ProcessWidget";
import NavbarState from "@/app/components/State/NavbarState";
import Link from "next/link";
import ZipAndNeighAccordian from "@/app/components/Home/ZipAndNeighAccordian";
import Types from "@/app/components/Widgets/Types";

import contactContent from "@/app/Data/content";
import { headers } from "next/headers";

const ContactInfo: any = contactContent.contactContent;

// Force dynamic behavior similar to blogs page
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getNeighborhoodData() {
  const headersList = headers();
  const proto: any = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("host");
  const baseUrl = `${proto}://${host}`;
  const res = await fetch(`${baseUrl}/api/neighborhoods`, { cache: "no-store" });
  return res.json().catch(() => ({}));
}

async function getSubdomainData() {
  const headersList = headers();
  const proto: any = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("host");
  const baseUrl = `${proto}://${host}`;
  const res = await fetch(`${baseUrl}/api/subdomains`, { cache: "no-store" });
  return res.json().catch(() => ({}));
}

interface NeighborhoodPageProps {
  params: { State: string; neighborhood: string };
}

const stateName: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

export async function generateMetadata({ params }: NeighborhoodPageProps) {
  const { State, neighborhood } = params;
  try {
    const data = await getNeighborhoodData();
    const list: any[] = data?.neighborhoods || [];
    const current = list.find((item: any) => item?.slug === neighborhood);
    const title = current?.metaTitle
      ?.split(ContactInfo.location)
      .join(current?.name || ContactInfo.location)
      ?.split("[phone]")
      .join(ContactInfo.No);
    const description = current?.metaDescription
      ?.split(ContactInfo.location)
      .join(current?.name || ContactInfo.location)
      ?.split("[phone]")
      .join(ContactInfo.No);
    return {
      title,
      description,
      alternates: {
        canonical: `https://${State}.${ContactInfo.host}/neighborhoods/${neighborhood}`,
      },
    } as any;
  } catch (e) {
    return {
      alternates: {
        canonical: `https://${State}.${ContactInfo.host}/neighborhoods/${neighborhood}`,
      },
    } as any;
  }
}

export default async function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  const { State, neighborhood } = params;
  const abbrevations: any = State.split("-").pop();

  // Prefer dynamically fetched neighborhood content
  let fetched: any = null;
  let fetchedList: any[] = [];
  let parentStateData: any = null;
  try {
    const [neighborhoodData, subdomainData] = await Promise.all([
      getNeighborhoodData(),
      getSubdomainData()
    ]);
    
    if (neighborhoodData && neighborhoodData.neighborhoods) {
      fetchedList = neighborhoodData.neighborhoods;
      fetched = neighborhoodData.neighborhoods.find((item: any) => item?.slug === neighborhood);
      if (!fetched) notFound();
    }
    
    if (subdomainData && subdomainData.subdomains) {
      parentStateData = subdomainData.subdomains.find((item: any) => item?.slug === State);
    }
  } catch (e) {
    // If API fails, do not render unpublished content
    notFound();
  }

  const sourceContent = fetched;
  const ContentData = JSON.parse(
    JSON.stringify(sourceContent)
      .split(ContactInfo.location)
      .join(ContactInfo.location)
      .split("[phone]")
      .join(ContactInfo.No),
  );

  // Get related neighborhoods from the same parent state
  const relatedNeighborhoods = (fetchedList || [])
    .filter((item: any) => item?.parentState === State && item?.slug !== neighborhood)
    .map((item: any) => item);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `${ContactInfo.name}`,
        image: `${ContactInfo.logoImage}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${stateName[abbrevations.toUpperCase()]} ${ContactInfo.service}`,
          addressLocality: `${ContentData?.name}, ${parentStateData?.name || State}, ${abbrevations.toUpperCase()}`,
          addressRegion: stateName[abbrevations.toUpperCase()],
          postalCode: ContentData?.zipCodes || "",
          addressCountry: "US",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "4.9",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: `${stateName[abbrevations.toUpperCase()]} ${ContactInfo.service}`,
          },
        },
        telephone: ContactInfo.No,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "20:00",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `${ContactInfo.service} in ${ContentData?.name}, ${parentStateData?.name || State}, ${abbrevations.toUpperCase()}`,
        brand: {
          "@type": "Brand",
          name: `${ContactInfo.service} ${ContentData?.name}, ${parentStateData?.name || State}, ${abbrevations.toUpperCase()} Pros`,
        },
        description: `${ContentData?.metaDescription
          ?.split(ContactInfo.location)
          .join(ContentData?.name || ContactInfo.location)
          ?.split("[phone]")
          .join(ContactInfo.No)}`,
        url: `https://${State}.${ContactInfo.host}/neighborhoods/${neighborhood}`,
        aggregateRating: {
          "@type": "AggregateRating",
          reviewCount: 7,
          ratingValue: 4.802,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: ContentData.faq.map((faq: any) => ({
          "@type": "Question",
          name: faq?.ques?.split(ContactInfo.location).join(neighborhood),
          acceptedAnswer: {
            "@type": "Answer",
            text: faq?.ans?.split(ContactInfo.location).join(neighborhood),
          },
        })),
      },
    ],
  };

  return (
    <div className="">
      <NavbarState />
      <section>
        {/* Add JSON-LD to your page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* ... */}
      </section>
      <div className="mx-auto max-w-[2100px] overflow-hidden">
        <Banner
          h1={`${ContentData.h1Banner
            ?.split(ContactInfo.location)
            .join(ContentData?.name || ContactInfo.location)
            ?.split("[phone]")
            .join(
              ContactInfo.No,
            )} ${ContentData.zipCodes && ContentData.zipCodes.split("|")[0]}`}
          image={ContentData.bannerImage}
          header={ContentData.bannerQuote}
          p1={`${ContentData?.metaDescription
            ?.split(ContactInfo.location)
            .join(ContentData?.name || ContactInfo.location)
            ?.split("[phone]")
            .join(ContactInfo.No)}.`}
        />
        {/* Section 1 */}
        <div className="mt-14 grid w-full grid-cols-1 items-center  gap-6 px-6 md:mt-28 md:grid-cols-2 md:px-24">
          <div className=" h-full">
            <Image
              height={1000}
              width={1000}
              src={`${ContentData?.h2Image}`}
              className="h-full w-full  rounded-lg object-cover shadow-lg"
              alt={
                ContentData?.h2Image.split("/").pop()?.split(".")[0] || "image"
              }
            />
          </div>
          <div className=" flex w-full flex-col gap-3 ">
            <span className="text-sm font-bold text-main">
              {ContentData?.name} {ContactInfo.name} Services
            </span>
            <h2 className="text-3xl font-bold">{ContentData?.h2}</h2>

            <div
              className="mt-3  text-justify"
              dangerouslySetInnerHTML={{ __html: ContentData?.p2 }}
            ></div>
            <div className="gap-4 md:flex">
              <div className="rounded-lg bg-gray-100 p-4 shadow-lg">
                <h4 className="text-xl font-bold">
                  Residential {ContactInfo.name} Services
                </h4>
                <p>
                  Professional Residential {ContactInfo.service} in{" "}
                  {ContentData?.name}, {parentStateData?.name || State}, {State.split("-").pop()?.toUpperCase()}.
                </p>
              </div>
              <div className="rounded-lg bg-gray-100 p-4 shadow-lg">
                <h4 className="text-xl font-bold">
                  Commercial {ContactInfo.name} Services
                </h4>
                <p>
                  Commercial {ContactInfo.service} in {ContentData?.name},{" "}
                  {parentStateData?.name || State}, {State.split("-").pop()?.toUpperCase()}.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Section 1 */}
        {/* Section 2 */}
        {ContentData.h3 && (
          <div className="mt-14 flex flex-col items-center justify-center bg-main p-6 px-6 text-center text-white md:mt-28 md:px-24">
            <h2 className="text-2xl font-bold ">{ContentData?.h3}</h2>
            <p
              className="mt-4 text-lg"
              dangerouslySetInnerHTML={{ __html: ContentData?.p3 }}
            ></p>
          </div>
        )}
        {/* Section 2 */}
        {/* Service */}
        <div className="mt-14 md:mt-20">
          <Service value={State} />
          <Types
            value={`${ContentData?.name}, ${parentStateData?.name || State}, ${abbrevations.toUpperCase()}`}
          />
        </div>
        {/* Service */}
        <div className="mt-10">
          <Affordable />
        </div>
        {/* Section 4 */}
        {ContentData.h5 && (
          <div className="mt-14 grid grid-cols-1  gap-10 px-6 md:mt-28 md:grid-cols-2 md:px-24 ">
            <div className="flex flex-col justify-center    ">
              <h2 className="text-first text-3xl font-bold">
                {ContentData.h5}
              </h2>
              <div
                className="mt-4  list-disc text-justify"
                dangerouslySetInnerHTML={{ __html: ContentData.p5 }}
              ></div>
            </div>
            <div className="">
              <Image
                height={10000}
                width={10000}
                src={`${ContentData.h5Image}`}
                className=" h-[16rem] w-full rounded-lg object-cover shadow-lg"
                alt={
                  ContentData.h5Image.split("/").pop()?.split(".")[0] || "image"
                }
                title={
                  ContentData.h5Image.split("/").pop()?.split(".")[0] || "image"
                }
              />
            </div>
          </div>
        )}
        {/* Section 4 */}
        {/* Section 5 */}
        {ContentData.h6 && (
          <div className="mt-14 grid grid-cols-1  gap-10 px-6 md:mt-28 md:grid-cols-2 md:px-24">
            <div className="">
              <Image
                height={10000}
                width={10000}
                src={`${ContentData?.h6Image}`}
                className=" h-[17rem] w-full rounded-lg object-cover  shadow-lg"
                alt={
                  ContentData?.h6Image.split("/").pop()?.split(".")[0] ||
                  "image"
                }
                title={`${ContentData.h6Image.split("/").pop()?.split(".")[0] || "image"} ,${ContentData.name}`}
              />
            </div>
            <div className="flex flex-col justify-center    ">
              <h2 className="text-first text-3xl font-bold">
                {ContentData.h6}
              </h2>
              <div
                className="mt-4  text-justify"
                dangerouslySetInnerHTML={{ __html: ContentData.p6 }}
              ></div>
            </div>
          </div>
        )}
        {/* Section 5 */}
        {/* Section 3 */}
        {ContentData.h4 && (
          <div className="mt-14 flex flex-col items-center justify-center bg-main p-6 px-6 text-center text-white md:mt-28 md:px-24">
            <h2 className="text-2xl font-bold ">{ContentData?.h4}</h2>
            <p
              className="mt-4 text-lg"
              dangerouslySetInnerHTML={{ __html: ContentData?.p4 }}
            ></p>
          </div>
        )}
        {/* Section 3 */}
        <ProcessWidget />
        {/* Cta */}
        <div className="mt-14 md:mt-28">
          <HourCta />
        </div>
        {/* Cta */}
        {/* History */}
        {ContentData.h7 && (
          <div className="mt-14 grid w-full grid-cols-1 gap-10  px-6 md:mt-28 md:grid-cols-2 md:px-24">
            <div className=" flex w-full flex-col justify-around gap-3   ">
              <div className="">
                <h2 className="text-3xl font-bold">{ContentData?.h7}</h2>
                <p
                  className="mt-10  text-justify"
                  dangerouslySetInnerHTML={{ __html: ContentData?.p7 }}
                ></p>
              </div>
            </div>
            <div className="">
              <Image
                src={`${ContentData?.h7Image}`}
                className="h-[100%] w-full rounded-lg border object-cover shadow-lg "
                alt={
                  ContentData?.h7Image.split("/").pop()?.split(".")[0] ||
                  "image"
                }
                width={1000}
                height={500}
              />
            </div>
          </div>
        )}
        {/* History */}
        {/* Related Neighborhoods */}
        {relatedNeighborhoods.length > 0 && (
          <div id="related-neighborhoods" className="pt-14 md:pt-28">
            <h2 className={`  text-center text-3xl font-bold text-main`}>
              Other Neighborhoods We Serve in {parentStateData?.name || State}
            </h2>
            <div className="mt-10 grid gap-6 px-6 text-center sm:grid-cols-2 md:px-40 lg:grid-cols-3">
              {relatedNeighborhoods.map((item: any) => (
                <div className="rounded-xl p-4 shadow-lg" key={item.slug}>
                  <div className="">
                    <div className={` text-center font-bold`}>
                      <br />
                      {item?.name}
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/neighborhoods/${item.slug}`}
                        className="text-main hover:underline"
                      >
                        View Services →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Related Neighborhoods */}
        {/* FAQ */}
        {ContentData?.faq ? <Faq data={ContentData?.faq} value={`${ContentData.name}, ${parentStateData?.name || State}, ${abbrevations.toUpperCase()}`}/> : null}
        
        {/* FAQ */}
        {/* Reviews */}
        <ReviewWidget value={State} />
        {/* Reviews */}
        {/* -----------------------------------------Map End---------------------------- */}
        <div className="block w-full">
          <div className="mt-14 overflow-hidden rounded-xl border md:mt-20">
            <iframe
              title="Google Map"
              height="350"
              width={"100%"}
              src={`https://maps.google.com/maps?q=${ContentData?.address || ContentData?.name}+${parentStateData?.name || State}+USA&t=&z=7&ie=UTF8&iwloc=&output=embed`}
              loading="lazy"
            ></iframe>
          </div>
        </div>
        {/* -----------------------------------------Map End---------------------------- */}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  // This would need to be populated with actual neighborhood data
  // For now, return empty array to let Next.js handle dynamic generation
  return [];
}
