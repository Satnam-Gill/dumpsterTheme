"use client";
import React from "react";
import Link from "next/link";
import data1 from "@/components/Content/subDomainUrlContent.json";
import ContactInfo from "@/components/Content/ContactInfo.json";

const Page = () => {
  // const [host, setHost] = useState<string | null>(null);
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const fullHost = window.location.host;
  //     const mainDomain = fullHost.replace(/^[^.]+\./, "");
  //     setHost(mainDomain);
  //     // console.log("host:", fullHost);
  //   }
  // }, []);

  const data: any = data1;
  // console.log(Object.keys(data).sort());
  // const groupedByState = Object.keys(data).reduce(
  //   (acc, key) => {
  //     const component = data[key];
  //     const stateAbbreviation = key.split("-").pop();

  //     if (component.value === "state" && stateAbbreviation) {
  //       acc[stateAbbreviation] = {
  //         stateComponent: { name: component.name, slug: component.slug },
  //         cities: [],
  //       };
  //     } else if (stateAbbreviation && acc[stateAbbreviation]) {
  //       acc[stateAbbreviation].cities.push({
  //         name: component.name,
  //         slug: component.slug,
  //       });
  //     }

  //     return acc;
  //   },
  //   {} as Record<
  //     string,
  //     {
  //       stateComponent: { name: string; slug: string };
  //       cities: { name: string; slug: string }[];
  //     }
  //   >,
  // );
  // const slugs = groupedByState.ca.cities.map(city => city.slug);
  // console.log(slugs);
  return (
    <div className="">
      <div>
        <div className="mx-10 mt-10 flex h-fit w-auto flex-wrap gap-4   justify-center items-center">
          {Object.keys(data)
            .sort()
            .map((City: any, index: number) => {
              return (
                <div className="" key={index}>
                  <Link
                    href={`https://${data[City].slug}.${ContactInfo.host}`}
                    className="text-center"
                  >
                    <button type="button" className="text-white  bg-main hover:bg-main/90 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{data[City].name}</button>
                    
                  </Link>
                </div>
              );
            })}
        </div>
        {/* <div className="flex-wrap flex p-10">
        {Object.keys(data)
            .sort()
            .map((City: any, index: number) => {
              return (
                <div className=" mx-2 " key={index}>
                
                    '{`http://${data[City].slug}.${ContactInfo.host}`}',
                    {data[City].slug},
                </div>
              );
            })}
      </div> */}
        </div>
        
      {/* <div className="flex flex-wrap px-2">{slugs.map((item: any) => <div className="px-4" key={item}>'{item}',</div>)}</div> */}
    </div>
  );
};

export default Page;
